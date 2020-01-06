'use strict';

module.exports = {
  up: async queryInterface => {
    const data = await queryInterface.sequelize.query('SELECT * FROM products WHERE id=1;');
    if (data[0].length < 1) {
      return queryInterface.bulkInsert('products', [{
        title: 'HUAWEI HUAWEI Mate 30 Pro',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571103241406.mate30.png|https://qnimg.vadxq.com/luckyshop/1571103335668.mate30procover.jpg',
        desc: '【新品上市】Huawei/华为Mate 30 Pro超级快充徕卡电影四摄麒麟990 4G智能手机mate30pro',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571103335668.mate30procover.jpg|https://qnimg.vadxq.com/luckyshop/1571103569326.mmate30prodetail1.jpg|https://qnimg.vadxq.com/luckyshop/1571103615702.mmate30prodetail2.jpg|https://qnimg.vadxq.com/luckyshop/1571103644100.O1CN01baWj7J1Vub5W8ODzx_!!2838892713.jpg',
        price: 5799, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 90, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Huawei/华为 Mate 20 Pro',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571103953223.mate20pro1.jpg|https://qnimg.vadxq.com/luckyshop/1571104036885.O1CN01JdMbWM1Vub5kdeQOl_!!0-item_pic.jpg_430x430.jpg',
        desc: 'Huawei/华为 Mate 20 Pro 曲面屏后置徕卡三摄980芯片智能手机mate20pro',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571104525985.O1CN01KTE7nN1Vub2JRGh7G_!!2838892713.jpg|https://qnimg.vadxq.com/luckyshop/1571104557293.O1CN01NbnKYa1Vub2H65taM_!!2838892713.jpg|https://qnimg.vadxq.com/luckyshop/1571104604845.O1CN01NbnKYa1Vub2H65taM_!!2838892713.jpg',
        price: 5099, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: true, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '海外直邮 茧缘真丝四件套100%桑蚕丝床品丝绸套件真丝被套婚庆',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571106926938.O1CN01aoc7dF1ICXuhk1aoW_!!0-item_pic.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571106996116.TB2eQRnkfDH8KJjy1XcXXcpdXXa_!!673340857.jpg_430x430q90.jpg',
        desc: '海外直邮 茧缘真丝四件套100%桑蚕丝床品丝绸套件真丝被套婚庆',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571107706455.TB2WZorfXXXXXb9XpXXXXXXXXXX-673340857.jpg|https://qnimg.vadxq.com/luckyshop/1571107785887.TB2BrgtfXXXXXbAXpXXXXXXXXXX-673340857.jpg',
        price: 3780, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 7, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: true, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '三只松鼠 坚果大礼包1523g每日坚果大礼包送礼礼盒零食组合8袋装',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571108679470.O1CN01SKWg2t28vIiKtSYcD_!!0-item_pic.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571108749306.O1CN01YGgZaz28vIf30Vct2_!!725677994.jpg_430x430q90.jpg',
        desc: '三只松鼠 坚果大礼包1523g每日坚果大礼包送礼礼盒零食组合8袋装',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571108791281.O1CN01wfByoG1OvKOLgJb0P_!!2200628041767-0-scmitem6000.jpg|https://qnimg.vadxq.com/luckyshop/1571108808539.O1CN0174UduZ1OvKOSTM0kk_!!2200628041767-0-scmitem6000.jpg|https://qnimg.vadxq.com/luckyshop/1571108815596.O1CN01Li5fCR1OvKORTxU2z_!!2200628041767-0-scmitem6000.jpg',
        price: 108, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 8, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '丝竹36包本色抽纸批发整箱餐巾纸纸巾实惠家庭装卫生纸家用面巾纸',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571108948496.O1CN01qvuWNq23bXXqCThXy_!!0-item_pic.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571108958133.O1CN010rGRoG23bXWgY8P4q_!!2594867274.jpg_430x430q90.jpg',
        desc: '丝竹36包本色抽纸批发整箱餐巾纸纸巾实惠家庭装卫生纸家用面巾纸',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571109577815.O1CN01GbfmgA23bXWlxeAwQ_!!2594867274.jpg|https://qnimg.vadxq.com/luckyshop/1571109594336.O1CN01vXjB3r23bXWkCU8mG_!!2594867274.jpg',
        price: 39, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 9, // 分类,默认1
        stock: 10000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '金龙鱼 非转基因黄金比例食用植物调和油5L 食用油',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571109787156.O1CN01b4A1Ar28vIiQXOT07_!!0-item_pic.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571109803487.O1CN014NHX8n28vIg8KgLp8_!!725677994.jpg_430x430q90.jpg',
        desc: '金龙鱼 非转基因黄金比例食用植物调和油5L 食用油',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571109815670.O1CN01bmdQGZ1doeqTXr69w_!!2200631893783-0-scmitem6000.gif|https://qnimg.vadxq.com/luckyshop/1571109854124.O1CN01t1otD01doeqTTdbZN_!!2200631893783-0-scmitem6000.gif|https://qnimg.vadxq.com/luckyshop/1571109885173.O1CN012YFbJi1doeqUY8TgJ_!!2200631893783-0-scmitem6000.gif',
        price: 69, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 10, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '康师傅方便面红烧牛肉面整箱装混搭24袋鲜虾香菇袋装香辣整箱泡面',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571110014271.O1CN01tERMRK1L2sP6gGnBx_!!3718961242.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571110023891.O1CN01unIRYS1L2sP1cuIcG_!!3718961242.png_430x430q90.png',
        desc: '康师傅方便面红烧牛肉面整箱装混搭24袋鲜虾香菇袋装香辣整箱泡面',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571110069706.O1CN01b7Fuwc1L2sP60UTUi_!!3718961242.jpg|https://qnimg.vadxq.com/luckyshop/1571110088477.O1CN01FL5Q0D1L2sP8SfQ09_!!3718961242.jpg|https://qnimg.vadxq.com/luckyshop/1571110098705.O1CN01gzxfm81L2sP8SgUT7_!!3718961242.jpg',
        price: 69, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 5, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '所望SOMANG头皮护理植物洗发水 700ml （温和舒缓滋养头皮洗发露 韩国进口）',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571103599107.rBEhV1MyciAIAAAAAADGqHbMs8kAAK2qgFWo2gAAMbA090.jpg!q70.jpg',
        desc: '所望SOMANG头皮护理植物洗发水 700ml （温和舒缓滋养头皮洗发露 韩国进口）',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571103630263.5ce9880e09eee011.jpg|https://qnimg.vadxq.com/luckyshop/1571103652742.8f6939826ccbb764.jpg',
        price: 89, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 1, // 分类,默认1
        stock: 100, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '李施德林 (Listerine) 漱口水',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571104191516.39d1b704cea6b874.jpg!q70.dpg.jpg|https://qnimg.vadxq.com/luckyshop/1571104214392.c93b0a48bbab04d6.jpg!q70.dpg.jpg',
        desc: '李施德林 (Listerine) 漱口水 冰蓝劲爽口味3+2套装  (500mL*3瓶+100mL*2瓶) (新老随机发货)',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571104275631.a9f940514684e51d.jpg|https://qnimg.vadxq.com/luckyshop/1571104333546.fa7c4e2206cddae3.jpg|https://qnimg.vadxq.com/luckyshop/1571104360776.388eb9f4a9de473e.jpg',
        price: 92.9, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 1, // 分类,默认1
        stock: 100, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '花王（KAO）美舒律蒸汽眼罩',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571104663996.5bf26fd5Ncdf0641b.jpg!q80.dpg.jpg|https://qnimg.vadxq.com/luckyshop/1571104679387.5bf26f93N10f5bfb2.jpg!q70.dpg.jpg',
        desc: '花王（KAO）美舒律蒸汽眼罩/热敷贴12片装 (无香型) 推荐长时间用眼使用 护眼 眼部按摩（日本进口）',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571104696674.5022bf5a49e4eabc.jpg|https://qnimg.vadxq.com/luckyshop/1571104720226.9f17954c323a91c0.jpg|https://qnimg.vadxq.com/luckyshop/1571104741402.f016f7c9a472089f.jpg',
        price: 70.9, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 1, // 分类,默认1
        stock: 100, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '丹碧丝(Tampax)导管式',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571105654741.5cdd1831Na234b5e3.jpg!q80.dpg.jpg|https://qnimg.vadxq.com/luckyshop/1571105768779.5cdd181aNff3976ab.jpg!q70.dpg.jpg',
        desc: '丹碧丝(Tampax)导管式 幻彩系列大流量卫生棉条游泳 7支装 (美国进口 非卫生巾)',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571105779471.2a47925ed01d8fa1.jpg!q70.dpg.jpg|https://qnimg.vadxq.com/luckyshop/1571105800303.840977178a58aec8.jpg!q70.dpg.jpg|https://qnimg.vadxq.com/luckyshop/1571105807638.ee12f9c80292830e.jpg!q70.dpg.jpg',
        price: 18.9, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 1, // 分类,默认1
        stock: 100, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '护舒宝 卫生巾',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571106068606.5aec0056N6cb25454.jpg!q80.dpg.jpg|https://qnimg.vadxq.com/luckyshop/1571106104852.5aec0056N74932b23.jpg!q70.dpg.jpg',
        desc: '护舒宝 卫生巾组合尝鲜袋（未来感液体卫生2片+超净棉6p）',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571106121058.5aec012cN865a8ebf.jpg!q70.dpg.jpg|https://qnimg.vadxq.com/luckyshop/1571106155027.5aec012cN63b930af.jpg!q70.dpg.jpg|https://qnimg.vadxq.com/luckyshop/1571106166490.5aec012cN2f449cc6.jpg!q70.dpg.jpg',
        price: 18.9, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 1, // 分类,默认1
        stock: 100, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '不锈钢取碗夹',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571106605415.1.jpg|https://qnimg.vadxq.com/luckyshop/1571106619026.2.jpg',
        desc: '创意家居日用百货生活实用小用品厨房小物件家用小东西杂货 不锈钢取碗夹',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571106635011.3.jpg|https://qnimg.vadxq.com/luckyshop/1571106651199.4.jpg',
        price: 8.0, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 2, // 分类,默认1
        stock: 100, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '生活日用品实用小工具',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571106958153.1.jpg',
        desc: '舒博伦（SHUBOLUN） 家居用品厨房用品用具小百货神器懒人居家生活日用品实用小工具r 白色',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571107027637.3.jpg|https://qnimg.vadxq.com/luckyshop/1571107046729.4.jpg|https://qnimg.vadxq.com/luckyshop/1571107055566.5.jpg',
        price: 25.0, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 2, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '家居厨房用品用具',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571107563576.1.jpg|https://qnimg.vadxq.com/luckyshop/1571107581897.2.jpg',
        desc: '【京东优】韩国创意居家家居厨房用品用具日用小百货生活小用品家用小东西 蓝色',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571107591565.3.jpg|https://qnimg.vadxq.com/luckyshop/1571107614786.5.jpg|https://qnimg.vadxq.com/luckyshop/1571107625390.4.jpg',
        price: 115.0, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 2, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '日常生活用品家庭收纳神器',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571108002279.1.jpg|https://qnimg.vadxq.com/luckyshop/1571108019235.2.jpg',
        desc: '新家必备创意家居日常生活用品家庭收纳神器懒人居家日用品百货实用小东西 【四个装】',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571108027747.3.jpg|https://qnimg.vadxq.com/luckyshop/1571108042114.4.jpg|https://qnimg.vadxq.com/luckyshop/1571108051471.5.jpg',
        price: 76.5, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 2, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '生鲜肉卧式冷柜',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571109443729.1a316b638c86206f.jpg!q80.dpg.jpg',
        desc: ' 【厂家直营】澳柯玛（AUCMA） 商用冷藏保鲜展示柜 生鲜肉卧式冷柜 凉菜卤菜熟食冰柜 点菜平岛柜 【2.5米全篮筐双系统】敞口冷藏ICC-25PDW',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571108915749.3.jpg|https://qnimg.vadxq.com/luckyshop/1571108942545.4.jpg|https://qnimg.vadxq.com/luckyshop/1571108955859.5.jpg',
        price: 6399, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 3, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '金鲳鱼鲳鱼海鲜海鱼1斤',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571109658007.1.jpg|https://qnimg.vadxq.com/luckyshop/1571109677451.2.jpg',
        desc: '生鲜海鲜水产鲜活金鲳鱼鲳鱼海鲜海鱼1斤(多规格可选) 【8斤送2斤】共10斤冷藏装',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571109687665.3.jpg|https://qnimg.vadxq.com/luckyshop/1571109704828.4.jpg|https://qnimg.vadxq.com/luckyshop/1571109713304.5.jpg',
        price: 366, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 3, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '屈臣氏苏打水',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571110118630.1.jpg|https://qnimg.vadxq.com/luckyshop/1571110162931.2.jpg',
        desc: '屈臣氏苏打水330mlx6罐鸡尾酒调料 苏打原味汽水饮料酒水 330ml*6',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571110118630.1.jpg|https://qnimg.vadxq.com/luckyshop/1571110162931.2.jpg|https://qnimg.vadxq.com/luckyshop/1571110215570.3.jpg',
        price: 366, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 4, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '荔枝酒',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571110363657.1.jpg',
        desc: '|荔枝酒|12度荔枝酒自酿果酒水果酒果味酒少女甜酒生日礼物网红酒京东plus会员尊享 x2',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571110376454.2.jpg|https://qnimg.vadxq.com/luckyshop/1571110388760.3.jpg',
        price: 159, // 单价,默认0
        score: 0, // 评分, 待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 4, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额, 默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Lenovo/联想 Z6青春版官网北斗双频定位骁龙710',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571105610558.O1CN01eA47XI1SwTqEqqLEZ_!!1019732311.png_400x400.png|https://qnimg.vadxq.com/luckyshop/1571105062856.O1CN0110i0Du1SwTqKP27yM_!!1019732311.png_400x400.png',
        desc: 'Lenovo/联想 Z6青春版官网北斗双频定位骁龙710 分辨率: 2340*1080 双卡双待 4G全网通',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571105824731.O1CN017sLBut1SwTqHjASD8_!!1019732311.jpg|https://qnimg.vadxq.com/luckyshop/1571105892136.O1CN01VRbTs31SwTqHmR0Q5_!!1019732311.jpg|https://qnimg.vadxq.com/luckyshop/1571106033254.O1CN017rFAc51SwTqJWqiYk_!!1019732311.jpg',
        price: 1599, // 单价,默认0
        score: 0, // 分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Samsung/三星 GALAXY S8+plus',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571106583516.O1CN01P25BOK2BbYSlFnr5b_!!929708357.jpg_400x400.jpg|https://qnimg.vadxq.com/luckyshop/1571106640271.O1CN01PM6G0p2BbYSaw4XeN_!!929708357.jpg_400x400.jpg',
        desc: 'Samsung/三星 GALAXY S8+plus 港版国行s8全网通4G曲面屏智能手机',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571106961247.O1CN01Iu1GO12BbYTgUmP4L_!!929708357.jpg|https://qnimg.vadxq.com/luckyshop/1571106997645.O1CN01ta7hDt2BbYSawB3NJ_!!929708357.jpg|https://qnimg.vadxq.com/luckyshop/1571107043043.O1CN0104fw722BbYTx8kqSt_!!929708357.jpg',
        price: 2130, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Samsung/三星 GALAXY S8+plus',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571106583516.O1CN01P25BOK2BbYSlFnr5b_!!929708357.jpg_400x400.jpg|https://qnimg.vadxq.com/luckyshop/1571106640271.O1CN01PM6G0p2BbYSaw4XeN_!!929708357.jpg_400x400.jpg',
        desc: 'Samsung/三星 GALAXY S8+plus 港版国行s8全网通4G曲面屏智能手机',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571106961247.O1CN01Iu1GO12BbYTgUmP4L_!!929708357.jpg|https://qnimg.vadxq.com/luckyshop/1571106997645.O1CN01ta7hDt2BbYSawB3NJ_!!929708357.jpg|https://qnimg.vadxq.com/luckyshop/1571107043043.O1CN0104fw722BbYTx8kqSt_!!929708357.jpg',
        price: 2130, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Apple/苹果 iPhone 11 移动联通电信全网通4G智能手机苏宁易购官方旗舰店 官方正品',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571108093095.O1CN01iMsTSC1IOugGbIQKH_!!2616970884.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571108197833.O1CN01kR2QPH1IOugBDt6C6_!!0-item_pic.jpg_430x430q90.jpg',
        desc: 'Apple/苹果 iPhone 11 移动联通电信全网通4G智能手机苏宁易购官方旗舰店 官方正品',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571108436672.O1CN01wbOOvb1IOugEHFAZ8_!!2616970884.jpg_60x60q90.jpg|https://qnimg.vadxq.com/luckyshop/1571106997645.O1CN01ta7hDt2BbYSawB3NJ_!!929708357.jpg|https://qnimg.vadxq.com/luckyshop/1571108303316.O1CN01V1xlL71IOugOAH051_!!2616970884.jpg',
        price: 5999, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Apple/苹果 iPhone 11 Pro',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571108762143.O1CN018q9fgv22AEJ8QuU25_!!2-item_pic.png_430x430q90.png|https://qnimg.vadxq.com/luckyshop/1571108832559.O1CN018eGWFp22AEJ9AXnRx_!!2-item_pic.png_430x430q90.png',
        desc: 'Apple/苹果 iPhone 11 Pro 深空灰色银色暗夜绿色金色 64GB 256GB 512GB',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571108949604.O1CN01NAW8qM22AEJ8Tvi9n_!!1917047079.jpg|https://qnimg.vadxq.com/luckyshop/1571109066341.O1CN01s4QQgX22AEIfWsN6B_!!1917047079.jpg|https://qnimg.vadxq.com/luckyshop/1571108894062.TB1.CUdsY9YBuNjy0FgXXcxcXXa-1572-394.png',
        price: 8699, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Apple/苹果 iPhone XR',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571109491800.O1CN015EQROI1IOugepKywV_!!0-item_pic.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571109523795.O1CN017xXddd1IOueUgUbvc_!!0-item_pic.jpg_430x430q90.jpg',
        desc: 'Apple/苹果 iPhone XR 全网通4G手机双卡双待 苹果iPhoneXR 苹果xr',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571109592193.O1CN01TpIbKb1IOudkjNSvq_!!2616970884.jpg|https://qnimg.vadxq.com/luckyshop/1571109647115.O1CN01B1USQU1IOufvlMVUA_!!2616970884.jpg|https://qnimg.vadxq.com/luckyshop/1571109694525.O1CN011IOuaaW4NSlfxXz_!!2616970884.jpg',
        price: 5288, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Apple/苹果 10.5 英寸 iPad Air',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571110047018.O1CN01qNZUmy22AEFzBvXlR_!!2-item_pic.png_430x430q90.png|https://qnimg.vadxq.com/luckyshop/1571110064046.O1CN01YIcBy122AEFvjPmgx_!!1917047079.png_430x430q90.png',
        desc: 'Apple/苹果 10.5 英寸 iPad Air 无线局域网型',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571110082168.O1CN01GBI6kv22AEG0RZPxb_!!1917047079.jpg|https://qnimg.vadxq.com/luckyshop/1571110097831.O1CN018aUmY822AEIXqXb7S_!!1917047079.jpg|https://qnimg.vadxq.com/luckyshop/1571110120971.O1CN01s4QQgX22AEIfWsN6B_!!1917047079.jpg',
        price: 4675, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: '华为荣耀平板',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571110417917.O1CN011xiVmlObKW30oJd_!!3015936477.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571110432679.O1CN011xiVmnmjorfes9S_!!3015936477.jpg_430x430q90.jpg',
        desc: '华为荣耀平板5大屏高清10英寸12平板电脑pad二合一掌上游戏电脑八核全网通4G通话安卓手机智能超薄ipad学生m6',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571110452462.O1CN01VbmLsI1xiVsiaKwu3_!!3015936477.jpg|https://qnimg.vadxq.com/luckyshop/1571110468575.O1CN01IU1QyT1xiVsbdUYd2_!!3015936477.jpg|https://qnimg.vadxq.com/luckyshop/1571110487951.O1CN01XGTkMB1xiVp06bYVq_!!3015936477.jpg',
        price: 1199, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Apple/苹果 iPod touch',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571116286501.O1CN01MZmU8w22AEHZTiq8S_!!1917047079.png_430x430q90.png|https://qnimg.vadxq.com/luckyshop/1571116312346.O1CN016R8y8J22AEHZFmIQu_!!1917047079.png_430x430q90.png',
        desc: 'Apple/苹果 iPod touch Apple/苹果 iPod touch Apple/苹果 iPod touch',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571116333389.O1CN01wu5xNF22AEHWj8LX4_!!1917047079.jpg|https://qnimg.vadxq.com/luckyshop/1571116348636.O1CN018aUmY822AEIXqXb7S_!!1917047079.jpg|https://qnimg.vadxq.com/luckyshop/1571116373222.O1CN01s4QQgX22AEIfWsN6B_!!1917047079.jpg',
        price: 1199, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        title: 'Apple/苹果 iPod touch',
        cover: 'https://qnimg.vadxq.com/luckyshop/1571116665367.O1CN01r8XUu11zrKidKfPjk_!!4156286767.jpg_430x430q90.jpg|https://qnimg.vadxq.com/luckyshop/1571116683798.O1CN01Kg60fX1zrKicBm79M_!!4156286767.jpg_430x430q90.jpg',
        desc: 'Apple/苹果 iPod touch Apple/苹果 iPod touch Apple/苹果 iPod touch',
        detail: 'https://qnimg.vadxq.com/luckyshop/1571116716497.O1CN01qe9LIQ1zrKic4qq1B_!!4156286767.jpg|https://qnimg.vadxq.com/luckyshop/1571116741560.O1CN01UmHLtK1zrKiZD3dBd_!!4156286767.jpg|https://qnimg.vadxq.com/luckyshop/1571116770688.O1CN01krUxLP1zrKiezRU63_!!4156286767.jpg',
        price: 1199, // 单价,默认0
        score: 0, // 评分,待定，后端在何时更新评分状态，默认0
        count: 0, // 销售数量,默认0
        tag: 6, // 分类,默认1
        stock: 1000, // 库存,前后端均需判定,默认0
        is_shelf: true, // 上下架，true，上架，默认false
        discount: 0, // 折扣
        is_recommend: false, // 推荐，true推荐，默认false
        sale: 0, // 总销售额,默认0
        status: 1,
        create_time: new Date(),
        update_time: new Date(),
      }], {});
    }
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
