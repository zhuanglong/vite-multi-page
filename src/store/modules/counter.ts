import { acceptHMRUpdate, defineStore } from 'pinia';

import { store } from '@/store';

interface CounterState {
  count: number;
}

export const useCounter = defineStore({
  id: 'counter',

  state: (): CounterState => ({
    count: 0,
  }),

  getters: {
    evenOrOdd(): string {
      return this.count % 2 === 0 ? 'even' : 'odd';
    },
  },

  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    incrementAsync() {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this.increment();
          resolve();
        }, 2000);
      });
    },
  },
});

// 可在组件外使用
export function useCounterWithOut() {
  return useCounter(store);
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot));
}
