// ============= 用于打包多页面的类型 start =============

// 自定义的 Node 全局环境变量
type NodeEnv = Pick<InquirerAnswers, 'projectName' | 'report'>;

type RunType = 'build' | 'serve';

// 项目目录名，有修改需要在这里同步
type ProjectNames = 'projectA' | 'projectB';

type ProjectList = ProjectNames[];

interface InquirerAnswers {
  mode: 'development' | 'production' | 'staging' | string; // .env.xx 文件名
  projectName: ProjectNames;
  report: string;
}

// 单个项目的配置信息
interface AppItemInfo {
  title: string; // 项目主标题
  version: string; // 版本号
  pName: ProjectNames; // 项目名
  apiBaseURL: string; // 接口基础地址
  apiPrefix: string; // 本地开发代理前缀
  serverURL: string; // web 服务器地址
}

// 全部项目的配置信息
type AppsInfo = {
  [name in ProjectNames]: AppItemInfo;
};

declare const __APP_INFO__: AppItemInfo;

// ============= 用于打包多页面的类型 end =============

// .env.xx 全局环境变量
interface ViteEnv {
  VITE_APP_ENV: 'dev' | 'prod' | 'staging';
  VITE_PAGE_BASE_TITLE: string;
}

// 扩充 ImportMetaEnv 类型
// https://cn.vitejs.dev/guide/env-and-mode.html#intellisense
interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

// 扩充 Window 类型
interface Window {
  $px2rem(value: number): string;
}

declare const $px2rem: Window['$px2rem'];
