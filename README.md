# instollar-sdk

SDK for **Instollar**: **React** (web) and **Expo** apps.

## Features

- **Storage** – Web: `localStorage`. Expo: **Expo SecureStore** (encrypted).
- **API** – Axios-based HTTP client with auth, token refresh, and error handling
- **Socket** – Built-in realtime connection helpers with token-aware auth
- **Toast** – Simple cross-platform toasts (web: DOM; Expo: console)
- **Countries** – Country/state/LGA dataset with search and lookup helpers
- **Types** – TypeScript types for config, tokens, and API responses

## Install

### From npm (when published)

```bash
npm install instollar-sdk axios
```

### From the repo

Install directly from the GitHub repo (no npm publish needed):

```bash
npm install github:instollar-dev/instollar-sdk axios
```

**Branch or tag:** add `#branch` or `#v1.0.0`:

```bash
npm install github:instollar-dev/instollar-sdk#main axios
npm install github:instollar-dev/instollar-sdk#v1.0.0 axios
```

**Local path** (e.g. sibling folder or monorepo):

```bash
npm install ../instollar-sdk axios
```

Or in your app’s `package.json`:

```json
{
  "dependencies": {
    "instollar-sdk": "file:../instollar-sdk",
    "axios": "^1.6.0"
  }
}
```

The package runs `prepare` on install, so it builds automatically when installed from Git or a local path.

**Private repo (CI / CodeBuild):**  
The repo is private, so CI needs a GitHub token to clone it.

1. **package.json** – use HTTPS so the lockfile doesn’t use SSH:
   ```json
   "instollar-sdk": "git+https://github.com/instollar-dev/instollar-sdk.git"
   ```

2. **GitHub token** – create a Personal Access Token (Settings → Developer settings → PAT) with `repo` scope. In CodeBuild, add it as an env var (e.g. `GITHUB_TOKEN`) from Secrets Manager or the project env.

3. **Before `npm install` in your build** – tell git to use the token for GitHub:
   ```yaml
   - git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
   - npm install
   ```
   Then any `git+https://github.com/...` dependency will be cloned with the token. Never commit the token.

### Expo apps (for SecureStore on mobile)

```bash
npx expo install expo-secure-store
```

## Setup

### Web (React)

```ts
import {
  initStorage,
  createWebStorage,
  initAxios,
  api,
  saveToStorage,
  StorageKeys,
} from 'instollar-sdk';

initStorage(createWebStorage());
initAxios({
  baseUrl: 'https://api.instollar.co',
  onAuthError: () => { window.location.href = '/login'; },
  onError: (err) => console.error(err.message),
});

await saveToStorage(StorageKeys.TOKEN_DATA, { token: '...', refreshToken: '...' });
const { data } = await api.get('/users/me');
```

### Expo

```ts
import {
  initStorage,
  createExpoSecureStorage,
  initAxios,
  api,
  saveToStorage,
  StorageKeys,
} from 'instollar-sdk';

initStorage(createExpoSecureStorage());
initAxios({
  baseUrl: 'https://api.instollar.co',
  onAuthError: () => { /* e.g. router.replace('/login') */ },
  onError: (err) => Alert.alert('Error', err.message),
});

await saveToStorage(StorageKeys.TOKEN_DATA, { token: '...', refreshToken: '...' });
const { data } = await api.get('/users/me');
```

### Auto-detect platform

```ts
import { initStorageAuto, initAxios, api } from 'instollar-sdk';

initStorageAuto(); // web → localStorage, Expo → SecureStore
initAxios({ baseUrl: 'https://api.instollar.co' });
const { data } = await api.get('/users/me');
```

## API client

- `api.get<T>(url, params?, options?, metadata?)`
- `api.post<T>(url, data?, options?, metadata?)`
- `api.put<T>(url, data?, options?, metadata?)`
- `api.patch<T>(url, data?, options?, metadata?)`
- `api.delete<T>(url, params?, options?, metadata?)`
- `api.formData<T>(url, formData, method?, options?, metadata?)`
- `api.request<T>(endpoint, options, metadata?)`

Tokens are read from storage and sent as `Authorization: Bearer <token>`. On 401, the SDK refreshes using `refreshTokenEndpoint` and retries.

## Socket connections

The SDK now includes a socket client wrapper for consuming apps. It reads the current access token from SDK storage and gives you helpers to connect, listen for events, and emit events with payloads.

### Setup

Initialize the socket once in your app:

```ts
import { initSocket } from 'instollar-sdk';

initSocket({
  url: 'https://api.instollar.co',
});
```

By default, the SDK sends the access token as:

```ts
auth: {
  token: '<access-token>',
}
```

If your backend expects a different auth shape, customize it with `buildAuth`:

```ts
import { initSocket } from 'instollar-sdk';

initSocket({
  url: 'https://api.instollar.co',
  buildAuth: (tokenData) => ({
    accessToken: tokenData?.token,
    refreshToken: tokenData?.refreshToken,
  }),
});
```

### Connect and disconnect

```ts
import { connectSocket, disconnectSocket } from 'instollar-sdk';

await connectSocket();

disconnectSocket();
```

### Listen to events

```ts
import { connectSocket, socketOn, socketOff } from 'instollar-sdk';

await connectSocket();

const unsubscribeNotification = socketOn('notification', (payload) => {
  console.log('notification', payload);
});

socketOn('wallet.updated', (payload) => {
  console.log('wallet updated', payload);
});

unsubscribeNotification();
socketOff('wallet.updated');
```

You can also listen once:

