import React, { Component } from 'react';
import './Footer.less';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className="cart-footer">
        <ul className="footer-list">
          <NavLink to="/">
            <li className="footer-item">
              <img
                src={ require('../../../../images/home_default.png') }
                width="30%"
                height="30%"
                alt="首页"
              />
              <span>首页</span>
            </li>
          </NavLink>
          <NavLink to="/shoppingCart">
            <li className="footer-item">
              <img
                src={ require('../../../../images/cart_select.png') }
                width="30%"
                height="30%"
                alt="首页"
              />
              <span className="active">购物车</span>
            </li>
          </NavLink>
          <NavLink to="/orderList?type=0">
            <li className="footer-item">
              <img
                src={ require('../../../../images/order_default.png') }
                width="30%"
                height="30%"
                alt="首页"
              />
              <span>订单</span>
            </li>
          </NavLink>
          <NavLink to="/myCenter">
            <li className="footer-item">
              <img
                src={ require('../../../../images/my_default.png') }
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

export default Footer;
