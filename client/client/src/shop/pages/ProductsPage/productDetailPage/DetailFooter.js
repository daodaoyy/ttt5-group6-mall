import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Toast,
} from 'antd-mobile';
import './detail.less';
import { NavLink } from 'react-router-dom';

class DetailFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  addShopCart = item => {
    if (this.props.ifAddToShopCart) {
      const newItem = Object.assign({}, item);
      newItem.productNumber = 1;
      this.props.handleAddCart(newItem);
      Toast.info('加入购物车成功', 1);
    } else {
      Toast.fail('加入失败，请稍后重试', 1);
    }
  }

  buyNow = item => {
    if (this.props.ifAddToShopCart) { // 已经拿到数据
      const newItem = Object.assign({}, item);
      newItem.productNumber = 1;
      window.localStorage.setItem('buyNow', JSON.stringify(newItem));
      window.location.href = '/submitOrder?flag=1';
    } else {
      Toast.fail('购买失败，请稍后重试', 1);
    }
  }

  render() {
    let div1 = '';
    if (this.props.len) {
      div1 = (<div className="shopCartNum">
        <span>{ this.props.len }</span>
      </div>);
    }
    return (
      <div className="detailfooter">
        <div className="smallShopCart">
          <NavLink
            exact
            to="/shoppingCart"
          >
            <div className="shopcartpic">
              <img
                src={ require('../../../../images/shopcart1.png') }
                width="90%"
                height="90%"
                alt="购物车"
              />
              { div1 }
            </div>
            <div className="shopcarttitle">购物车</div>
          </NavLink>
        </div>
        <div className="buy"
          onClick={ () => this.buyNow(this.props.data) }
        >
            立即购买
        </div>
        <div
          className="addToCart"
          onClick={ () => this.addShopCart(this.props.data) }
        >
          加入购物车
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  len: state.shopCartList.payload.length, // 购物车数组长度
});

const mapDispatch = dispatch => ({ // dispatch
  handleAddCart(item) {
    dispatch(
      {
        type: 'ADD_SHOPCART',
        payload: item,
      }
    );
  },
});

export default connect(mapState, mapDispatch)(DetailFooter);
