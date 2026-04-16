import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'index.ts',
    'core/api/index': 'core/api/index.ts',
    'core/storage/index': 'core/storage/index.ts',
    'core/socket/index': 'core/socket/index.ts',
    'core/toast/index': 'core/toast/index.ts',
    'core/app/countries/index': 'core/app/countries/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    compilerOptions: { skipLibCheck: true },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['axios', 'expo-secure-store', 'socket.io-client'],
  minify: process.env.NODE_ENV === 'production',
});
