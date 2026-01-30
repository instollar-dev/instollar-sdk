# instollar-sdk

SDK for **Instollar**: **React** (web) and **Expo** apps.

## Features

- **Storage** – Web: `localStorage`. Expo: **Expo SecureStore** (encrypted).
- **API** – Axios-based HTTP client with auth, token refresh, and error handling
- **Toast** – Simple cross-platform toasts (web: DOM; Expo: console)
- **Types** – TypeScript types for config, tokens, and API responses

## Install

```bash
npm install instollar-sdk axios
```

Expo apps (for SecureStore on mobile):

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

## Subpath exports

- `instollar-sdk` – main entry
- `instollar-sdk/storage` – storage only
- `instollar-sdk/api` – api + axios + endpoints
- `instollar-sdk/toast` – toast only

## Endpoints

See `core/api/api-endpoints.ts`: `loginEndpoint`, `refreshTokenEndpoint`, `logoutEndpoint`, `getCurrentUserEndpoint`, `updateUserEndpoint(userId)`. Override or pass full paths to `api.get/post/...`.

## License

MIT
