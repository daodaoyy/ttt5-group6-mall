import request from '../utils/io';
import io from '../utils/io.js';

// 全部列表有问题
export function getOrderListData(params) {
  return request.sendRequest('get', {
    path: '/api/v1/orders',
    params: { params },
  });
}

export function getOrderDetail(oid) {
  return request.sendRequest('get', {
    path: `/api/v1/orders/${oid}`,
  });
}
// 没用的地址，瞎写
export function getAddress() {
  return request.sendRequest('get', {
    path: 'http://localhost:53000/addresses',
  });
}
export default {
  // 更新订单状态
  updateOrderStatus(params) {
    return io.put('/api/v1/orders', { params });
  },
  // 提交订单
  postOrder(params) {
    return io.post('/api/v1/orders', { params });
  },
  // 提交评论
  postEvaluate(params) {
    return io.post('/api/v1/products/appraisals', { params });
  },
  // 申请退款
  putProductStatus(oid, params) {
    return io.put(`/api/v1/orders/${oid}`, { params });
  },
};
