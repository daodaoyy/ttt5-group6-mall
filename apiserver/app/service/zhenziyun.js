'use strict';

const Service = require('egg').Service;
// const VerificationCode = require('../../zhenzisms/zhenzisms');
const Axios = require('axios');
const https = require('https');

class ZhenziyunService extends Service {
  /**
   * 发送验证码
   * @param {String} phone - {}
   * @param {Number} code - {}
   * @return {Object} - return data
   */
  async sendVeryCode(phone, code) {
    const options = {
      url: this.config.veryCode.url,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      data: `appId=${this.config.veryCode.id}&appSecret=${this.config.veryCode.ak}&message=您的验证码为:${String(code)}&number=${phone}`,
    };
    const res = await Axios(options);
    if (res.data.code === 0) {
      return {
        status: 1,
        data: res.data,
      };
    }
    return {
      status: 0,
      data: res.data,
    };
  }

  /**
   * 生产验证码
   * @param {String} uphone - {}
   * @return {Object} - return data
   */
  async getVerification(uphone) {
    if (!/^[1]([3-9])[0-9]{9}$/.test(uphone)) {
      return {
        status: 0,
        res: '手机号格式错误',
      };
    }
    const isSend = await this.ctx.model.Zhenziyun.findOne({ where: { phone: uphone, status: 1 } });
    const code = Math.floor(Math.random() * 1000000);
    if (isSend) {
      // 判断时间是否超过60秒
      if (new Date().getTime() - new Date(isSend.updateTime).getTime() > 60000) {
        // 更新状态，从新发送
        const changeStatus = await this.ctx.model.Zhenziyun.update({ status: 0 }, { where: { phone: uphone } });
        if (changeStatus[0]) {
          const result = await this.ctx.model.Zhenziyun.create({
            vcode: code,
            phone: uphone,
          });
          if (result) {
            const res = await this.sendVeryCode(uphone, code);
            if (res.status) {
              return {
                res: '验证码发送成功',
                status: 1,
              };
            }
          }
          return {
            res: '验证码发送失败',
            status: 0,
          };
        }
      }
      return {
        status: 0,
        res: '发送间隔不足60秒',
      };
    }
    // 不存在或者是使用过了
    const result = await this.ctx.model.Zhenziyun.create({
      vcode: code,
      phone: uphone,
    });
    if (result) {
      const res = await this.sendVeryCode(uphone, code);
      if (res.status) {
        return {
          res: '验证码发送成功',
          status: 1,
        };
      }
    }
    return {
      res: '验证码发送失败',
      status: 0,
    };
  }

  /**
   * 验证验证码
   * @param {Object} req - {}
   * @return {Object} - return data
   */
  async veryCode(req) {
    if (!/^[1]([3-9])[0-9]{9}$/.test(req.phone)) {
      return {
        status: 0,
        res: '手机号格式错误',
      };
    }
    const codeDate = await this.ctx.model.Zhenziyun.findOne({ where: { phone: req.phone, status: 1 } });
    if (codeDate) {
      // 判断是否过期
      if (new Date().getTime() - new Date(codeDate.updateTime).getTime() < 300000 && codeDate.vcode === req.code) {
        return {
          status: 1,
          res: '验证成功',
        };
      }
    }
    return {
      status: 0,
      res: '验证手机号失败',
    };
  }
}

module.exports = ZhenziyunService;
