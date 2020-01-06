import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Shop from './entry';
import ShopCartReducer from './reducer/ShopCartReducer';
import shopCartApi from '@/api/product';
import { getshopCart } from '@/api/product';
import '../style/base.css';
import '../style/normalize.css';
import '../style/antd-rewrite.css';

const reducer = combineReducers({
  shopCartList: ShopCartReducer,
});
const store = createStore(reducer);

const Index = data => (
  <Provider store={ data.store }>
    <Router>
      <div className="wrapper">
        { /* <Footer /> */ }
        { /* 注册页面 */ }
        <Route
          path="/register"
          exact
          component={ Shop.RegisterPage }
        />
        { /* 登录页面 */ }
        <Route
          path="/login"
          exact
          component={ Shop.SignInPage }
        />
        { /* 忘记密码 */ }
        <Route
          path="/forgetPass"
          exact
          component={ Shop.ForgetPassPage }
        />
        { /* 首页 */ }
        <Route
          path="/"
          exact
          component={ Shop.HomePage }
        />
        { /* 搜索结果页 */ }
        <Route
          path="/searchResult/:title?"
          exact
          component={ Shop.SearchResultPage }
        />
        { /* 分类商品页 */ }
        <Route
          path="/classificationProduct/:id"
          exact
          component={ Shop.ClassificationProductPage }
        />
        { /* 活动页 */ }
        <Route
          path="/activity/:id"
          exact
          component={ Shop.ActivityPage }
        />
        { /* 商品详情页 */ }
        <Route
          path="/productDetail/:id"
          exact
          component={ Shop.ProductDetailPage }
        />
        { /* 评价列表页 */ }
        <Route
          path="/evaluateList/:id"
          exact
          component={ Shop.EvaluateListPage }
        />

        { /* 下单页 */ }
        <Route
          path="/submitOrder"
          exact
          component={ Shop.SubmitOrderPage }
        />
        { /* 选择收货地址页 */ }
        { /* <Route path="/selectAddress" exact component={Shop.SelectAddressPage} /> */ }
        { /* 订单详情页 */ }
        <Route
          path="/orderDetail"
          exact
          component={ Shop.OrderDetailPage }
        />
        { /* 订单列表页 */ }
        <Route
          path="/orderList"
          exact
          component={ Shop.OrderListPage }
        />
        { /* 订单评价页 */ }
        <Route
          path="/evaluate"
          exact
          component={ Shop.EvaluatePage }
        />


        { /* 购物车页 */ }
        <Route
          path="/shoppingCart"
          exact
          component={ Shop.ShoppingCartPage }
        />
        { /* 我的 */ }
        <Route
          path="/myCenter"
          exact
          component={ Shop.MyCenterPage }
        />
        { /* 个人资料页 */ }
        <Route
          path="/myInformation"
          exact
          component={ Shop.MyInformationPage }
        />
        { /* 昵称修改页 */ }
        <Route
          path="/nicknameUpdate"
          exact
          component={ Shop.NicknameUpdatePage }
        />
        { /* 个签修改页 */ }
        <Route
          path="/autographUpdate"
          exact
          component={ Shop.AutographUpdatePage }
        />
        { /* 关于页 */ }
        <Route
          path="/about"
          exact
          component={ Shop.AboutPage }
        />
        { /* 账号管理页 */ }
        <Route
          path="/account"
          exact
          component={ Shop.AccountPage }
        />
        { /* 手机号修改页 */ }
        <Route
          path="/phoneUpdate"
          exact
          component={ Shop.PhoneUpdatePage }
        />
        { /* 修改密码页 */ }
        <Route
          path="/passwordUpdate"
          exact
          component={ Shop.PasswordUpdatePage }
        />
        { /* 绑定新手机号页 */ }
        <Route
          path="/bindNewPhone"
          exact
          component={ Shop.BindNewPhonePage }
        />
        { /* 地址管理页 */ }
        <Route
          path="/addressList"
          exact
          component={ Shop.AddressListPage }
        />
        { /* 修改地址页 */ }
        <Route
          path="/addressUpdate"
          exact
          component={ Shop.AddressUpdatePage }
        />
        { /* 新增地址页 */ }
        <Route
          path="/addressAdd"
          exact
          component={ Shop.AddressAddPage }
        />
      </div>
    </Router>
  </Provider>
);

function renderPage() {
  ReactDom.render(<Index store={ store } />, global.document.querySelector('#root'));
}
renderPage(); // 初始渲染
store.subscribe(renderPage); // 当页面有变化的时候渲染页面

function savaShopCartToXXX() {
  const cart = store.getState().shopCartList.payload; // 获取到购物车数组
  const params = {
    data: cart,
  };
  shopCartApi.submitShopCart(params).then(res => { // 购物车刷新之前存储
    // eslint-disable-next-line no-console
    console.log(res.data.message);
  });
  // console.log(store.getState().shopCartList.payload.length);
  window.localStorage.setItem('shopCart', JSON.stringify(cart));
}
window.addEventListener('beforeunload', () => {
  savaShopCartToXXX();
});

function getShopCart() {
  // 刷新页面之后从后台获取购物车存进redux,此处不用onload因为每刷新一次页面index都会执行一遍所以可直接写在index里边
  getshopCart().then(res => {
    if (res.data.status !== 200) { // 登录失败：从localstorage中获取
      if (window.localStorage.getItem('shopCart') !== null) {
        const historystorage = JSON.parse(window.localStorage.getItem('shopCart'));
        store.dispatch({ // 存进store里边
          type: 'GET_SHOPCART',
          payload: historystorage,
        });
      }
    } else if (res.data.status === 200) { // 已登录：从后台获取
      const arr = res.data.data.products;
      const newShopCart = [];
      arr.forEach(element => {
        const newobj = Object.assign(element, { productNumber: element.count });
        newShopCart.push(newobj);
      });
      store.dispatch({ // 存进store里边
        type: 'GET_SHOPCART',
        payload: newShopCart,
      });
    }
  });
}
getShopCart();
