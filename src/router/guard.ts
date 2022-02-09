import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import * as requestCanceler from '@/utils/http/requestCanceler';
import { getAppInfo } from '@/utils/appEnv';
import { usePermission } from '@/store/modules/permission';

const { title: pageBaseTitle } = getAppInfo();

export function setupRouterGuard(router: Router) {
  changePageTitle(router);
  createHttpGrard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
}

// 动态修改页面标题
function changePageTitle(router: Router) {
  router.beforeEach((to) => {
    const { title } = to.meta;
    if (title && typeof title === 'string') {
      // 存在 #{default} 则替换为 baseTitle
      if (title.indexOf('#{default}') !== -1) {
        document.title = title.replace('#{default}', pageBaseTitle);
      } else {
        document.title = `${title} - ${pageBaseTitle}`;
      }
    } else {
      // 如果没有设置标题则显示 url
      document.title = '';
    }
    return true;
  });
}

// 切换路由将删除之前的请求
function createHttpGrard(router: Router) {
  router.beforeEach(() => {
    requestCanceler.removeAllPending();
    return true;
  });
}

// 进度条
function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    NProgress.start();
    return true;
  });

  router.afterEach((to) => {
    // 如果是登录页则一直加载
    if (to.path === '/login') {
      return true;
    }
    NProgress.done();
    return true;
  });
}

// 路由拦截
function createPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 忽略权限检查
    if (to.meta.ignoreAuth) {
      next();
      return;
    }

    // 需要检查权限
    const { isLoggedIn, roles } = usePermission();
    // 切换路由时，如果正在获取权限，则重定向到登录页
    if (!isLoggedIn) {
      next('/login');
      return;
    }
    const hasPermission = roles.some((item: string) =>
      ((to.meta.roles || []) as Array<string>).includes(item),
    );
    if (hasPermission) {
      next();
      return;
    } else {
      next('/401');
      return;
    }
  });
}
