import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Badge, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSearchProduct } from '@/api/product';
import './searchresult.less';

class SearchResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultList: [],
      show: true,
      currentPage: 1,
      allPages: 1,
      getMoreShow: true,
    };
  }

  componentDidMount() {
    if (!this.props.match.params.title) {
      this.setState({
        show: false,
      });
    } else {
      const searchContent = this.props.match.params.title;
      const nextPage = 1;
      const limit = 10;
      getSearchProduct(searchContent, nextPage, limit).then(res => {
        if (res.data.data.products.length) {
          if (nextPage === res.data.data.pages) { // 说明当前页是最后一页，不显示加载更多
            this.setState({
              getMoreShow: false,
            });
          }
          this.setState({
            show: true,
            searchResultList: res.data.data.products,
            allPages: res.data.data.pages,
          });
        } else {
          this.setState({
            show: false,
          });
        }
      });
    }
  }
  getmore = () => {
    const searchContent = this.props.match.params.title;
    const nextPage = this.state.currentPage + 1;
    const limit = 10;
    if (nextPage <= this.state.allPages) {
      getSearchProduct(searchContent, nextPage, limit).then(res => {
        const nowAllProducts = this.state.searchResultList.concat(res.data.data.products);
        this.setState({
          searchResultList: nowAllProducts,
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

  addShopCart = item => {
    const newItem = Object.assign({}, item);
    newItem.productNumber = 1;
    this.props.handleAddCart(newItem);
    Toast.info('加入购物车成功', 1);
  }

  render() {
    const states = this.state;
    const items = states.searchResultList.map(item => {
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
                alt="搜索商品"
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
        <DocumentTitle title="搜索结果">
          <div className="searchResult">
            <div className="about-title">
              <NavLink
                exact
                to="/"
              >
                <span className="about-title-back" />
              </NavLink>
              <p className="about-title-name">搜索结果</p>
            </div>
            <div className="social-header">
              <p>
                <span className="hottitle">搜索结果：</span>
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
        <div className="nodata1">
          <div className="about-title">
            <NavLink
              exact
              to="/"
            >
              <span className="about-title-back" />
            </NavLink>
            <p className="about-title-name">搜索结果</p>
          </div>
          <img
            src={ require('../../../../images/nodata.png') }
            alt="暂无数据"
          />
          <p className="noSearchData">暂无数据</p>
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

export default connect(mapState, mapDispatch)(SearchResultPage);
