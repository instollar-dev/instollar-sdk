# instollar-sdk

Cross-platform SDK for **Instollar**, usable in **React** and **React Native** apps.

## Features

- **Storage** – Platform-agnostic storage (web: `localStorage`, mobile: AsyncStorage or Expo SecureStore)
- **API** – Axios-based HTTP client with auth, token refresh, and error handling
- **Toast** – Simple cross-platform toasts (web: DOM; React Native: console)
- **Types** – TypeScript types for config, tokens, and API responses

## Install

```bash
npm install instollar-sdk axios
```

For React Native with secure storage (optional):

```bash
npm install expo-secure-store
# or
npm install @react-native-async-storage/async-storage
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

// 1. Storage
initStorage(createWebStorage());

// 2. API
initAxios({
  baseUrl: 'https://api.instollar.com',
  onAuthError: () => {
    window.location.href = '/login';
  },
  onError: (err) => console.error(err.message),
});

// 3. After login, save tokens
await saveToStorage(StorageKeys.TOKEN_DATA, {
  token: 'access-token',
  refreshToken: 'refresh-token',
});

// 4. Use API
const { data } = await api.get('/users/me');
```

### React Native

```ts
import {
  initStorage,
  createMobileStorage,
  initAxios,
  api,
  saveToStorage,
  StorageKeys,
} from 'instollar-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Storage (AsyncStorage or Expo SecureStore via createExpoSecureStorage)
initStorage(createMobileStorage(AsyncStorage));

// 2. API
initAxios({
  baseUrl: 'https://api.instollar.com',
  onAuthError: () => {
    // e.g. navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  },
  onError: (err) => Alert.alert('Error', err.message),
});

// 3. After login
await saveToStorage(StorageKeys.TOKEN_DATA, {
  token: 'access-token',
  refreshToken: 'refresh-token',
});

// 4. Use API
const { data } = await api.get('/users/me');
```

### Auto-detect platform

```ts
import { initStorageAuto, initAxios, api } from 'instollar-sdk';

initStorageAuto(); // uses localStorage on web, Expo SecureStore on mobile
initAxios({ baseUrl: 'https://api.instollar.com' });

const { data } = await api.get('/users/me');
```

## API client

The `api` object supports:

- `api.get<T>(url, params?, options?, metadata?)`
- `api.post<T>(url, data?, options?, metadata?)`
- `api.put<T>(url, data?, options?, metadata?)`
- `api.patch<T>(url, data?, options?, metadata?)`
- `api.delete<T>(url, params?, options?, metadata?)`
- `api.formData<T>(url, formData, method?, options?, metadata?)`
- `api.request<T>(endpoint, options, metadata?)`

Tokens are read from storage and sent as `Authorization: Bearer <token>`. On 401, the SDK will try to refresh using `refreshTokenEndpoint` (`/auth/refresh` by default) and retry the request.

## Storage

- **Web:** `createWebStorage()` (localStorage)
- **React Native:** `createMobileStorage(AsyncStorage)` or `createExpoSecureStorage()` (requires `expo-secure-store`)

Storage keys:

- `StorageKeys.TOKEN_DATA` – access + refresh token
- `StorageKeys.APP_CONFIG` – app config

Helpers: `getFromStorage<T>(key)`, `saveToStorage(key, value)`, `removeFromStorage(key)`, `clearStorage()`.

## Subpath exports

- `instollar-sdk` – main entry (storage, api, types, toast)
- `instollar-sdk/storage` – storage only
- `instollar-sdk/api` – api + axios setup + endpoints
- `instollar-sdk/toast` – toast only

## Endpoints

Default endpoint constants are in `core/api/api-endpoints.ts`. You can override or extend them:

- `loginEndpoint`, `refreshTokenEndpoint`, `logoutEndpoint`
- `getCurrentUserEndpoint`, `updateUserEndpoint(userId)`

Use your own routes by passing full paths to `api.get/post/...`.

## License

MIT
