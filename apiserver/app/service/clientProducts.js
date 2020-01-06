'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

// 保留1位小数
function toDecimal(x) {
  let f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 10) / 10;
  return f;
}

class clientProducts extends Service {
  // 获取商品列表，包含分页，分类，搜索
  async getProductsList({ tag, page, limit, title, count, isRecommend }) {
    const intPage = parseInt(page);
    const intLimit = parseInt(limit);
    const intTag = parseInt(tag);
    let initWhere = { status: 1, isShelf: 1 }; // 初始化where
    const Op = Sequelize.Op;
    // 根据有无分类参数tag来修改where条件
    if (tag) {
      initWhere = Object.assign({}, initWhere, { tag: intTag });
    }
    // 根据有无搜索title来修改where条件
    if (title) {
      initWhere = Object.assign({}, initWhere, { title: { [Op.like]: `%${title}%` } });
    }
    let option = {
      attributes: [ 'id', 'title', 'cover', 'desc', 'detail', 'price', 'score', 'count', 'tag', 'stock', 'discount' ],
      where: initWhere,
      limit: intLimit,
      offset: (intPage - 1) * intLimit,
    };
    // 根据有无推荐isRecommend字段来修改option
    if (isRecommend) {
      initWhere = Object.assign({}, initWhere, { isRecommend: 1 });
      const isRecommendOption = {
        attributes: [ 'id', 'title', 'cover', 'desc', 'detail', 'price', 'score', 'count', 'tag', 'stock', 'discount' ],
        where: initWhere,
        order: [[ 'id', 'DESC' ]],
      };
      const isRecommendData = await this.ctx.model.Products.findAll(isRecommendOption);
      if (isRecommendData.length > 0) {
        for (let i = 0; i < isRecommendData.length; i++) {
          isRecommendData[i].cover = isRecommendData[i].cover.split('|');
          isRecommendData[i].detail = isRecommendData[i].detail.split('|');
        }
      } else {
        console.log(1);
      }
      const res = {
        products: isRecommendData,
      };
      return {
        res,
        status: 1,
      };
    }
    // 根据销量进行
    if (count) {
      option = Object.assign({}, option, { order: [[ 'count', 'DESC' ]] });
    }
    // 查询根据最后确定得initWhere去查询数据
    const result = await this.ctx.model.Products.findAndCountAll(option);
    // 请求成功
    if (result) {
      for (let i = 0; i < result.rows.length; i++) {
        result.rows[i].cover = result.rows[i].cover.split('|');
        result.rows[i].detail = result.rows[i].detail.split('|');
      }
      const res = {
        limit: intLimit, // 每页数量，默认10
        pages: Math.ceil(result.count / intLimit), // 总页码
        products: result.rows,
      };
      return {
        res,
        status: 1,
      };
    }
    return {
      res: '获取失败',
      status: 0,
    };
  }

  // 获取商品详情
  async detailProducts({ id }) {
    // 查询商品的普通信息
    const result = await this.ctx.model.Products.findByPk(toInt(id), { attributes: [ 'id', 'title', 'cover', 'desc', 'detail', 'price', 'score', 'count', 'tag', 'stock', 'discount', 'isRecommend' ] });
    if (result) {
      result.cover = result.cover.split('|'); // 将图片链接拼接的字符串拆分组合成数组
      result.detail = result.detail.split('|');
      // 查询商品的评价信息
      const appraisa = await this.ctx.model.Appraisal.findAll({ where: { pid: id }, attributes: [ 'createTime', 'content', 'uid', 'score' ], order: [[ 'id', 'DESC' ]], limit: 1 });
      const appraisaInfo = {};
      // 如果评价为空
      if (appraisa.length === 0) {
        result.dataValues.appraisa = appraisaInfo; // 返回的最新评价也为空
        result.dataValues.appraisaCount = 0; // 评价的数量为0
      } else { // 最新评价存在
        const appraisaCount = await this.ctx.model.Appraisal.findAndCountAll({ where: { pid: id } }); // 查询评价的总数
        const userInfo = await this.ctx.model.User.findByPk(appraisa[0].uid, { attributes: [ 'avatar', 'nickname' ] }); // 查询最新评价的用户的信息
        appraisaInfo.createTime = appraisa[0].createTime; // 评价的时间
        appraisaInfo.content = appraisa[0].content; // 评价的内容
        appraisaInfo.score = appraisa[0].score; // 评价的评分
        appraisaInfo.avatar = userInfo.avatar; // 评价的用户头像
        appraisaInfo.nickname = userInfo.nickname; // 评价的用户昵称
        result.dataValues.appraisa = appraisaInfo; // 最新的一条评价
        result.dataValues.appraisaCount = appraisaCount.count; // 评价总数
        result.dataValues.isRecommend = appraisa[0].isRecommend; // 是否推荐
      }
      return {
        res: result.dataValues,
        status: 1,
      };
    }
    return {
      res: '获取失败',
      status: 0,
    };
  }

  // 编辑商品评价
  async editProductsAppraisal({ score, content, pid, uid, oid }) {
    // 生成新得评价记录
    const result = await this.ctx.model.Appraisal.create({
      score: toInt(score), content, pid: toInt(pid), uid: toInt(uid),
    });
    if (result) {
      const appraisalCount = await this.ctx.model.Appraisal.findAndCountAll({ where: { pid } }); // 根据商品id查询商品的总评价数
      const productScore = await this.ctx.model.Products.findByPk(toInt(pid), { attributes: [ 'score' ] }); // 根据商品的id查询商品的评分
      const newScore = (((appraisalCount.count - 1) * productScore.score) + toInt(score)) / appraisalCount.count; // 用户评价成功后重新计算商品的评分
      await this.ctx.model.Products.update({ score: toDecimal(newScore) }, { where: { id: toInt(pid) } }); // 更新商品的评分
      await this.ctx.model.OrderProduct.update({ isAppraisal: 1 }, { where: { oid: toInt(oid), pid: toInt(pid) } });
      return {
        res: '评价成功',
        status: 1,
      };
    }
    return {
      res: '评价失败',
      status: 0,
    };
  }

  // 客户端获取商品评价
  async getProductsAppraisal({ id, page, limit }) {
    // 查询商品评价
    const result = await this.ctx.model.Appraisal.findAndCountAll({
      attributes: [ 'createTime', 'content', 'uid', 'score' ],
      where: { pid: id },
      order: [[ 'id', 'DESC' ]],
      limit: toInt(limit),
      offset: (toInt(page) - 1) * toInt(limit),
    });
    if (result) {
      const appraisalArray = [];
      // 循环遍历根据评价的用户id查询用户的昵称和头像
      for (let i = 0; i < result.rows.length; i++) {
        const userInfo = await this.ctx.model.User.findByPk(result.rows[i].uid, { attributes: [ 'id', 'avatar', 'nickname' ] });
        userInfo.dataValues.createTime = result.rows[i].createTime; // 时间挂在userInfo对象上
        userInfo.dataValues.content = result.rows[i].content; // 评论内容挂在userInfo对象上
        userInfo.dataValues.score = result.rows[i].score; // 评分挂在userInfo对象上
        appraisalArray.push(userInfo.dataValues); // push进最后返回的数组里
      }
      return {
        res: appraisalArray,
        status: 1,
      };
    }
    return {
      res: '获取失败',
      status: 0,
    };
  }
}

module.exports = clientProducts;
