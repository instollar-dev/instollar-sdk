import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'web/index': 'src/web/index.tsx',
    'native/index': 'src/native/index.tsx',
  },
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    compilerOptions: { skipLibCheck: true },
  },
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-native',
    'react-native-svg',
    'iconsax-react',
    'iconsax-react-nativejs',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
