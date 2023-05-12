// dev 本地开发
function getDevAppInfo(projectName: ProjectNames): AppItemInfo {
  const serverURL = 'https://dev.myserver.com'; // web 服务器地址
  const apiBaseURL = 'https://dev.myserver.com'; // 接口基础地址
  const apiPrefix = '/dev-api'; // 本地开发代理前缀

  const obj: AppsInfo = {
    projectA: {
      title: '项目A',
      version: 'V 1.2',
      pName: projectName,
      apiBaseURL,
      apiPrefix,
      serverURL,
    },
    projectB: {
      title: '项目B',
      version: 'V 0.2',
      pName: projectName,
      apiBaseURL,
      apiPrefix,
      serverURL,
    },
  };

  return obj[projectName];
}

// uat 服务器
function getStagingAppInfo(projectName: ProjectNames): AppItemInfo {
  const serverURL = 'https://dev.myserver.com';
  const apiBaseURL = 'https://dev.myserver.com';
  const apiPrefix = '';

  const obj: AppsInfo = {
    projectA: {
      title: '项目A',
      version: 'V 1.2',
      pName: projectName,
      apiBaseURL,
      apiPrefix,
      serverURL,
    },
    projectB: {
      title: '项目B',
      version: 'V 0.2',
      pName: projectName,
      apiBaseURL,
      apiPrefix,
      serverURL,
    },
  };

  return obj[projectName];
}

// prod 服务器
function getProdAppInfo(projectName: ProjectNames): AppItemInfo {
  const serverURL = 'https://prod.myserver.com';
  const apiBaseURL = 'https://prod.myserver.com';
  const apiPrefix = '';

  const obj: AppsInfo = {
    projectA: {
      title: '项目A',
      version: 'V 1.2',
      pName: projectName,
      apiBaseURL,
      apiPrefix,
      serverURL,
    },
    projectB: {
      title: '项目B',
      version: 'V 0.2',
      pName: projectName,
      apiBaseURL,
      apiPrefix,
      serverURL,
    },
  };

  return obj[projectName];
}

export function getAppInfo(
  appEnv: ImportMetaEnv['VITE_APP_ENV'],
  projectName: ProjectNames,
): AppItemInfo {
  if (appEnv === 'prod') {
    return getProdAppInfo(projectName);
  }
  if (appEnv === 'staging') {
    return getStagingAppInfo(projectName);
  }
  return getDevAppInfo(projectName); // 默认
}
