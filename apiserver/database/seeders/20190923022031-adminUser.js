'use strict';

module.exports = {
  up: async queryInterface => {
    const data = await queryInterface.sequelize.query('SELECT * FROM adminUser WHERE id=1;');
    if (data[0].length < 1) {
      return queryInterface.bulkInsert('adminUser', [{
        username: 'admin',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        status: 1, // 状态，
        role: 1, // 权限 0,普通管理，1，超级管理
        create_time: new Date(),
        update_time: new Date(),
      }], {});
    }
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('adminUser', null, {});
  },
};
