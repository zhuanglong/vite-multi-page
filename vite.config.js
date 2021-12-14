import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { injectHtml } from 'vite-plugin-html' // 插入数据到 index.html
import del from 'rollup-plugin-delete' // 删除文件和文件夹

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => { // https://cn.vitejs.dev/config/#conditional-config
  const projectName = process.env.PROJECT_NAME
  const env = loadEnv(mode, './'); // 加载 .env 环境变量

  return {
    base: './',
    plugins: [
      vue(),
      injectHtml({
        data: { projectName },
      }),
      // build 之前删除对应文件夹
      (command === 'build' && del({ targets: `dist/${projectName}-${env.VITE_APP_ENV}` })),
    ],
    build: {
      emptyOutDir: false,
      // https://cn.vitejs.dev/config/#conditional-config
      // https://rollupjs.org/guide/en/#outputoptions-object
      rollupOptions: {
        input: {
          index: 'index.html', // 可以分为多个 .html
        },
        output: {
          dir: `dist/${projectName}-${env.VITE_APP_ENV}`,
        },
      },
    },
  }
})
