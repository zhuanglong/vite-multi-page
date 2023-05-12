// 全局样式
import './design/normalize.css';
import './design/global.scss';

import './design/flexible/flexible.js';

import type { RouteRecordRaw } from 'vue-router';
import { createApp } from 'vue';

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
