import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    compilerOptions: { skipLibCheck: true },
  },
  sourcemap: true,
  clean: true,
  external: ['react', 'react-native', '@instollar-dev/tokens'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
