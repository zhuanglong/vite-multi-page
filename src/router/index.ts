import type { App } from 'vue';
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import Login from '@/views/Login/Login.vue';

import { usePermission } from '@/store/modules/permission';

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
  strict: true,
  scrollBehavior: (to, from, savedPosition) => {
    // 根据路由配置表中的 "cacheScrollPosition" 保存滚动条位置
    // 注意: 这个功能只在支持 history.pushState 的浏览器中可用
    if (to.meta.cacheScrollPosition && savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export function setupRouter(app: App<Element>, mainRoutes: RouteRecordRaw) {
  router.addRoute(mainRoutes);
  app.use(router);
}

/**
 * 是否有权限
 */
export function hasPermission(configRoles: RouteMeta['roles']) {
  const { roles } = usePermission();
  return roles.some((item) => (configRoles || []).includes(item));
}

export default router;
