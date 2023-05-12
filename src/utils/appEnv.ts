console.log(import.meta.env);
console.log(__APP_INFO__);

// 获取 .env.xx 文件的配置
export function getAppInfo() {
  return __APP_INFO__;
}

// const env = import.meta.env as unknown as ViteEnv;

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
