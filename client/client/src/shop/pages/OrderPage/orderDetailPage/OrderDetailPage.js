import React, { Component } from 'react';
import './OrderDetailPage.less';
import '../common.less';
import { getOrderDetail } from '@/api/order';
import queryString from 'query-string';
import { Toast } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import OrderDetail from './OrderDetail';
import creatHistory from 'history/createHashHistory'; // 返回上一页这段代码

class OrderDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    // 判断有无token 没有则跳转的登录页
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    } else {
      const type = queryString.parse(this.props.location.search);
      this.getOrderDetailFun(type.id);
    }
  }
  getOrderDetailFun = (data) => {
    getOrderDetail(data).then(res => {
      this.setState({ data: res.data });
    });
  }

  loadingToast = () => {
    Toast.loading('Loading...', 1, () => {
    });
  }

  render() {
    const orderDetail = this.state.data.data ? this.state.data.data : {};
    const history = creatHistory();// 返回上一页这段代码
    return (
      <DocumentTitle title="订单详情">
        <div className="order-detail">
          <div className="header-title">
            <span className="header-title-back"
              onClick={ () => history.goBack() }
            />
            <p className="header-title-name">订单详情</p>
          </div>
          <div
            style={ {
              marginTop: '1.05rem',
            } }
          >
            { orderDetail ? orderDetail.createTime ?
              <OrderDetail getOrderDetailFun={ this.getOrderDetailFun }
                data={ orderDetail }
              /> : '' : <loadingToast /> }
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default OrderDetailPage;
