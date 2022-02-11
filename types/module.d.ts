export {};

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    roles?: string[];
    ignoreAuth?: boolean;
  }
}
