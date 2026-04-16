# instollar-sdk

SDK for **Instollar**: **React** (web) and **Expo** apps.

## Features

- **Storage** – Web: `localStorage`. Expo: **Expo SecureStore** (encrypted).
- **API** – Axios-based HTTP client with auth, token refresh, and error handling
- **Realtime auth helper pattern** – Reuse SDK-managed tokens when wiring your own socket client
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

The SDK does not currently export a socket client or socket helper. The recommended pattern for a consuming app is:

1. Initialize storage and axios with the SDK.
2. Save login tokens into SDK storage as usual.
3. Read the access token from `StorageKeys.TOKEN_DATA`.
4. Pass that token into your app's own socket client.

### Example with `socket.io-client`

Install a socket library in the consuming app:

```bash
npm install socket.io-client
```

Create a small socket wrapper in your app:

```ts
import { getFromStorage, StorageKeys, type TokenData } from 'instollar-sdk';
import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = async (): Promise<Socket> => {
  const tokenData = await getFromStorage<TokenData>(StorageKeys.TOKEN_DATA);

  if (!tokenData?.token) {
    throw new Error('Cannot connect socket without an access token.');
  }

  socket = io('https://api.instollar.co', {
    transports: ['websocket'],
    auth: {
      token: tokenData.token,
    },
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = (): void => {
  socket?.disconnect();
  socket = null;
};
```

Use it after login or once the app boots with a stored session:

```ts
import { connectSocket } from './socket';

const socket = await connectSocket();

socket.on('connect', () => {
  console.log('socket connected', socket.id);
});

socket.on('notification', (payload) => {
  console.log('notification', payload);
});
```

### Refreshing the socket token

If your backend expects the latest access token on the socket connection, reconnect the socket when the SDK refreshes tokens:

```ts
import { initAxios } from 'instollar-sdk';
import { connectSocket, disconnectSocket } from './socket';

initAxios({
  baseUrl: 'https://api.instollar.co',
  onTokenRefreshed: async () => {
    disconnectSocket();
    await connectSocket();
  },
});
```

### Notes

- Keep the socket setup in the consuming app, not inside the SDK.
- Use the same base URL or realtime host your backend expects.
- If your backend expects the token in headers or query params instead of `auth`, pass it in the format your server requires.
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
- `instollar-sdk/toast` – toast only
- `instollar-sdk/countries` – countries data + helper utilities

## Endpoints

See `core/api/api-endpoints.ts`: `loginEndpoint`, `refreshTokenEndpoint`, `logoutEndpoint`, `getCurrentUserEndpoint`, `updateUserEndpoint(userId)`. Override or pass full paths to `api.get/post/...`.

## License

MIT
