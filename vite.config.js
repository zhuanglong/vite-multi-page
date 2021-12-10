import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { injectHtml } from 'vite-plugin-html' // 插入数据到 index.html
import del from 'rollup-plugin-delete' // 删除文件和文件夹

// https://vitejs.dev/config/
export default defineConfig(({ command }) => { // https://cn.vitejs.dev/config/#conditional-config
  const moduleName = process.env.MODULE_NAME
  console.log(command);
  return {
    base: './',
    plugins: [
      vue(),
      injectHtml({
        data: { moduleName },
      }),
      (command === 'build' && del({ targets: `dist/${moduleName}` })),
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
          dir: `dist/${moduleName}`,
        },
      },
    },
  }
})
