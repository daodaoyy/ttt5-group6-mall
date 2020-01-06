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

  // add your middleware config here
  config.middleware = [];

  // jwt config
  config.jwt = {
    secret: 'jwtSecret',
    enable: false,
  };

  // sequelize config
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'shop_dev',
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

  // security close
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // security close
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // qiniu
    qiniu: {
      ak: 'k_uOcu_RCEDy9LpZviVj8ARDgvOBVP6kzgDEGtGC',
      sk: 'pNn9yaF9761rN212iY1GYK3PKN8u5LyZ1qtwYXdB',
    },

    // very code
    veryCode: {
      url: 'https://sms_developer.zhenzikj.com/sms/send.do',
      id: '102293',
      ak: 'ca6f9ff6-a47c-4dc8-ac4b-39a7f080568f',
    },
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
