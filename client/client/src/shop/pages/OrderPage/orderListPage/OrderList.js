import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd-mobile';
import orderApi from '@/api/order';

const { alert } = Modal;
const handleClickButton = (text, data, that) => {
  let { status } = data;
  switch (text.key) {
    // 1、待付款 ---- 去付款 ----状态变为2（已付款）
    case 1:
      status = 2;
      orderApi.updateOrderStatus({ id: data.oid, status }).then(() => {
        that.props.history.push('/orderList?type=2');
        that.props.getData({ type: 2, page: 1, limit: 10 });
      });
      break;
    // 取消订单
    case 2:
      status = 5;
      orderApi.updateOrderStatus({ id: data.oid, status }).then(() => {
        that.props.history.push('/orderList?type=0');
        that.props.getData({ type: 0, page: 1, limit: 10 });
      });
      break;
    // 2、已付款 ---- 提醒发货 ----
    case 3:
      status = 8;
      orderApi.updateOrderStatus({ id: data.oid, status }).then(() => {
        that.props.history.push('/orderList?type=2');
        that.props.getData({ type: 2, page: 1, limit: 10 });
      });
      break;
    // 4、退款
    case 4:
      status = 7;
      orderApi.updateOrderStatus({ id: data.oid, status }).then(() => {
        that.props.history.push('/orderList?type=0');
        that.props.getData({ type: 0, page: 1, limit: 10 });
      });
      break;
    // 5、确认收货
    case 5:
      status = 4;
      orderApi.updateOrderStatus({ id: data.oid, status }).then(() => {
        that.props.history.push('/orderList?type=4');
        that.props.getData({ type: 4, page: 1, limit: 10 });
      });
      break;
    // 删除
    case 8:
      status = 6;
      orderApi.updateOrderStatus({ id: data.oid, status }).then(() => {
        that.props.history.push('/orderList?type=0');
        that.props.getData({ type: 0, page: 1, limit: 10 });
      });
      break;
    default:

  }
};
const handleTitle = key => {
  switch (key) {
    case 1:
      return '去付款';
    case 2:
      return '取消订单';
    case 3:
      return '提醒发货';
    case 5:
      return '确认收货';
    case 6:
      return '评价';
    case 7:
      return '联系卖家';
    case 8:
      return '删除';
    default:
  }
};

