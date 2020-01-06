import request from '../utils/io';
import io from '../utils/io';

export default {
  // 获取用户信息
  getUserInfo() {
    return request.sendRequest('get', { path: '/api/v1/users/info' });
  },

  // 获取积分等级
  getUserScore() {
    return request.sendRequest('get', { path: '/api/v1/users/score' });
  },

  // 获取地址
  getAddressList() {
    return request.sendRequest('get', { path: '/api/v1/users/addresses' });
  },

  // 登录接口
  loginUserInfo(params) {
    return io.post('/api/v1/account/login', { params });
  },

  // 注册接口
  postUserInfo(params) {
    return io.post('/api/v1/account/register', { params });
  },

  // 获取验证码接口
  getUserIdentify(params) {
    return io.post('/api/v1/sms/code', { params });
  },

  // 验证短信验证码
  putPhoneIdentify(params) {
    return io.put('/api/v1/sms/code', { params });
  },

  // 忘记密码接口
  fogetUserInfo(params) {
    return io.post('/api/v1/account/forget', { params });
  },

  // 修改个人信息
  updateUserInfo(params) {
    return io.put('/api/v1/users/info', { params });
  },

  // 修改密码
  updateUserPassWord(params) {
    return io.put('/api/v1/users/password', { params });
  },

  // 更换手机号
  updateUserPhone(params) {
    return io.put('/api/v1/users/phone', { params });
  },

  // 添加地址
  newAddress(params) {
    return io.post('/api/v1/users/addresses', { params });
  },

  // 修改地址
  updateAddress(id, params) {
    return io.put(`/api/v1/users/addresses/${id}`, { params });
  },

  // 删除地址
  deleteAddress(id) {
    return io.delete(`/api/v1/users/addresses/${id}`);
  },
};
