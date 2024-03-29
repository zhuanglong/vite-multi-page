import type { RouteRecordRaw } from 'vue-router';

import BasicLayout from '@/layouts/BasicLayout.vue';

export const routes: RouteRecordRaw = {
  path: '/',
  component: BasicLayout,
  redirect: '/home',
  children: [
    {
      path: '/home',
      component: () => import('@/projects/projectB/views/Home/Home.vue'),
      meta: {
        title: 'Home',
        roles: ['view'],
      },
    },
    {
      path: '/about',
      component: () => import('@/projects/projectB/views/About/About.vue'),
      meta: {
        title: 'About',
      },
    },
  ],
};
