export {};

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    roles?: string[];
    ignoreAuth?: boolean;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $px2rem: Window['$px2rem'];
  }
}
