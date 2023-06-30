export {};

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    roles?: string[];
    ignoreAuth?: boolean;
    cacheScrollPosition?: boolean; // 缓存滚动条位置
    enableKeepAlive?: boolean; // 启用路由缓存，同时需要在组件中设置 defineComponent({ name: 'xxx' })
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $px2rem: Window['$px2rem'];
  }
}
