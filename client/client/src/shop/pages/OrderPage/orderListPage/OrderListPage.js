import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './OrderListPage.less';
import '../common.less';
import { Tabs, Badge } from 'antd-mobile';
import { NavLink } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import queryString from 'query-string';
import Footer from '../Footer/Footer';
import OrderListItem from './OrderListItem';
import { getOrderListData } from '@/api/order';

class OrderListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: parseInt(queryString.parse(this.props.location.search).type, 10)
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.history.listen(() => {
      this._isMounted && this.setState({ data: [] });
    });
    // 判断有无token 没有则跳转的登录页
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    } else {
      this.getData({ type: this.state.type * 1, page: 1, limit: 10 });
    }
  }

  componentDidUpdate(prevPros, prevState) {
    if (parseInt(queryString.parse(this.props.location.search).type, 10) !== prevState.type) {
      /* eslint-disable */
      this.setState({ type: parseInt(queryString.parse(this.props.location.search).type, 10) }); 
      /* eslint-enable */
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  _isMounted = false;

  getData = params => {
    getOrderListData(
      isNaN(params.type) ? { type: 0, page: params.page, limit: 10 } : params
    ).then(res => {
      this.setState({ page: res.data.data.page });
      this.setState({ pages: res.data.data.pages });
      this.setState(state => {
        return { data: state.data.concat(res.data.data.data) };
      });
    });
  };
  tabs = [
    { title: <Badge>全部</Badge> },
    { title: <Badge>待付款</Badge> },
    { title: <Badge>待发货</Badge> },
    { title: <Badge>待收货</Badge> },
    { title: <Badge>已完成</Badge> }
  ];

  getTabsType = (index) => {
    this.setState({ type: index });
    this.setState({
      orderStatus: index
    });
    this.setState({
      data: []
    });
    this.setState({
      page: 1
    });
    this.props.history.push(`/orderList?type=${index}`);
    this.getData({ type: index, page: 1, limit: 10 });
  }

  render() {
    const { tabs } = this;
    const { orderStatus, page, pages, type } = this.state;
    const hash = {};
    const data = this.state.data.reduce((preVal, curVal) => {
      hash[curVal.oid] ? '' : (hash[curVal.oid] = true && preVal.push(curVal));
      return preVal;
    }, []);
    const OrderList = (
      <div>
        <Tabs
          tabs={ tabs }
          initialPage={ type }
          page={ type }
          onChange={ (tab, index) => {
            this.getTabsType(index);
          } }
        >
          <div>
            <OrderListItem
              getData={ this.getData }
              orderStatus={ orderStatus }
              data={ data }
              page={ page }
              pages={ pages }
              getTabsType={ this.getTabsType }
            />
          </div>
        </Tabs>
      </div>
    );

    return (
      <DocumentTitle title="我的订单">
        <div className="order">
          <div className="header-title">
            <NavLink to="/">
              <span className="header-title-back" />
            </NavLink>
            <p className="header-title-name">订单列表</p>
          </div>
          <div
            style={ {
              marginTop: '1.8rem'
            } }
          >
            { OrderList }
            <Footer />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default withRouter(OrderListPage);
