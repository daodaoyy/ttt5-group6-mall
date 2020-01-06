module.exports = appInfo => {
  const config = exports = {};

  config.logger = {
    dir: `/usr/local/node/logs/ttt5-group6-mall/manage/`,
    consoleLevel: 'DEBUG', // NONE
    level: 'DEBUG',
  };

  config.api = {
    url: 'http://127.0.0.1:7001'
  };

  return config;
};
