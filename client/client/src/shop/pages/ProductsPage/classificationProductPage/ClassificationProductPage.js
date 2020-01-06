import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Badge, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import creatHistory from 'history/createHashHistory';
import './classificationProduct.less';
const history = creatHistory();
import {
  getProductListClass,
} from '@/api/product';

class ClassificationProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      show: true,
      texttitle: '',
      currentPage: 1,
      allPages: 1,
      getMoreShow: true,
    };
  }

  componentDidMount() {
    const classId = this.props.match.params.id;
    let text;
    switch (classId) {
      case '1':
        text = '个人护理';
        break;
      case '2':
        text = '日用百货';
        break;
      case '3':
        text = '生鲜冷藏';
        break;
      case '4':
        text = '乳饮酒水';
        break;
      case '5':
        text = '面点素食';
        break;
      case '6':
        text = '数码电器';
        break;
      case '7':
        text = '家用纺织';
        break;
      case '8':
        text = '坚果蜜饯';
        break;
      case '9':
        text = '纸品家清';
        break;
      case '10':
        text = '粮油米面';
        break;
      default:
        text = '';
    }
    this.setState({ texttitle: text });
    const nextPage = 1;
    const limit = 10;
    getProductListClass(classId, nextPage, limit).then(res => {
      if (res.data.data.products.length) {
        if (nextPage === res.data.data.pages) { // 说明当前页是最后一页，不显示加载更多
          this.setState({
            getMoreShow: false,
          });
        }
        this.setState({
          show: true,
          classList: res.data.data.products,
          allPages: res.data.data.pages,
        });
      } else {
        this.setState({
          show: false,
        });
      }
    });
  }

  addShopCart = item => {
    const newItem = Object.assign({}, item);
    newItem.productNumber = 1;
    this.props.handleAddCart(newItem);
    Toast.info('加入购物车成功', 1);
  }
  getmore = () => {
    const classId = this.props.match.params.id;
    const nextPage = this.state.currentPage + 1;
    const limit = 10;
    if (nextPage <= this.state.allPages) {
      getProductListClass(classId, nextPage, limit).then(res => {
        const nowAllProducts = this.state.classList.concat(res.data.data.products);
        this.setState({
          classList: nowAllProducts,
          currentPage: nextPage,
          allPages: res.data.data.pages,
        });
      });
      if (nextPage === this.state.allPages) { // 是否最后一页=>是
        this.setState({
          getMoreShow: false, // 不显示加载更多
        });
      }
    }
  }
  getMoreList(getMoreShow) {
    if (getMoreShow) {
      return (
        <div className="getMoreOrder"
          onClick={ () => this.getmore() }
        >加载更多</div>
      );
    }
  }

  render() {
    const states = this.state;
    const items = states.classList.map(item => {
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
                alt="分类商品"
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
    if (states.show) {
      return (
        <DocumentTitle title="分类商品">
          <div className="classProduct">
            <div className="about-title">
              <span onClick={ () => history.go(-1) }
                className="about-title-back"
              />
              <p className="about-title-name">{ this.state.texttitle }</p>
            </div>
            <div className="social-header">
              <p>
                <span className="hotsmalltitle">绿叶超市更懂你</span>
              </p>
            </div>
            <div className="allproducts">
              { items }
              <div className="clear" />
              {
                this.getMoreList(this.state.getMoreShow)
              }
            </div>
          </div>
        </DocumentTitle>
      );
    } return (
      <DocumentTitle title="搜索结果">
        <div className="nodata">
          <div className="about-title">
            <NavLink
              exact
              to="/"
            >
              <span className="about-title-back" />
            </NavLink>
            <p className="about-title-name">{ this.state.texttitle }</p>
          </div>
          <div className="social-header">
            <p>
              <span className="hotsmalltitle">绿叶超市更懂你</span>
            </p>
          </div>
          <div className="contentNoData">
            <img
              src={ require('../../../../images/nodata.png') }
              alt="暂无数据"
            />
            <p className="nodatetitle">暂无数据</p>
          </div>
        </div>
      </DocumentTitle>
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

export default connect(mapState, mapDispatch)(ClassificationProductPage);
