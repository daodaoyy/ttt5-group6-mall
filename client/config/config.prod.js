module.exports = () => {
  const config = exports = {};

  config.logger = {
    dir: '/usr/local/node/logs/ttt5-group6-mall/client/',
    consoleLevel: 'DEBUG', // NONE
    level: 'DEBUG',
  };

  config.proxy = {
    host: 'http://127.0.0.1:7001',
    match: /\/api/,
  };

  return config;
};
