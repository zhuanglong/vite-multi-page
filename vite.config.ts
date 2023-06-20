import { resolve } from 'path';

// import legacy from '@vitejs/plugin-legacy'; // 向下兼容插件
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import postCssPxToRem from 'postcss-pxtorem';
import del from 'rollup-plugin-delete'; // 删除文件和文件夹
import esbuild from 'rollup-plugin-esbuild';
import { visualizer } from 'rollup-plugin-visualizer'; // 打包模块可视化分析
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';
import compressPlugin from 'vite-plugin-compression'; // 使用 gzip 压缩资源
import { createHtmlPlugin } from 'vite-plugin-html'; // 插入数据到 index.html

import { getAppInfo } from './scripts/appInfo';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // https://cn.vitejs.dev/config/#conditional-config
  // 编译时环境变量
  const { projectName, report } = process.env as unknown as NodeEnv;
  // 加载 .env 环境变量
  const env = loadEnv(mode, './') as unknown as ImportMetaEnv;
  // 对应项目的配置
  const appInfo = getAppInfo(env.VITE_APP_ENV, projectName);
  // 对应的项目路径
  const projectPath = `src/projects/${projectName}`;

  return {
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      splitVendorChunkPlugin(),
      createHtmlPlugin({
        inject: {
          data: {
            projectPath,
            title: appInfo.title,
          },
        },
      }),
      command === 'build' && del({ targets: `dist/${projectName}-${env.VITE_APP_ENV}` }),
      report === 'true' &&
        visualizer({
          filename: `dist/${projectName}-${env.VITE_APP_ENV}/report.html`,
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      report !== 'true' &&
        compressPlugin({
          ext: '.gz',
          filter: /\.(js|css)$/i,
          threshold: 10240,
          deleteOriginFile: true,
        }),
      // 解决 dev 模式无法在 Chrome 70 下使用 optional chaining 语法，https://github.com/vitejs/vite/issues/5222
      // 目前钉钉 webview 的内核是 Chrome/69.x.x，如需在钉钉上调试，请启用 esbuild
      {
        ...esbuild({
          target: 'chrome70',
          include: /\.(vue|ts|tsx)$/,
          loaders: {
            '.vue': 'js',
          },
        }),
        enforce: 'post',
      },
      // legacy(),
    ],
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
      },
    },
    css: {
      // 引入预处理全局 CSS
      // https://cn.vitejs.dev/config/#css-preprocessoroptions
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/design/flexible/flexible.scss';",
        },
      },
      postcss: {
        plugins: [
          // 解决打包警告 `"@charset" must be the first rule in the file`
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
          postCssPxToRem({
            rootValue: 100, // 根据 flexible.scss 中的 1rem = 100px
            propList: ['*'],
          }),
        ],
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(appInfo),
    },
    server: {
      host: '0.0.0.0', // 局域网访问
      proxy: {
        '/dev-api': {
          target: 'https://dev.myserver.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
    build: {
      emptyOutDir: false,
      // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式
      // https://cn.vitejs.dev/config/#build-csstarget
      cssTarget: 'chrome61',
      // https://rollupjs.org/guide/en/#outputoptions-object
      rollupOptions: {
        input: {
          index: './index.html', // https://cn.vitejs.dev/guide/build.html#multi-page-app
        },
        output: {
          dir: `dist/${projectName}-${env.VITE_APP_ENV}`,
          // js 和 css 文件夹分离
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
  };
});
