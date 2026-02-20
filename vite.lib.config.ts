import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

/**
 * Vite config for building the component library as an npm package.
 * Outputs to dist/ for publishing; app dev/build uses default vite.config.ts.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ rollupTypes: true, tsconfigPath: './tsconfig.app.json' }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ComponentLibrary',
      fileName: 'component-library',
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    cssCodeSplit: true,
  },
});
