import { getAppInfo } from '@/utils/appEnv';
import { defHttp, testHttp } from '@/utils/http';

const { apiPrefix } = getAppInfo();

interface Login {
  username: string;
  password: string;
}

// 获取 ip 信息
export function getCity() {
  return testHttp.get({
    url: 'https://pv.sohu.com/cityjson',
  });
}

// 登录
export function login(params: Login) {
  return defHttp.get({
    url: `${apiPrefix}/login`,
    data: params,
  });
}