const showAlert = (text, data, that) => {
  if (text.key !== 4 && text.key !== 9) {
    const alertInstance = alert(
      handleTitle(text.key),
      text.key === 7 ? (
        '请拨打电话：18845632085'
      ) : text.key === 1 ? (
        <img
          className="pay-img"
          src={ require('../../../../images/payImg.jpeg') }
          style={ { width: '100%' } }
          alt="品质保障"
        />
      ) : (
        `确认${handleTitle(text.key)}吗`
      ),
      [
        {
          text: '取消',
          onPress: () => {},
          style: 'default',
        },
        {
          text: text.key === 1 ? '我已支付' : '确认',
          onPress: () => {
            handleClickButton(text, data, that);
          },
        },
      ]
    );

    setTimeout(() => {
      alertInstance.close();
    }, 500000);
  }
};
const linkToEvaluate = (item, text, data, props) => {
  props.history.push(`/evaluate?id=${data.oid}`);
  localStorage.setItem('evaluateOid', data.oid); // 存入 参数： 1.调用的值 2.所要存入的数据
  localStorage.setItem('evaluateProducts', JSON.stringify(item.products)); // 存入 参数： 1.调用的值 2.所要存入的数据
};
class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    };
  }

  STATUS_MAP = {
    0: '已删除',
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已失效',
  };

  ACTION_MAP = {
    // '去付款',  1
    // '取消订单'  2
    // 提醒发货'  3
    // '退款'  4
    // 确认收货' 5
    // '退款' 4
    // 评价', 6
    // '联系卖家' 7
    // 删除' 8
    1: [ { text: '去付款', key: 1 }, { text: '取消订单', key: 2 } ],
    2: [ { text: '提醒发货', key: 3 } ],
    3: [ { text: '确认收货', key: 5 } ],
    4: [ { text: '评价', key: 6 }, { text: '联系卖家', key: 7 } ],
    6: [ { text: '已评价', key: 10 }, { text: '联系卖家', key: 7 } ],
    5: [ { text: '删除', key: 8 } ],
    7: [ { text: '退款中', key: 4 } ],
    8: [ { text: '提醒发货中', key: 9 } ],
  };

  handleClick() {
    this.props.history.push('/evaluate');
  }

  render() {
    const { data } = this.props;
    const { ACTION_MAP, STATUS_MAP } = this;
    const Header = item => {
      let appraisalNum = 0;
      for (let i = 0; i < item.products.length; i++) {
        const element = item.products[i];
        appraisalNum += element.isAppraisal;
      }
      if (appraisalNum === item.products.length) {
        // 100随便起的，为了区分其他订单状态
        item.status = 100;
      }
      function checkRefunding(element) {
        return element.status === 2;
      }
      const Refunding = item.products.some(checkRefunding);
      function checkRefunded(element) {
        return element.status === 0;
      }
      const Refunded = item.products.every(checkRefunded);
      return (<div className="order-id-header">
        <span className="order-id">
        订单ID：
          { item.oid }
        </span>
        <span className="header-status">{ item.status === 100 ? '已评价' : item.status === 8 ? '待发货' : item.status === 7 && Refunding === true ? '退款中' : item.status === 7 && Refunded === true ? '退款成功' : STATUS_MAP[item.status] }</span>
      </div>);
    };

    const Main = item => (
      <ul>
        { item && item.products.map(i => (
          <li key={ i.pid }>
            <div className="order-item">
              <div>
                <div className="order-item-header">
                  <span className="header-name">{ i.title }</span>
                </div>
                <Link
                  to={ { pathname: '/orderDetail', search: `?id=${item.oid}` } }
                >
                  <div className="order-item-content">
                    <span className="content-img">
                      <img
                        src={ i.cover[0] }
                        width="150"
                        height="150"
                        alt="商品图片"
                      />
                    </span>
                    <div className="content-right">
                      <div className="content-title">
                        <span className="content-description">{ i.desc }</span>
                        <div className="price-container">
                          <div className="content-price">{ i.price }</div>
                          <div className="content-num">
×
                            { i.count }
                          </div>
                        </div>
                      </div>
                      <div className="exchange-description">七天无理由退换</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </li>
        )) }
      </ul>
    );

    const Action = (item, text, data) => {
      function checkRefunding(element) {
        return element.status === 2;
      }
      const Refunding = item.products.some(checkRefunding);
      function checkRefunded(element) {
        return element.status === 0;
      }
      const Refunded = item.products.every(checkRefunded);
      return (
        <Button
          type="ghost"
          inline
          size="small"
          style={ { marginRight: '4px' } }
          key={ text.key + data.status }
          className={ [ 'am-button-borderfix', (text.key === 9 || text.key === 10) ? 'method-is-grey' : '' ] }
          onClick={ () => (text.key === 6
            ? linkToEvaluate(item, text, data, this.props)
            : text.key === 10 ? '' : showAlert(text, data, this))
          }
        >
          { data.status === 7 && Refunding === true ? '退款中' : data.status === 7 && Refunded === true ? '退款成功' : text.text }
        </Button>
      );

    };

    const Footer = item => {
      let totalCount = 0;
      item.products.forEach(e => {
        totalCount += e.count;
      });
      item.totalCount = totalCount;
      return (
        <div className="order-item-footer">
          <div className="total-box">
            <span className="total-text">共{ item.totalCount }件商品 合计:</span>
            <span className="totalprice">
              <span>￥</span>
              { item.sale }
            </span>
          </div>
          <div className="footer-operate">
            { item.products[0] && item.products[0].isAppraisal === 1 ? (ACTION_MAP[6] && ACTION_MAP[6].map(text => Action(item, text, { oid: item.oid, status: item.status }))) : (ACTION_MAP[item.status] && ACTION_MAP[item.status].map(text => Action(item, text, { oid: item.oid, status: item.status }))) }
          </div>
        </div>
      );
    };

    return (
      <ul className="order-list">
        { data.map(item => (
          <li
            key={ item.oid }
            className="order-list-item"
          >
            { Header(item) }
            { Main(item) }
            { Footer(item) }
          </li>
        )) }
      </ul>
    );
  }
}

export default withRouter(OrderList);
