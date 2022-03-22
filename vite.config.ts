import type { UserConfig, ConfigEnv } from 'vite';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { injectHtml } from 'vite-plugin-html'; // 插入数据到 index.html
import { visualizer } from 'rollup-plugin-visualizer'; // 打包模块可视化分析
import del from 'rollup-plugin-delete'; // 删除文件和文件夹
import compressPlugin from 'vite-plugin-compression'; // 使用 gzip 压缩资源
// import esbuild from 'rollup-plugin-esbuild';
// import legacy from '@vitejs/plugin-legacy'; // 向下兼容插件

import { getAppInfo } from './scripts/appInfo';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // https://cn.vitejs.dev/config/#conditional-config
  // 编译时环境变量
  const { projectName, report } = process.env as unknown as NodeEnv;
  // 加载 .env 环境变量
  const env = loadEnv(mode, './') as unknown as ViteEnv;
  // 对应项目的配置
  const appInfo = getAppInfo(env.VITE_APP_ENV, projectName);

  return {
    base: './',
    plugins: [
      vue(),
      injectHtml({
        data: {
          projectName,
          title: appInfo.title,
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
      // {
      //   ...esbuild({
      //     target: 'chrome70',
      //     include: /\.(vue|ts|tsx)$/,
      //     loaders: {
      //       '.vue': 'js',
      //     },
      //   }),
      //   enforce: 'post',
      // },
      // legacy()
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
      // https://rollupjs.org/guide/en/#outputoptions-object
      rollupOptions: {
        input: {
          index: './index.html', // https://cn.vitejs.dev/guide/build.html#multi-page-app
        },
        output: {
          dir: `dist/${projectName}-${env.VITE_APP_ENV}`,
        },
      },
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
    },
  };
});
