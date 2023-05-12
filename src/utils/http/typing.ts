import type { AxiosRequestConfig } from 'axios';

export interface RequestOptions {
  errorMessageMode?: 'none' | 'modal' | 'message' | undefined; // 消息提示类型
  ignoreCancelToken?: boolean; // 忽略重复请求
  withToken?: boolean; // 是否携带 token
}

// 扩展请求配置
export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

// 后台统一的字段
export interface ResultModel<T = any> {
  code: number;
  message: string;
  data: T;
}
