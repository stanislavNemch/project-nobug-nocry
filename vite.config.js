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
          // Улучшенное разделение чанков для лучшего кеширования
          manualChunks(id) {
            // Библиотеки, которые редко меняются
            if (id.includes('swiper')) {
              return 'swiper';
            }
            if (id.includes('axios')) {
              return 'api';
            }
            if (id.includes('izitoast')) {
              return 'toast';
            }
            if (id.includes('css-star-rating')) {
              return 'rating';
            }
            if (id.includes('accordion-js')) {
              return 'accordion';
            }
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // Хеши для долгосрочного кеширования
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            // Разные папки для разных типов ресурсов
            const extType = assetInfo.name.split('.').at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `images/[name]-[hash][extname]`;
            }
            if (/css/i.test(extType)) {
              return `css/[name]-[hash][extname]`;
            }
            if (/woff2?|ttf|eot/i.test(extType)) {
              return `fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
      minify: 'esbuild',
      target: 'es2015',
    },
    // Оптимизация esbuild
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
    },
    plugins: [
      injectHTML(),
      !isBuild && FullReload(['./src/**/**.html']),
      isBuild &&
        viteCompression({
          verbose: true,
          algorithm: 'brotliCompress',
          ext: '.br',
          threshold: 1024,
          compressionOptions: {
            level: 11,
          },
        }),
      isBuild &&
        viteCompression({
          verbose: true,
          algorithm: 'gzip',
          ext: '.gz',
          threshold: 1024,
          compressionOptions: {
            level: 9,
          },
        }),
    ],
    css: {
      postcss: {
        plugins: [
          SortCss({
            sort: 'mobile-first',
          }),
        ],
      },
    },
  };
});
