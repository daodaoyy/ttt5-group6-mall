'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class manageProducts extends Service {
  // 获取商品列表，包含分页，分类，搜索
  async getProductsList({ tag, page, limit, title }) {
    const intPage = parseInt(page);
    const intLimit = parseInt(limit);
    const intTag = parseInt(tag);
    let initWhere = { status: 1 }; // 初始化where
    const Op = Sequelize.Op;
    // 根据有无分类参数tag来修改where条件
    if (tag) {
      initWhere = Object.assign({}, initWhere, { tag: intTag });
    }
    // 根据有无搜索title来修改where条件
    if (title) {
      initWhere = Object.assign({}, initWhere, { title: { [Op.like]: `%${title}%` } });
    }
    // 查询根据最后确定得initWhere去查询数据
    const result = await this.ctx.model.Products.findAndCountAll({
      attributes: [ 'id', 'title', 'cover', 'desc', 'detail', 'price', 'score', 'count', 'tag', 'stock', 'discount', 'isRecommend', 'isShelf', 'sale', 'status' ],
      where: initWhere,
      limit: intLimit,
      offset: (intPage - 1) * intLimit,
    });
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
        sum: result.count, // 总数
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

  // 添加商品
  async addProducts({ title, cover, desc, detail, price, tag, isRecommend, discount, stock }) {
    const coverStr = cover.join('|'); // 将cover图片链接数组以“|”为分隔符拼接成字符串
    const detailStr = detail.join('|'); // 将detail图片链接数组以“|”为分隔符拼接成字符串
    const result = await this.ctx.model.Products.create({
      title, cover: coverStr, desc, detail: detailStr, price: toInt(price), tag: toInt(tag), isRecommend: toInt(isRecommend), discount: toInt(discount), stock: toInt(stock),
    });
    if (result) {
      return {
        res: '添加成功',
        status: 1,
      };
    }
    return {
      res: '添加失败',
      status: 0,
    };
  }
  // 删除商品
  async deleteProducts({ id }) {
    const result = await this.ctx.model.Products.update({ status: 0 }, {
      where: {
        id,
      },
    });
    if (result[0]) {
      return {
        res: '删除成功',
        status: 1,
      };
    }
    return {
      res: '删除失败',
      status: 0,
    };
  }

  // 修改商品
  async editProducts({ id, title, cover, desc, detail, price, tag, stock, discount, isRecommend, isShelf }) {
    const coverStr = cover.join('|'); // 将cover图片链接数组以“|”为分隔符拼接成字符串
    const detailStr = detail.join('|'); // 将detail图片链接数组以“|”为分隔符拼接成字符串
    const result = await this.ctx.model.Products.update(
      {
        title, cover: coverStr, desc, detail: detailStr, price: toInt(price), tag: toInt(tag), stock: toInt(stock), discount: toInt(discount), isRecommend: toInt(isRecommend), isShelf: toInt(isShelf),
      }, {
        where: {
          id,
        },
      });
    if (result[0]) {
      return {
        res: '修改成功',
        status: 1,
      };
    }
    return {
      res: '修改失败',
      status: 0,
    };
  }

  // 获取商品详情
  async detailProducts({ id }) {
    const result = await this.ctx.model.Products.findByPk(toInt(id), { attributes: [ 'id', 'title', 'cover', 'desc', 'detail', 'price', 'score', 'count', 'tag', 'stock', 'discount', 'isRecommend', 'isShelf', 'sale', 'status' ] });
    if (result) {
      result.cover = result.cover.split('|'); // 将图片链接拼接的字符串拆分组合成数组
      result.detail = result.detail.split('|');
      return {
        res: result,
        status: 1,
      };
    }
    return {
      res: '获取失败',
      status: 0,
    };
  }
}

module.exports = manageProducts;
