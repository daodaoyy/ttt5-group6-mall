'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.returnBody(404, false, '404 Not Found!');
  }
}

module.exports = HomeController;
