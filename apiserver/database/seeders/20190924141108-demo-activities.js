'use strict';

module.exports = {
  up: async queryInterface => {
    const data = await queryInterface.sequelize.query('SELECT * FROM activities WHERE id=1;');
    if (data[0].length < 1) {
      return queryInterface.bulkInsert('activities', [{
        time: '2019-10-01T12:12:12 2019-10-24T12:12:12', // 活动时间，'2019-08-01T12:12:12 2019-08-04T12:12:12'
        title: '活动的测试标题', // 活动标题，
        cover: 'https://qnimg.vadxq.com/luckyshop/1571110319706.ff9e86981d21bfbe.gif', // 封面图，
        desc: '这个是测试活动的描述', // 活动的描述，
        products: '1',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571110319706.ff9e86981d21bfbe.gif', // 详情图，
        status: 1, // 0：删除   默认1
        isShelf: 0, // 上下架
        create_time: new Date(),
        update_time: new Date(),
      }], {});
    }
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('activities', null, {});
  },
};
