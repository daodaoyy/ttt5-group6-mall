import React, { Component } from 'react';
import { Badge, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getHotProduct } from '@/api/product';
import './home.less';

class HotProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotProductList: [],
      recommendList: [],
    };
  }

  componentDidMount() {
    getHotProduct().then(res => {
      this.setState({ hotProductList: res.data.data.products });
    });
  }

  addShopCart = item => {
    const newItem = Object.assign({}, item);
    newItem.productNumber = 1;
    this.props.handleAddCart(newItem);
    Toast.info('加入购物车成功', 1);
  }

  render() {
    const items = this.state.hotProductList.map(item => {
      const productDetailId = `/productDetail/${item.id}`;
      return (
        <div
          className="everyPro"
          key={ item.id }
        >
          <NavLink to={ productDetailId }>
            <div className="item-img">
              <img
                src={ item.cover[0] }
                width="96%"
                height="96%"
                alt="热销商品"
              />
            </div>
          </NavLink>
          <div className="item-content">
            <NavLink to={ productDetailId }>
              <h1 className="item-title">
                { item.title }
              </h1>
              <div className="item-price">
                <span className="price">
                  <Badge
                    text="自营"
                    style={
                      {
                        marginRight: 5, padding: '0 3px', backgroundColor: '#3cbc34', borderRadius: 2,
                      }
                    }
                  />
                  <em>￥</em>
                  { item.price }
                </span>
              </div>
            </NavLink>
            <div className="item-sale">
              <span>
                已售
                { item.count }
                件
              </span>
              <div onClick={ () => this.addShopCart(item) }>
                <img
                  src={ require('../../../../images/shopcart.png') }
                  width="100%"
                  height="100%"
                  alt="购物车"
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="twoProducts">
        <div className="hotProduct">
          <div className="social-header">
            <p>
              <span className="hottitle">热销商品</span>
              <span className="hotsmalltitle">绿叶超市更懂你</span>
            </p>
          </div>
          <div className="allproducts">
            { items }
            <div className="clear" />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({ // 获取数据
  state,
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

export default connect(mapState, mapDispatch)(HotProduct);
