import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    base: '/project-nobug-nocry/',
    build: {
      sourcemap: false,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      !isBuild && FullReload(['./src/**/**.html']),
      isBuild &&
        viteCompression({
          verbose: true,
          algorithm: 'brotliCompress',
          ext: '.br',
        }),
      isBuild &&
        viteCompression({
          verbose: true,
          algorithm: 'gzip',
          ext: '.gz',
        }),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
