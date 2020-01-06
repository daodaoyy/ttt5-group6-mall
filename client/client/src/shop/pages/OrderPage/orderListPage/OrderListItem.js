import React, { Component } from 'react';
import OrderList from './OrderList';
import queryString from 'query-string';

class OrderListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  getMore() {
    const type = queryString.parse(this.props.location && this.props.location.search);
    this.props.getData({ type: type.type * 1, page: this.props.page + 1, limit: 10 });
  }
  render() {
    // 判断路由
    const orderList = this.props.data ? this.props.data : [];
    const OrderListContainer = () => {
      if (orderList.length === 0) {
        return (
          <div style={ {
            textAlign: 'center',
            marginTop: '50px',
          } }
          >
暂无订单
          </div>
        );
      }
      return (
        <div>
          <OrderList getData={ this.props.getData }
            data={ orderList }
            getTabsType={ this.props.getTabsType }
          />
          { this.props.page === this.props.pages
            ? ''
            :
            <div className="getMoreOrder"
              onClick={ () => this.getMore() }
            >加载更多</div> }
        </div>
      );

    };
    return (
      <div>
        <OrderListContainer />
      </div>
    );
  }
}
export default OrderListItem;
