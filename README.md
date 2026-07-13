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

Install **one package**. Tokens, web UI, and Iconsax icons come with it.

### From GitHub Packages (recommended)

```bash
npm install instollar-sdk axios
```

With `.npmrc` scoped to `@instollar-dev` (see below). React / React DOM should already be in your app.

### From the repo (git)

```bash
npm install github:instollar-dev/instollar-sdk#v1.1.0 axios
```

**Branch or tag:**

```bash
npm install github:instollar-dev/instollar-sdk#main axios
npm install github:instollar-dev/instollar-sdk#v1.1.0 axios
```

**Local path:**

```bash
npm install ../instollar-sdk axios
```

Or in your app’s `package.json`:

```json
{
  "dependencies": {
    "instollar-sdk": "github:instollar-dev/instollar-sdk#v1.1.0",
    "axios": "^1.6.0"
  }
}
```

You do **not** need to install `@instollar-dev/tokens`, `@instollar-dev/ui-web`, `@instollar-dev/icons`, or `iconsax-react` separately for web — they are dependencies of `instollar-sdk`.

The package runs `prepare` on install, so it builds when installed from Git or a local path.

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

When `connectSocket()` runs, the SDK reads `StorageKeys.TOKEN_DATA` and sends the access token in both places by default:

```ts
auth: {
  token: '<access-token>',
}

query: {
  Authorization: 'Bearer <access-token>',
}
```

This makes it work for backends that read the token from either the socket `auth` payload or the connection query string.

If your backend expects a different `auth` shape, customize it with `buildAuth`:

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

If you already pass custom socket query params in `options.query`, the SDK preserves them and adds `Authorization` alongside them:

```ts
import { initSocket } from 'instollar-sdk';

initSocket({
  url: 'https://api.instollar.co',
  options: {
    query: {
      tenantId: 'tenant_123',
    },
  },
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
- `reconnectSocket()` - force a fresh connection using the latest auth payload and query token
- `refreshSocketAuth()` - reconnect an existing socket after token refresh so both auth and query token stay current, and return `null` if no socket exists yet
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
- The SDK adds `Authorization=Bearer <token>` to the socket query string automatically on connection.
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

### Manual Toast Invocation

You can manually trigger toasts using the `toast` object from the SDK:

```ts
import { toast } from 'instollar-sdk';

toast.success('Action successful!');
toast.error('An error occurred.');
toast.info('For your information...');
toast.warning('Warning message here.');

// The message variant has a longer display duration (10s by default) and premium styling
toast.message('An improved version of Fluent is now available.', {
  title: 'New version available'
});

