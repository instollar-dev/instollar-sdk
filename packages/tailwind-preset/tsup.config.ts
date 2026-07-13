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
  external: ['@instollar-dev/tokens', 'tailwindcss'],
});
