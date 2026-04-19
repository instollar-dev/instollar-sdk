import { io, type ManagerOptions, type Socket, type SocketOptions } from 'socket.io-client';
import { getFromStorage, StorageKeys } from '../storage';
import type { InstollarSocketConfig, SocketEventHandler, SocketEventMap, TokenData } from '../types';

type SocketClient = Socket<SocketEventMap, SocketEventMap>;
type ResolvedSocketConfig = InstollarSocketConfig & { url: string };

let socketConfig: ResolvedSocketConfig | null = null;
let socket: SocketClient | null = null;
let connectingPromise: Promise<SocketClient> | null = null;

const getSocketConfig = (): ResolvedSocketConfig => {
  if (!socketConfig) {
    throw new Error('[instollar-sdk] Socket not initialized. Call initSocket(config) first.');
  }
  return socketConfig;
};

const resolveTokenData = async (): Promise<TokenData | null> =>
  getFromStorage<TokenData>(StorageKeys.TOKEN_DATA);

const buildQueryPayload = (
  config: ResolvedSocketConfig,
  tokenData: TokenData | null
): Record<string, string> | undefined => {
  const token = tokenData?.token;
  const baseQuery = (config.options?.query ?? {}) as Record<string, string>;

  if (!token) {
    return Object.keys(baseQuery).length ? baseQuery : undefined;
  }

  // Only add Bearer if not already provided by the user manually
  if (baseQuery.Authorization) {
    return baseQuery;
  }

  return {
    ...baseQuery,
    Authorization: `Bearer ${token}`,
  };
};

const buildConnectionOptions = async (
  config: ResolvedSocketConfig
): Promise<Partial<ManagerOptions & SocketOptions>> => {
  const tokenData = await resolveTokenData();
  const token = tokenData?.token;

  if (config.requireAuth !== false && !token) {
    throw new Error('[instollar-sdk] Cannot connect socket without an access token.');
  }

  const auth = config.buildAuth ? config.buildAuth(tokenData) : token ? { token } : undefined;
  const query = buildQueryPayload(config, tokenData);

  return {
    autoConnect: false,
    ...config.options, // Spread user options first so they can be default
    auth,
    query,
  };
};

/**
 * Initializes the SDK socket client configuration.
 * Call this once before `connectSocket()` to define the realtime URL and auth mapping.
 */
export const initSocket = (config: InstollarSocketConfig): void => {
  // Check if we are already initialized with this exact URL and Path
  const isSameConfig = 
    socketConfig && 
    socketConfig.url === config.url && 
    socketConfig.options?.path === config.options?.path;

  // Ultimate Idempotency: If the config is identical, do absolutely nothing.
  // This prevents reconnection loops from multiple callers.
  if (isSameConfig && socket) {
    return;
  }

  const isUrlOrPathChanging = 
    socketConfig && 
    (socketConfig.url !== config.url || socketConfig.options?.path !== config.options?.path);

  socketConfig = {
    ...config,
    url: config.url,
  };

  // Only disconnect if the target is actually changing.
  if (socket && isUrlOrPathChanging) {
    socket.disconnect();
    socket = null;
    connectingPromise = null;
  }
};

/**
 * Connects the SDK socket client using the configured URL and current token from SDK storage.
 * Reuses an existing socket instance when available and updates its auth payload before connecting.
 */
export const connectSocket = async (): Promise<SocketClient> => {
  const config = getSocketConfig();

  // If we are already connected, reuse
  if (socket?.connected) return socket;

  // If a connection is already in progress, wait for it
  if (connectingPromise) return connectingPromise;

  connectingPromise = (async () => {
    try {
      const options = await buildConnectionOptions(config);

      if (!socket) {
        socket = io(config.url, options);
      } else {
        socket.auth = options.auth ?? {};
      }

      if (!socket.connected) {
        socket.connect();
      }

      return socket;
    } finally {
      connectingPromise = null;
    }
  })();

  return connectingPromise;
};

/**
 * Disconnects the current socket instance and creates a fresh connection with the latest auth state.
 */
export const reconnectSocket = async (): Promise<SocketClient> => {
  disconnectSocket();
  return connectSocket();
};

/**
 * Reconnects an already-created socket so refreshed token data can be applied to the next connection.
 * Returns `null` when no socket has been created yet.
 */
export const refreshSocketAuth = async (): Promise<SocketClient | null> => {
  if (!socket) return null;
  return reconnectSocket();
};

/**
 * Returns the underlying `socket.io-client` instance, or `null` if the socket has not been connected yet.
 */
export const getSocket = (): SocketClient | null => socket;

/**
 * Returns `true` when the current socket instance is actively connected.
 */
export const isSocketConnected = (): boolean => Boolean(socket?.connected);

/**
 * Closes the current socket connection and clears the cached socket instance.
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    connectingPromise = null;
  }
};

/**
 * Subscribes to a socket event and returns an unsubscribe function for that specific handler.
 */
export const socketOn = <TPayload = unknown>(
  event: string,
  handler: SocketEventHandler<TPayload>
): (() => void) => {
  const instance = getSocket();
  if (!instance) {
    // If not connected, we try to auto-connect or at least log.
    // Throwing here crashes React apps during fast-refresh.
    console.warn('[instollar-sdk] socketOn called before connectSocket(). Listener may not attach.');
    return () => {};
  }

  instance.on(event, handler as SocketEventHandler);
  return () => {
    instance.off(event, handler as SocketEventHandler);
  };
};

/**
 * Subscribes to the next occurrence of a socket event and then removes the handler automatically.
 * Also returns an unsubscribe function in case the listener should be removed earlier.
 */
export const socketOnce = <TPayload = unknown>(
  event: string,
  handler: SocketEventHandler<TPayload>
): (() => void) => {
  const instance = getSocket();
  if (!instance) {
    throw new Error('[instollar-sdk] Socket not connected. Call connectSocket() first.');
  }

  instance.once(event, handler as SocketEventHandler);
  return () => {
    instance.off(event, handler as SocketEventHandler);
  };
};

/**
 * Removes a socket event handler. When no handler is provided, all listeners for that event are removed.
 */
export const socketOff = <TPayload = unknown>(
  event: string,
  handler?: SocketEventHandler<TPayload>
): void => {
  const instance = getSocket();
  if (!instance) {
    throw new Error('[instollar-sdk] Socket not connected. Call connectSocket() first.');
  }

  if (handler) {
    instance.off(event, handler as SocketEventHandler);
    return;
  }

  instance.off(event);
};

/**
 * Emits a socket event with an optional payload to the server.
 */
export const socketEmit = <TPayload = unknown>(event: string, payload?: TPayload): void => {
  const instance = getSocket();
  if (!instance) {
    throw new Error('[instollar-sdk] Socket not connected. Call connectSocket() first.');
  }

  if (payload === undefined) {
    instance.emit(event);
    return;
  }

  instance.emit(event, payload);
};
