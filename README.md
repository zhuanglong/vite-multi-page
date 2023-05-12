# Vite4 + Vue3 多页面开发

可通过命令行选择打包多项目。

## 实现的功能

- Vite4 + Vue3 + Pinia + TypeScript
- 代码规范，ESLint + Prettier + StyleLint
- 多页面开发，可独立打包项目

## 如何使用

```
# 安装依赖
$ yarn install

# 运行
$ yarn dev

# 打包
$ yarn build:staging or yarn build:prod

# 手动输入一个或多个模块名打包

yarn build:staging --projectName 'projectA,projectB'
```

![](https://gitee.com/zloooong/image_store/raw/master/img/202202091116428.png)

![](https://gitee.com/zloooong/image_store/raw/master/img/202202091118900.png)

## 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

**example：**`feat: (property 3.0) view components`
