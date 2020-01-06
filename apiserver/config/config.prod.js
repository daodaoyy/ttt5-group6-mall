/* eslint valid-jsdoc: "off" */

'use strict';
const fecha = require('fecha');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568270467421_8184';

  // jwt config
  config.jwt = {
    secret: 'jwtSecret',
    enable: false,
  };

  // sequelize config
  config.sequelize = {
    dialect: 'mysql',
    host: '10.104.131.158',
    port: 3306,
    database: '06_shop_prod',
    username: 'root',
    password: '123456',
    timezone: '+08:00',
    define: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
      freezeTableName: true,
      underscored: false,
      getterMethods: {
        createTime() {
          const createTime = this.getDataValue('createTime');
          if (createTime) {
            return fecha.format(createTime, 'YYYY-MM-DD HH:mm:ss');
          }
        },
        updateTime() {
          const updateTime = this.getDataValue('updateTime');
          if (updateTime) {
            return fecha.format(updateTime, 'YYYY-MM-DD HH:mm:ss');
          }
        },
      },
    },
  };

  // egg logger
  config.logger = {
    dir: '/usr/local/node/logs/ttt5-group6-mall/apiserver/',
    consoleLevel: 'DEBUG',
    level: 'DEBUG',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
