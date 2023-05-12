export function matchHttpStatusCode(status: number): string {
  let errMessage = '';

  switch (status) {
    case 401:
      errMessage = '没有该操作权限';
      break;
    case 403:
      errMessage = '服务器禁止访问';
      break;
    case 404:
      errMessage = '服务器没有此服务';
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      errMessage = '服务器错误';
      break;
    default:
      errMessage = `未知错误 ${status}`;
  }

  return errMessage;
}
