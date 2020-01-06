import React, { Component } from 'react';
import { WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

class OrderListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const string = queryString.parse(this.props.history.location.search).flag;
    let cartList = [];
    let totalPrice = 0;
    let totalNumber = 0;
    if (string === '1') {
      const result = JSON.parse(localStorage.getItem('buyNow'));
      cartList.push(result);
      cartList.forEach(e => {
        totalPrice += e.productNumber * e.price;
        totalNumber += e.productNumber;
      });
      this.props.parentGetTotalPrice(cartList);
    } else {
      cartList = this.props.cartList;
      totalPrice = 0;
      totalNumber = 0;
      cartList.forEach(e => {
        totalPrice += e.productNumber * e.price;
        totalNumber += e.productNumber;
      });
      this.props.parentGetTotalPrice(this.props.cartList);
    }
    const ProductList = cartList || [];
    return (
      <div className="order-container">
        <ul className="order-list">
          { ProductList.map(item => (
            <li
              key={ item.id }
              className="order-list-item"
            >
              <div className="order-item">
                <div className="order-item-header">
                  <span className="header-name">{ item.title }</span>
                </div>
                <div className="order-item-content">
                  <span className="content-img">
                    <img
                      src={ item.cover[0] }
                      width="150"
                      height="150"
                      alt="商品图片"
                    />
                  </span>
                  <div className="content-right">
                    <div className="content-title">
                      <span className="content-description">{ item.desc }</span>
                      <div className="price-container">
                        <div className="content-price">
￥
                          { item.price }
                        </div>
                        <div className="content-num">
×
                          { item.productNumber }
                        </div>
                      </div>
                    </div>
                    <div className="exchange-description">七天无理由退换</div>
                  </div>
                </div>
              </div>
            </li>
          )) }
        </ul>
        <div className="total-price-container">
          <span className="num">
            共
            { totalNumber }
            件，
          </span>
          <span className="total">小计：</span>
          <span className="total-price">
￥
            { totalPrice }
          </span>
        </div>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

const mapState = state => ({
  cartList: state.shopCartList.payload, // 获取到的购物车数组
});

export default withRouter(connect(mapState)(OrderListItem));
