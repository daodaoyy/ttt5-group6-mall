import React, { Component } from 'react';
import './MyFooter.less';
import { NavLink } from 'react-router-dom';

class MyFooter extends Component {
  render() {
    return (
      <div className="my-footer">
        <ul className="my-footer-list">
          <NavLink to="/">
            <li className="my-home">
              <img
                src={ require('../../../../../images/home_default.png') }
                width="30%"
                height="30%"
                alt="首页"
              />
              <span>首页</span>
            </li>
          </NavLink>
          <NavLink to="/shoppingCart">
            <li className="my-cart">
              <img
                src={ require('../../../../../images/cart_default.png') }
                width="30%"
                height="30%"
                alt="首页"
              />
              <span>购物车</span>
            </li>
          </NavLink>
          <NavLink to="/orderList?type=0">
            <li className="my-order">
              <img
                src={ require('../../../../../images/order_default.png') }
                width="30%"
                height="30%"
                alt="首页"
              />
              <span>订单</span>
            </li>
          </NavLink>
          <NavLink to="/myCenter">
            <li className="my-center">
              <img
                src={ require('../../../../../images/my_select.png') }
                width="30%"
                height="30%"
                alt="首页"
              />
              <span>我的</span>
            </li>
          </NavLink>
        </ul>
      </div>
    );
  }
}

export default MyFooter;
