import React, { Component } from 'react';
import './SubmitOrderPage.less';
import '../common.less';
import { NavLink } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Address from './Address';
import OrderListItem from './OrderListItem';
import Discount from './Discount';
import creatHistory from 'history/createHashHistory'; // 返回上一页这段代码
import queryString from 'query-string';

class SubmitOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {},
      price: 0,
    };
  }
  componentDidMount() {
    // 判断有无token 没有则跳转的登录页
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }
  }
  getAddress(data) {
    this.setState(state => {
      state.address = data;
    });
  }

  getPrice(data) {
    this.setState(state => {
      state.price = data;
    });
  }

  render() {
    const string = queryString.parse(this.props.history.location.search).flag;
    const history = creatHistory();
    return (
      <DocumentTitle title="提交订单">
        <div>
          <div className="header-title">
            <span className="header-title-back"
              onClick={ () => history.goBack() }
            />
            <p className="header-title-name">提交订单</p>
          </div>
          <div
            style={ {
              marginTop: '1.05rem',
            } }
          >
            { /* <NavLink to="/addressList?from=order"> */ }
            <NavLink to={ string ? '/addressList?from=order&flag=1' : '/addressList?from=order' }>
              <Address parentGetAddress={ this.getAddress.bind(this) } />
            </NavLink>
            <OrderListItem parentGetTotalPrice={ this.getPrice.bind(this) } />
            <Discount orderInfo={ this.state } />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default SubmitOrderPage;
