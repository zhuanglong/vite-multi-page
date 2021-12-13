# Vite + Vue 多页面配置

## 实现过程

### 安装依赖

```
yarn add -D cross-env vite-plugin-html rollup-plugin-delete
```

- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) 输出数据到 html 模板
- [rollup-plugin-delete](https://github.com/vladshcherbin/rollup-plugin-delete) build 之前删除文件和文件夹

### 创建多个项目

![](https://gitee.com/zloooong/image_store/raw/master/img/202112101543583.png)

### 修改 vite.config.js

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { injectHtml } from 'vite-plugin-html' // 插入数据到 index.html
import del from 'rollup-plugin-delete' // 删除文件和文件夹

// https://vitejs.dev/config/
export default defineConfig(({ command }) => { // https://cn.vitejs.dev/config/#conditional-config
  const projectName = process.env.PROJECT_NAME
  console.log(command);
  return {
    base: './',
    plugins: [
      vue(),
      injectHtml({
        data: { projectName },
      }),
      (command === 'build' && del({ targets: `dist/${projectName}` })),
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
          dir: `dist/${projectName}`,
        },
      },
    },
  }
})

```

### 修改 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- <link rel="icon" href="/favicon.ico" /> -->
    <link rel="icon" href="/src/pages/<%= projectName %>/assets/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App <%= projectName %></title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/pages/<%= projectName %>/main.js"></script>
  </body>
</html>

```

### 修改 package.json

```
"scripts": {
    "dev:projectA": "cross-env PROJECT_NAME=projectA vite",
    "dev:projectB": "cross-env PROJECT_NAME=projectB vite",
    "build:projectA": "cross-env PROJECT_NAME=projectA vite build",
    "build:projectB": "cross-env PROJECT_NAME=projectB vite build",
    "serve": "vite preview"
  },
```

### 运行

```
// 开发
yarn dev:projectA
yarn dev:projectB
// 生产
yarn build:projectA
yarn build:projectB
```

**打包的文件**

![](https://gitee.com/zloooong/image_store/raw/master/img/202112101543952.png)

**浏览**

#### ![](https://gitee.com/zloooong/image_store/raw/master/img/202112101544480.png)

## 总结

利用 `cross-env` 输出环境变量到 `vite.config`，根据 `PROJECT_NAME` 得到 main.js，就能打包对应的项目。