// Full control
toast.show({
  type: 'message',
  title: 'Update',
  description: 'A new update is available.',
  autoClose: 15000,
  position: 'top-right'
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

## Languages

Use the built-in languages dataset (Africa-first list covering West, East, Central, North and Southern Africa plus major platform languages like English, French, Portuguese, Spanish) and helpers:

```ts
import {
  LANGUAGES,
  searchLanguages,
  getLanguageByCode,
} from 'instollar-sdk';

const yoruba = getLanguageByCode('yo');
const results = searchLanguages('swa');
```

You can also import only the languages module:

```ts
import { LANGUAGES, searchLanguages } from 'instollar-sdk/languages';
```

## Subpath exports

- `instollar-sdk` – main entry
- `instollar-sdk/storage` – storage only
- `instollar-sdk/api` – api + axios + endpoints
- `instollar-sdk/socket` – socket connection helpers
- `instollar-sdk/toast` – toast only
- `instollar-sdk/countries` – countries data + helper utilities
- `instollar-sdk/languages` – languages data + helper utilities

## Endpoints

See `core/api/api-endpoints.ts`: `loginEndpoint`, `refreshTokenEndpoint`, `logoutEndpoint`, `getCurrentUserEndpoint`, `updateUserEndpoint(userId)`. Override or pass full paths to `api.get/post/...`.

## Design system packages

This repo is an npm workspaces monorepo. The core SDK stays at the root (`instollar-sdk`). UI and styling packages live under `packages/`:

| Package | Install name | Purpose |
|---------|--------------|---------|
| Core SDK | `instollar-sdk` | API, storage, socket, toast |
| Tokens | `@instollar-dev/tokens` | Shared colors, spacing, typography |
| Icons | `@instollar-dev/icons` | Curated Iconsax icons (web + native) |
| Tailwind preset | `@instollar-dev/tailwind-preset` | Tailwind theme from tokens (SDK dev only) |
| Web UI | `@instollar-dev/ui-web` | React web components |
| Native UI | `@instollar-dev/ui-native` | React Native / Expo components |

> **Scope note:** GitHub Packages requires the scope `@instollar-dev` to match your GitHub org (`instollar-dev`).

### Install from GitHub Packages (recommended for production)

Packages are published to `https://npm.pkg.github.com` when you push a `v*` tag.

**1. In your consuming app, create `.npmrc`:**

```
@instollar-dev:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Copy from `.npmrc.example` in this repo. Never commit your token.

**2. Set your PAT** (needs `read:packages` and `repo` for private packages):

```bash
export NODE_AUTH_TOKEN=ghp_your_token_here
```

**3. Install only the SDK:**

```bash
npm install instollar-sdk@^1.1.0 axios
```

```json
{
  "dependencies": {
    "instollar-sdk": "^1.1.0",
    "axios": "^1.6.0"
  }
}
```

Tokens, web UI, Iconsax icons, and `iconsax-react` install automatically as transitive dependencies.

**4. CI (GitHub Actions)** – no git config needed, just registry auth:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    registry-url: https://npm.pkg.github.com

- run: npm ci
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

For cross-org installs, use a PAT with `read:packages` stored as a repo secret.

### Install from Git (alternative)

Core SDK (unchanged):

```bash
npm install github:instollar-dev/instollar-sdk#v1.1.0 axios
```

Design system packages install **automatically** with `instollar-sdk`. Prefer:

```json
{
  "dependencies": {
    "instollar-sdk": "github:instollar-dev/instollar-sdk#v1.1.0",
    "axios": "^1.6.0"
  }
}
```

Subpath installs (`:packages/tokens`, etc.) are only needed if you consume a package in isolation.
### Web app setup (no Tailwind required)

`instollar-sdk` ships **precompiled CSS** for UI components. Your app does not need `tailwindcss`, `postcss`, or a `tailwind.config` file.

**1. Install**

```bash
npm install instollar-sdk axios
```

**2. Import styles once** (e.g. `main.tsx`)

```ts
import 'instollar-sdk/styles.css';
```

**3. Use API + UI + icons from one import**

```tsx
import {
  initStorageAuto,
  initAxios,
  Button,
  Input,
  typography,
  HomeIcon,
  Icon,
} from 'instollar-sdk';

initStorageAuto();
initAxios({ baseUrl: 'https://api.instollar.co' });

export function LoginForm() {
  return (
    <div className="space-y-4 p-6">
      <h1 className={typography.heading}>
        <HomeIcon size={28} variant="Bold" /> Sign in
      </h1>
      <p className={typography.caption}>Welcome back to Instollar</p>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Button type="submit">
        Continue <Icon name="arrowRight" size={16} />
      </Button>
    </div>
  );
}
```

#### Tailwind & typography class suggestions (VS Code)

Install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension, then add to your **consuming app's** `.vscode/settings.json`:

```json
{
  "tailwindCSS.experimental.configFile": "node_modules/instollar-sdk/packages/ui-web/tailwind.config.ts",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

(Or after Packages install: `node_modules/@instollar-dev/ui-web/tailwind.config.ts` if resolved as a nested dependency.)

Typography class map (also exported as `typography` from `instollar-sdk`):

| Class | Use |
|-------|-----|
| `instollar-text-display` | Hero / display text |
| `instollar-text-heading` | Page headings |
| `instollar-text-title` | Section titles |
| `instollar-text-body` | Body copy |
| `instollar-text-body-sm` | Smaller body |
| `instollar-text-caption` | Captions, hints |
| `instollar-text-label` | Form labels |
| `instollar-text-overline` | Overlines, badges |

### Icons (Iconsax)

Icons come with `instollar-sdk`. Prefer importing from the main package:

```tsx
import { HomeIcon, SearchIcon, Icon } from 'instollar-sdk';

<HomeIcon size={20} color="#1556e1" variant="Bold" />
<Icon name="search" size={24} variant="Linear" />
```

**Expo / React Native icons** (extra peers only for mobile):

```bash
npm install iconsax-react-nativejs
npx expo install react-native-svg
```

```tsx
import { HomeIcon, Icon } from '@instollar-dev/icons/native';
```

Variants: `Linear` (default), `Outline`, `TwoTone`, `Bulk`, `Broken`, `Bold`.

### Charts (Recharts)

Area + donut charts matching the dashboard mock ship with `instollar-sdk` (Recharts is a dependency — no extra install).

```tsx
import {
  AreaTrendChart,
  DonutChart,
  areaTrendChartDemoData,
  donutChartDemoData,
} from 'instollar-sdk';

// Put your own date pickers / year select in `actions`
<AreaTrendChart
  title="Revenue Trend"
  description="Last 7 days performance"
  data={areaTrendChartDemoData}
  actions={<>{/* From / To / Year controls from your app */}</>}
/>

<DonutChart
  title="Sales Distribution"
  description="By channel"
  data={donutChartDemoData}
/>
```

### Component list / gallery in your app

Keep your components view in the consuming codebase; drive it from the SDK catalog:

```tsx
import { webComponentCatalog } from 'instollar-sdk';

export function ComponentsPage() {
  return (
    <div className="grid gap-8">
      {webComponentCatalog.map((item) => {
        const Preview = item.Component;
        return (
          <section key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <span>{item.category}</span>
            <Preview {...item.previewProps} />
          </section>
        );
      })}
    </div>
  );
}
```

You can filter (`webComponentCatalog.filter(c => c.category === 'Charts')`) or wrap items with your own layout/docs — the live components stay in the SDK.

### Expo / React Native setup

Core storage/API still come from `instollar-sdk`. Native UI is separate for now:

```tsx
import { initStorageAuto, initAxios } from 'instollar-sdk';
import { Button, Input, Text } from '@instollar-dev/ui-native';
```

(Those native packages still require installing `@instollar-dev/ui-native` until we fold them into the same umbrella install if needed.)

### Build all packages locally

```bash
npm install
npm run build:all
```

## Publishing to GitHub Packages

Pushing a version tag automatically publishes all packages via `.github/workflows/publish.yml`.

### One-time GitHub setup

1. Open the repo on GitHub → **Settings → Actions → General**
2. Under **Workflow permissions**, choose **Read and write permissions**
3. Ensure **Allow GitHub Actions to create and approve pull requests** is enabled if your org requires it
4. Confirm packages are visible under the org's **Packages** tab after first publish

### Release checklist

1. **Bump versions** in every `package.json` (keep them in sync, e.g. `1.1.0`)
2. **Commit and push** to `main`
3. **Tag and push** the release:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```
4. Watch **Actions** → **Publish** workflow complete
5. Verify packages appear at `github.com/orgs/instollar-dev/packages`

The workflow publishes in order: `tokens` → `tailwind-preset` → `ui-web` → `ui-native` → `instollar-sdk`.

### PAT scopes summary

| Use case | Token scopes |
|----------|----------------|
| Install packages locally / CI | `read:packages`, `repo` (private) |
| Publish (CI uses built-in `GITHUB_TOKEN`) | automatic on tag push |
| Git URL install (alternative) | `repo` only |

---

## Production install from GitHub (git URLs)

This is the **alternative** to GitHub Packages. Use registry install (above) for simpler CI.

### On GitHub (one-time / per release)

1. **Push the repo** to `github.com/instollar-dev/instollar-sdk` (or your org).

2. **Grant access** – anyone or any CI that installs the SDK needs read access to the repo:
   - **Developers:** add as collaborators (Settings → Collaborators), or grant org team access.
   - **CI:** use a machine account or `GITHUB_TOKEN` with `repo` scope.

3. **Tag each release** – consumers pin to tags for stable prod builds:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

4. **Optional – GitHub Actions CI** on the SDK repo (validates before you tag):
   ```yaml
   # .github/workflows/ci.yml
   on: [push, pull_request]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20 }
         - run: npm ci
         - run: npm run build:all
         - run: npm run typecheck
   ```

### In your consuming app

**`package.json`** – use HTTPS git URLs and pin a tag:

```json
{
  "dependencies": {
    "instollar-sdk": "github:instollar-dev/instollar-sdk#v1.1.0",
    "axios": "^1.6.0"
  }
}
```

For Expo / mobile-native UI only, add `@instollar-dev/ui-native` (and icon native peers) separately for now.
### Personal Access Token (local dev)

1. GitHub → **Settings → Developer settings → Personal access tokens**
2. Create a token with **`repo`** scope (full control of private repositories)
3. If your org uses SSO, **authorize the token** for the org after creating it
4. Before `npm install` on your machine:
   ```bash
   export GITHUB_TOKEN=ghp_xxxxxxxx
   git config --local url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
   npm install
   ```
   Never commit the token. Add it to your shell profile or a local env file that is gitignored.

### CI / production builds (GitHub Actions example)

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Authenticate git for private SDK
        run: git config --global url."https://${{ secrets.GITHUB_TOKEN }}@github.com/".insteadOf "https://github.com/"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - run: npm ci
      - run: npm run build
```

Use a **PAT stored in repo secrets** (`GITHUB_TOKEN` or `GH_PAT`) with `repo` scope. The default `GITHUB_TOKEN` in Actions only works if the SDK repo is in the **same org** and Actions policy allows access; for cross-repo private deps, use a dedicated PAT.

### Checklist before going live

- [ ] SDK repo tagged (`v1.1.0` or later)
- [ ] Consuming `package.json` pins that tag (not `#main`)
- [ ] CI has a GitHub token with `repo` access before `npm install`
- [ ] `npm run build` succeeds in CI after install (SDK `prepare` builds `dist/`)
- [ ] Web apps import `instollar-sdk/styles.css` once at the app entry

### Troubleshooting

| Problem | Fix |
|---------|-----|
| `404` / `Repository not found` on install | Token missing `repo` scope, SSO not authorized, or user lacks repo access |
| `Could not read from remote` | Use `git+https://` not `git@github.com:` in package.json |
| Module not found after install | Tag doesn't exist, or install failed during `prepare` build |
| Styles missing in prod | Add `import 'instollar-sdk/styles.css'` in app entry |
| No class autocomplete | Add VS Code `tailwindCSS.experimental.configFile` setting (see Web app setup) |

## License

MIT
