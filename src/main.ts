// 全局样式
import './design/normalize.css';
import './design/global.scss';

// 移动端适应，手动转换 rem
import './design/flexible/flexible.js';

import { createApp } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { router, setupRouter } from './router';
import { setupRouterGuard } from './router/guard';
import { setupStore } from './store';

export function start(App: any, mainRoutes: RouteRecordRaw) {
  const app = createApp(App);

  // 挂载全局变量
  app.config.globalProperties.$px2rem = window.$px2rem;

  setupStore(app);

  setupRouter(app, mainRoutes);

  setupRouterGuard(router);

  app.mount('#app');
}
