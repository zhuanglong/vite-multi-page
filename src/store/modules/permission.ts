import { defineStore } from 'pinia';

import { store } from '@/store';
// import * as api from '@/api';
import { sleep } from '@/utils';

type Roles = Array<string>;

interface PermissionState {
  startPath: string; // 打开应用时的 path
  isLoggedIn: boolean;
  roles: Roles;
}

export const usePermission = defineStore({
  id: 'permission',

  state: (): PermissionState => ({
    startPath: '',
    isLoggedIn: false,
    roles: [],
  }),

  actions: {
    setStartPath(path: string) {
      this.startPath = path;
    },
    setLoading(payload: boolean) {
      this.isLoggedIn = payload;
    },
    setRoles(payload: Roles) {
      this.roles = payload;
    },
    async fetchRoles() {
      // 这里模拟权限接口返回的 routes
      await sleep(1000);
      this.setLoading(true);
      this.setRoles(['view']);
      // await api.login({ username: 'admin', password: '123456' });
      return;
    },
  },
});

// 可在组件外使用
export function usePermissionWithOut() {
  return usePermission(store);
}
