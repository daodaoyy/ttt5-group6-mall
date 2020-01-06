import React, { Component } from 'react';
import {
  Button,
  Modal,
  Toast,
} from 'antd-mobile';
import { NavLink } from 'react-router-dom';
import creatHistory from 'history/createHashHistory';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Footer from '../Footer/Footer';
import './shopcart.less';
const history = creatHistory();

class ShoppingCartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      len: this.props.len, // 购物车商品种类数量
      totalPrice: 0, // 购物车总价
      show: false,
    };
  }

  componentDidMount() {
    let shopLen1 = 0;
    let shopTotal1 = 0;
    if (this.props.cartList.length) {
      const carList1 = this.props.cartList;
      this.setState({
        show: true,
      });
      carList1.forEach(item => {
        shopLen1 += 1;
        shopTotal1 += parseFloat(item.price) * parseFloat(item.productNumber);
      });
    } else {
      this.setState({
        show: false,
      });
    }
    this.setState({
      len: shopLen1,
      totalPrice: shopTotal1,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // 当接收到的购物车变化时=>计算购物车的总价和数量
    if (this.props.cartList.length === 0) {
      this.setState({
        show: false,
      });
    } else {
      this.setState({
        show: true,
      });
    }
    let shopLen = 0;
    let shopTotal = 0;
    (nextProps.cartList).forEach(item => {
      shopLen += 1;
      shopTotal += parseFloat(item.price) * parseFloat(item.productNumber);
    });
    this.setState({
      len: shopLen,
      totalPrice: shopTotal,
    });
  }

  reduce = id => {
    this.props.reduceCartNum(id);
  }

  add = id => {
    this.props.addCartNum(id);
  }

  del = id => {
    Modal.alert('删除', '确定删除这个宝贝吗？', [
      { text: '取消', style: 'default' },
      { text: '确定', onPress: () => this.props.delShopCart(id), style: 'default' },
    ]);
  }

  computedPrice = () => {
    if (this.state.len === 0) { // 结算的时候先判断购物车是否有商品=>无商品时
      Toast.info('请先添加商品至购物车', 1);
    } else if (window.localStorage.getItem('token') !== null) { // 有商品时，判断是否登录=>已登录
      window.location.href = '/submitOrder';
    } else { // 有商品=>未登录
      window.location.href = '/login';
    }
  }

  render() {
    const states = this.state;
    // const { AgreeItem } = Checkbox;
    const items = this.props.cartList.map(item => (
      <li
        className="everyProduct"
        key={ item.id }
      >
        <div className="selectpro">
          { /* <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)} /> */ }
        </div>
        <div className="cartPic">
          <img
            src={ item.cover[0] }
            width="100%"
            height="100%"
            alt="个人护理"
          />
        </div>
        <div className="cartContent">
          <div className="descriptionPro">
            <span>
              { item.title }
              { item.desc }
            </span>
          </div>
          <div className="edit">
            <div className="price">
              <i>￥</i>
              { item.price }
            </div>
            <div className="editnum">
              <Button onClick={ () => this.reduce(item.id) }>-</Button>
              <span className="pronum">{ item.productNumber }</span>
              <Button onClick={ () => this.add(item.id) }>+</Button>
            </div>
            <div className="deletePro">
              <span
                onClick={ () => this.del(item.id) }
                className="delete"
              >
删除
              </span>
            </div>
          </div>
        </div>
      </li>
    ));
    if (states.show) {
      return (
        <DocumentTitle title="购物车">
          <div className="shopcart">
            <div className="about-title">
              <span
                onClick={ () => history.go(-1) }
                className="about-title-back"
              />
              <p className="about-title-name">购物车</p>
            </div>
            <ul className="shopCartList">
              { items }
            </ul>
            <div className="settlement">
              <div className="selectproAll">
                { /* <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
                  全选
                </AgreeItem> */ }
              </div>
              <div className="total">
                <div className="smallTotal">
                  <span>合计：</span>
                  <span className="price-total">
                    <i>￥</i>
                    { states.totalPrice.toFixed(2) }
                  </span>
                </div>
              </div>
              <div
                className="btn"
                onClick={ this.computedPrice }
              >
                结算（
                { states.len }
                ）
              </div>
            </div>
            <Footer />
          </div>
        </DocumentTitle>
      );
    } return (
      <DocumentTitle title="购物车">
        <div className="shopcart">
          <div className="about-title">
            <span
              onClick={ () => history.go(-1) }
              className="about-title-back"
            />
            <p className="about-title-name">购物车</p>
          </div>
          <ul className="shopCartList">
            <div className="noshopcart">
              <img
                src={ require('../../../../images/noshopcart.png') }
                alt="暂无数据"
              />
              <p className="noSearchData">暂无商品</p>
              <NavLink
                exact
                to="/"
              >
                <button className="startBuy">去购物</button>
              </NavLink>
            </div>
          </ul>
          <div className="settlement">
            <div className="selectproAll">
              { /* <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
                  全选
                </AgreeItem> */ }
            </div>
            <div className="total">
              <div className="smallTotal">
                <span>合计：</span>
                <span className="price-total">
                  <i>￥</i>
                  { states.totalPrice.toFixed(2) }
                </span>
              </div>
            </div>
            <div
              className="btn"
              onClick={ this.computedPrice }
            >
                结算（
              { states.len }
                ）
            </div>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

const mapState = state => ({
  cartList: state.shopCartList.payload, // 获取到的购物车数组
  len: state.shopCartList.payload.length,
});

const mapDispatch = dispatch => ({ // dispatch
  reduceCartNum(id) { // 购物车数量=>减
    dispatch(
      {
        type: 'REDUCE_SHOPCART_NUM',
        payload: id,
      }
    );
  },
  addCartNum(id) { // 购物车数量=>加
    dispatch(
      {
        type: 'ADD_SHOPCART_NUM',
        payload: id,
      }
    );
  },
  delShopCart(id) { // 删除购物车商品
    dispatch(
      {
        type: 'DEL_SHOPCART',
        payload: id,
      }
    );
  },
  getShopCart(cartArr) { // 获取购物车商品
    dispatch(
      {
        type: 'GET_SHOPCART',
        payload: cartArr,
      }
    );
  },
});

export default connect(mapState, mapDispatch)(ShoppingCartPage);
