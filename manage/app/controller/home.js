/*
 * @Author: Yifeng Tao 
 * @Date: 2019-09-12 15:16:34 
 * @Last Modified by: 
 * @Last Modified time: 2019-09-18 10:24:47
 */

'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async manage() {
    const { ctx } = this;
    await ctx.render('manage.html');
  }
}

module.exports = HomeController;
