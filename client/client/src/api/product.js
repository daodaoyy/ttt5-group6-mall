import request from '../utils/io';
import io from '../utils/io';

// 分类商品列表
export function getProductListClass(tag, nextPage, limit) {
  return request.sendRequest('get', {
    path: `/api/v1/products?tag=${tag}&page=${nextPage}&limit=${limit}`,
  });
}

// 热销商品列表
export function getHotProduct() {
  return request.sendRequest('get', {
    path: '/api/v1/products?count=1',
  });
}
// 推荐商品列表
export function getRecommendProduct() {
  return request.sendRequest('get', {
    path: '/api/v1/products?isRecommend=1',
  });
}

// 获取商品详情
export function getProductDetail(id) {
  return request.sendRequest('get', {
    path: `/api/v1/products/${id}`,
  });
}

// 获取商品所有评价
export function getProductEvaluateList(evaluateProductId) {
  return request.sendRequest('get', {
    path: `/api/v1/products/${evaluateProductId}/appraisals`,
  });
}

// 搜索商品
export function getSearchProduct(searchContent, nextPage, limit) {
  return request.sendRequest('get', {
    path: `/api/v1/products?title=${searchContent}&page=${nextPage}&limit=${limit}`,
  });
}

// 活动列表
export function getActivity() {
  return request.sendRequest('get', {
    path: '/api/v1/activities',
  });
}

// 获取活动商品列表
export function getActivityDetail(id) {
  return request.sendRequest('get', {
    path: `/api/v1/activity/${id}`,
  });
}

// 获取购物车
export function getshopCart() {
  return request.sendRequest('get', {
    path: '/api/v1/shoppingcarts',
  });
}

export default {
  // 提交购物车
  submitShopCart(params) {
    return io.post('/api/v1/shoppingcarts', { params });
  },
};
