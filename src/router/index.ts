import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import Login from '@/views/Login/Login.vue';

// /* chunkFileNames: "testHome" */ 或 /* webpackChunkName: "testAbout" */ 都不生效
// 例如 About/index.vue 打包后是 index.xxxx.js，理想效果应该是 About.xxxx.js，所以只能改文件名 index.js => About.js
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: Login,
    meta: {
      title: '#{default}',
      ignoreAuth: true,
    },
  },
  {
    path: '/401',
    component: () => import('@/views/NotPermission/NotPermission.vue'),
    meta: {
      title: '401',
      ignoreAuth: true,
    },
  },
  {
    path: '/:path(.*)*',
    component: () => import('@/views/NotFound/NotFound.vue'),
    meta: {
      title: '404',
      ignoreAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>, mainRoutes: RouteRecordRaw) {
  router.addRoute(mainRoutes);
  app.use(router);
}

export default router;
