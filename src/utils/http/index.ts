import { getAppInfo, isDevMode } from '@/utils/appEnv';

import Http, { ContentTypeEnum } from './Http';

const { apiBaseURL: baseURL } = getAppInfo();

export const defHttp = new Http({
  baseURL: isDevMode() ? '' : baseURL,
  timeout: 30 * 1000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  requestOptions: {
    errorMessageMode: 'message', // 消息提示类型
    ignoreCancelToken: false, // 忽略重复请求
    withToken: false, // 是否携带 token
  },
});

// other
export const testHttp = new Http({
  baseURL: '',
  requestOptions: {
    errorMessageMode: 'message', // 消息提示类型
    ignoreCancelToken: true, // 保留重复请求
    withToken: false, // 是否携带 token
  },
});
