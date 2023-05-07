import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import vitePluginAutoGenerationWebp from './plugins/vite-plugin-auto-generation-webp';

export default defineConfig(({ mode }) => {
  const envDir = '../';
  const env = loadEnv(mode, envDir);

  return {
    envDir,
    root: './',
    publicDir: './src/public',
    build: {
      emptyOutDir: true,
      outDir: path.resolve(__dirname, '../server/public')
    },
    server: {
      host: 'localhost',
      port: Number(env.VITE_APP_CLIENT_PORT),
      proxy: {
        '/uploads': {
          target: env.VITE_APP_SERVER_URL
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, 'node_modules')
      },
      extensions: ['.js', '.json', '.scss']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/_config.scss";
            @import "@/assets/styles/_mixins.scss";
          `
        }
      }
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/sprites')],
        symbolId: '[name]',
        inject: 'body-first',
        customDomId: 'sprite-svg'
      }),
      vitePluginAutoGenerationWebp({
        src: [
          './src/public/images/**/*.{png,jpg,jpeg}'
        ]
      })
    ]
  }
});