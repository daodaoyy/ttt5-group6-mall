'use strict';

module.exports = {
  /**
   * 返回客户端内容
   * @param {Number} status // 返回状态
   * @param {Boolean} success // 返回是否正确
   * @param {Object} data // 返回内容
   * @param {String} message // 返回内容
   */
  returnBody(status, success = true, data = null, message = '操作成功') {
    if (success === false && message === '操作成功') {
      message = '操作失败';
    }
    this.body = {
      data,
      message,
      success,
      status,
    };
  },
};
