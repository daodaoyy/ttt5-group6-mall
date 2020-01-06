'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  // egg jwt
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  // egg cors
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
