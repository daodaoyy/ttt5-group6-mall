'use strict';

module.exports = {
  up: async queryInterface => {
    const data = await queryInterface.sequelize.query('SELECT * FROM user WHERE id=1;');
    if (data[0].length < 1) {
      return queryInterface.bulkInsert('user', [{
        phone: '17679376618',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        nickname: '佚名',
        birthday: '2019-01-01',
        avatar: 'https://qnimg.vadxq.com/blog/2016/blogheadimg20160517.jpg', // 头像，默认为一个链接
        sign: '无', // 签名
        sex: 0, // 0女1男2保密
        status: 1, // 状态，
        // 0：删除/禁用，1，正常
        total_score: 0, // 总积分, 默认0
        score: 0, // 可用积分，默认0
        default_address: 0, // 默认地址id
        create_time: new Date(),
        update_time: new Date(),
      }], {});
    }
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('user', null, {});
  },
};