```ts
import { connectSocket, socketOnce } from 'instollar-sdk';

await connectSocket();

socketOnce('session.ready', (payload) => {
  console.log('session ready', payload);
});
```

### Emit events with payloads

```ts
import { connectSocket, socketEmit } from 'instollar-sdk';

await connectSocket();

socketEmit('join.room', { roomId: 'abc123' });
socketEmit('send.message', {
  roomId: 'abc123',
  body: 'Hello from the SDK',
});
```

### Refreshing socket auth

If the SDK refreshes the HTTP token and your backend expects the socket to reconnect with the latest token, use `refreshSocketAuth` in `onTokenRefreshed`:

```ts
import { initAxios, refreshSocketAuth } from 'instollar-sdk';

initAxios({
  baseUrl: 'https://api.instollar.co',
  onTokenRefreshed: async () => {
    await refreshSocketAuth();
  },
});
```

### Available helpers

- `initSocket(config)` - initialize the socket configuration before any connection attempt
- `connectSocket()` - connect with the latest token stored by the SDK and return the socket instance
- `reconnectSocket()` - force a fresh connection using the latest auth payload
- `refreshSocketAuth()` - reconnect an existing socket after token refresh and return `null` if no socket exists yet
- `disconnectSocket()` - disconnect and clear the current socket instance
- `getSocket()` - access the underlying `socket.io-client` instance when you need lower-level control
- `isSocketConnected()` - check whether the current socket is connected
- `socketOn(event, handler)` - subscribe to an event and receive an unsubscribe function
- `socketOnce(event, handler)` - subscribe to the next occurrence of an event only
- `socketOff(event, handler?)` - remove a specific handler or all handlers for an event
- `socketEmit(event, payload?)` - emit an event with an optional payload to the server

### Notes

- Use the same base URL or realtime host your backend expects.
- Call `initSocket()` before `connectSocket()`.
- The socket connection requires `StorageKeys.TOKEN_DATA` to already contain a token unless you set `requireAuth: false`.
- On logout, call `disconnectSocket()` and clear SDK storage.

## Toasts & Feedback

The SDK includes a built-in, multi-line toast system with icons and context-aware styling.

### Automatic Extraction
When you use `showSuccessToast: true` or `showErrorToast: true`, the SDK intelligently extracts content from the API response/error:
- **Title**: Success state (e.g., "Update Successful") or Error type (e.g., "CONFLICT").
- **Description**: The message returned by the server.

### Basic Usage
```ts
api.post('/role/create', payload, {}, { 
  showSuccessToast: true, 
  showErrorToast: true 
});
```

### Advanced Customization
```ts
api.post('/update', data, {}, {
  showSuccessToast: {
    title: 'Custom Title',
    description: 'Custom Description',
    position: 'bottom-center'
  }
});
```

### Behavior
- **Hover to Pause**: Hovering over a toast pauses the auto-close timer.
- **Dismissible**: All toasts have a close button and are dismissible by default.

## API response types

Backend responses are typed with `ApiResponse<T>`, `PaginationMeta`, and `SortOrder`. Use them so responses are consistent across the app.

```ts
import { api, ApiResponse, PaginationMeta } from 'instollar-sdk';

interface User {
  id: string;
  name: string;
}

// List endpoint with pagination
const res = await api.get<ApiResponse<User[]>>('/users', { page: 1, limit: 20 });
const list = res.data?.data;              // User[] | undefined
const pagination = res.data?.pagination;  // PaginationMeta | undefined
const message = res.data?.message;

// Single resource
const userRes = await api.get<ApiResponse<User>>('/users/me');
const user = userRes.data?.data;
```

**Types:**

- **`ApiResponse<T>`** – `data`, `pagination`, `message`, `success`, `errors` (field errors as `Record<string, string[]>`)
- **`PaginationMeta`** – `page`, `limit`, `total`, `totalPages`, `hasNext`, `hasPrev`, `nextPage`, `prevPage`, `sortOrder`
- **`SortOrder`** – `'asc' | 'desc'`

## Storage

- **Web:** `createWebStorage()` (localStorage)
- **Expo:** `createExpoSecureStorage()` (Expo SecureStore, encrypted)

Keys: `StorageKeys.TOKEN_DATA`, `StorageKeys.APP_CONFIG`.  
Helpers: `getFromStorage<T>(key)`, `saveToStorage(key, value)`, `removeFromStorage(key)`, `clearStorage()`.

## Countries

Use the built-in countries dataset and helpers:

```ts
import {
  COUNTRIES,
  getStatesForCountry,
  getLGAsForState,
  searchCountries,
} from 'instollar-sdk';

const nigeriaStates = getStatesForCountry('NG');
const anambraLgas = getLGAsForState('NG', 'Anambra');
const results = searchCountries('nig');
```

You can also import only the countries module:

```ts
import { COUNTRIES, searchCountries } from 'instollar-sdk/countries';
```

## Subpath exports

- `instollar-sdk` – main entry
- `instollar-sdk/storage` – storage only
- `instollar-sdk/api` – api + axios + endpoints
- `instollar-sdk/socket` – socket connection helpers
- `instollar-sdk/toast` – toast only
- `instollar-sdk/countries` – countries data + helper utilities

## Endpoints

See `core/api/api-endpoints.ts`: `loginEndpoint`, `refreshTokenEndpoint`, `logoutEndpoint`, `getCurrentUserEndpoint`, `updateUserEndpoint(userId)`. Override or pass full paths to `api.get/post/...`.

## License

MIT
