import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

import type { CreateAxiosOptions, RequestOptions, ResultModel } from './types';
import * as requestCanceler from './requestCanceler';
import { matchHttpStatusCode } from './handleStatus';

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export default class Http {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  // 设置拦截器
  private setupInterceptors() {
    // request 拦截器
    this.axiosInstance.interceptors.request.use((config: CreateAxiosOptions) => {
      //// showLoading
      const { ignoreCancelToken, withToken } = config.requestOptions || {};
      !ignoreCancelToken && requestCanceler.addPending(config);

      // 携带 token
      if (withToken) {
        const token = 'xxx';
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return config;
    });

    // response 拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        //// hideLoading
        response && requestCanceler.removePending(response.config);
        return Promise.resolve(response);
      },
      (error: AxiosError) => {
        //// hideLoading
        const config: CreateAxiosOptions = error.config;
        const errorMessageMode = config?.requestOptions?.errorMessageMode;
        let errMessage = '';

        if (axios.isCancel(error)) {
          errMessage = '请求取消';
        } else if (error?.code === 'ECONNABORTED' && error?.message.indexOf('timeout') !== -1) {
          errMessage = '请求超时';
        } else if (error?.response) {
          // 请求已发出，但是不在 2xx 的范围
          errMessage = matchHttpStatusCode(error?.response.status);
        } else {
          errMessage = '网络异常，请检查您的网络连接是否正常';
        }

        if (errMessage) {
          if (errorMessageMode === 'modal') {
            console.warn('mode tips', errMessage);
          } else if (errorMessageMode === 'message') {
            console.warn('message tips', errMessage);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  // 基础请求
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    // 设置 opt 到 config 对象中，这样可以在拦截器中拿到
    const conf: CreateAxiosOptions = {
      ...config,
      requestOptions: { ...this.options?.requestOptions, ...options }, // 覆盖实例中的设置
    };

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<ResultModel>>(conf)
        .then((response: AxiosResponse<ResultModel>) => {
          const res = response.data;
          resolve(res as unknown as Promise<T>);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }
}
