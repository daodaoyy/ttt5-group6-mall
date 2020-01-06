import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { NavLink } from 'react-router-dom';
import { getActivityDetail } from '@/api/product';
import './activity.less';

class ActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityId: this.props.match.params.id,
      aboutActivity: {
        detail: '',
      },
      activityProducts: [],
    };
  }

  componentDidMount() {
    getActivityDetail(this.state.activityId).then(res => {
      this.setState({
        activityProducts: res.data.data.productList,
        aboutActivity: res.data.data.aInfo,
      });
    });
  }

  buyNow = item => {
    const newItem = Object.assign({}, item);
    newItem.productNumber = 1;
    window.localStorage.setItem('buyNow', JSON.stringify(newItem));
  }

  render() {
    const states = this.state;
    const items = states.activityProducts.map(item => {
      const productDetailId = `/productDetail/${item.id}`;
      return (
        <NavLink
          to={ productDetailId }
          key={ item.id }
        >
          <li className="everyProduct">
            <div className="cartPic">
              <img
                src={ item.cover[0] }
                width="99%"
                height="99%"
                alt="商品图片"
              />
            </div>
            <div className="cartContent">
              <div className="descriptionPro">
                <span>{ item.title }</span>
              </div>
              <div className="edit">
                <div className="price">
                  <i>￥</i>
                  { item.price }
                </div>
                <div className="editnum">
                  <span>
                    已售
                    { item.count }
                    件
                  </span>
                </div>
                <div className="deletePro">
                  <NavLink
                    exact
                    to="/submitOrder/?flag=1"
                    onClick={ () => this.buyNow(item) }
                  >
                    <div className="buyNow">
                      马上抢
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </li>
        </NavLink>
      );
    });
    return (
      <DocumentTitle title="活动">
        <div className="activityProduct">
          <div className="about-title">
            <NavLink
              exact
              to="/"
            >
              <span className="about-title-back" />
            </NavLink>
            <p className="about-title-name">活动</p>
          </div>
          <div className="aboutActivity">
            <img
              src={ states.aboutActivity.detail }
              width="100%"
              alt="活动描述"
            />
          </div>
          { /* <div className="social-header">
            <p>
              <span className="hottitle">活动进行中……</span>
            </p>
          </div> */ }
          <div className="allproducts">
            <ul className="activityList">
              { items }
            </ul>
            <div className="clear" />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default ActivityPage;
