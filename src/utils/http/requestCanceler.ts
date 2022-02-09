import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';

// 队列
const pendingMap = new Map<string, Canceler>();

function getPendingUrl(config: AxiosRequestConfig): string {
  return [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data),
  ].join('&');
}

// 添加请求到队列
export function addPending(config: AxiosRequestConfig) {
  removePending(config);
  const url = getPendingUrl(config);
  config.cancelToken = new axios.CancelToken((cancel) => {
    if (!pendingMap.has(url)) {
      pendingMap.set(url, cancel);
    }
  });
}

// 取消请求
export function removePending(config: AxiosRequestConfig) {
  const url = getPendingUrl(config);
  if (pendingMap.has(url)) {
    const cancel = pendingMap.get(url);
    cancel?.();
    pendingMap.delete(url);
  }
}

// 取消所有请求
export function removeAllPending() {
  pendingMap.forEach((cancel) => cancel?.());
}
