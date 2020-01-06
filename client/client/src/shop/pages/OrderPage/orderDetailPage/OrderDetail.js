import React, { Component } from 'react';
import { Modal, Button, WhiteSpace, Toast } from 'antd-mobile';
import '../common.less';
import orderApi from '@/api/order';
import { getOrderDetail } from '@/api/order';

const { alert } = Modal;
const refund = (oid, params, getOrderDetailFun) => {
  orderApi.putProductStatus(oid, params);
  getOrderDetail(oid).then(res => {
    if (res.data.status === 200) {
      Toast.success('成功', 2);
      getOrderDetailFun(oid);
    } else {
      Toast.fail('失败', 2);
    }
  });
};
const showAlert = (oid, item, getOrderDetailFun) => {
  if (item.status === 1) {
    const alertInstance = alert('退款', '确认申请退款吗', [
      { text: '取消', onPress: () => {}, style: 'default' },
      { text: '确认', onPress: () => refund(oid, { pid: item.pid }, getOrderDetailFun) },
    ]);
    setTimeout(() => {
      alertInstance.close();
    }, 500000);
  }
};

const showConnect = () => {
  const alertInstance = alert('联系卖家', '请拨打电话：18845632085', [
    { text: '取消', onPress: () =>{} },
    { text: '确认', onPress: () =>{} },
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    alertInstance.close();
  }, 500000);
};

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const orderData = this.props.data;
    this.judgeOrderAppraisal(orderData);
  }
  timeFormat = (time)=> {
    const d = new Date(time);
    const year = d.getFullYear(); // 年
    const month = d.getMonth() + 1; // 月
    const day = d.getDate(); // 日
    const hh = d.getHours(); // 时
    const mm = d.getMinutes(); // 分
    const ss = d.getSeconds(); // 秒
    let clock = `${year}-`;
    if (month < 10) clock += '0';
    clock += `${month}-`;
    if (day < 10) clock += '0';
    clock += `${day} `;
    if (hh < 10) clock += '0';
    clock += `${hh}:`;
    if (mm < 10) clock += '0';
    clock += `${mm}:`;
    if (ss < 10) clock += '0';
    clock += ss;
    return clock;
  }
  judgeOrderAppraisal(orderData) {
    if (orderData) {
      let appraisalNum = 0;
      for (let i = 0; i < orderData.products.length; i++) {
        const element = orderData.products[i];
        appraisalNum += element.isAppraisal;
      }
      if (appraisalNum === orderData.products.length) {
        orderData.status = 100;
      }
    }
  }
  render() {
    const getOrderDetailFun = this.props.getOrderDetailFun;
    const orderData = this.props.data;
    const createTime = this.timeFormat(orderData.createTime);
    const updateTime = this.timeFormat(orderData.updateTime);
    this.judgeOrderAppraisal(orderData);
    function checkRefunding(data) {
      return data.status === 2;
    }
    const Refunding = orderData.products.some(checkRefunding);
    function checkRefunded(data) {
      return data.status === 0;
    }
    // const partRefunding =
    const Refunded = orderData.products.every(checkRefunded);
    return (
      <div>
        <div className="status-bar">
          <span className="status">
            { orderData.status === 0
              ? '已删除'
              : orderData.status === 1
                ? '待付款'
                : orderData.status === 2 || orderData.status === 8
                  ? '待发货'
                  : orderData.status === 3
                    ? '待收货'
                    : orderData.status === 4
                      ? '待评价'
                      : orderData.status === 100
                        ? '已评价'
                        : orderData.status === 7 && Refunding === true
                          ? '退款中'
                          : orderData.status === 7 && Refunded === true
                            ? '退款成功'
                            : '已失效' }
          </span>
        </div>
        <div>
          <div className="address-container">
            <div className="address-img">
              <img
                src={ require('@/images/order_address.png') }
                width="70"
                height="60"
                alt="地址图片"
              />
            </div>
            <div className="address-info">
              <div className="address-info-title">
                <div className="info-name">{ orderData.name }</div>
                <div className="info-phone">{ orderData.phone }</div>
              </div>
              <div className="address">{ orderData.address }</div>
            </div>
          </div>
          <WhiteSpace size="lg" />
        </div>
        <div className="order-container">
          <ul className="order-list">
            { orderData.products
              && orderData.products.map(item => (
                <li
                  key={ item.pid }
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
                              { item.count }
                            </div>
                          </div>
                        </div>
                        <div className="exchange-description">七天无理由退换</div>
                      </div>
                    </div>
                    <div className="order-item-footer">
                      <div className="footer-operate">
                        { orderData.status === 1
                          ? ''
                          :
                          <Button
                            type="ghost"
                            inline
                            size="small"
                            style={ { marginRight: '4px' } }
                            className="am-button-borderfix"
                            onClick={ () => showAlert(orderData.oid, item, getOrderDetailFun) }
                          >
                            { item.status === 1
                              ? '退款'
                              : item.status === 2
                                ? '退款中'
                                : '退款完成' }
                          </Button> }
                      </div>
                    </div>
                  </div>
                </li>
              )) }
          </ul>
          { /* <PriceDetail /> */ }
          <div className="price-box">
            <div className="integral container-flex">
              <span className="integral-text">积分抵扣</span>
              <span className="integral-discount">
              -￥
                { orderData.score / 100 }
              </span>
            </div>
            <div className="price container-flex">
              <span className="price-text">实付款</span>
              <span className="price-detail">
              ￥
                { orderData.sale }
              </span>
            </div>
          </div>
          <WhiteSpace size="lg" />
        </div>
        <div className="order-info container">
          <div className="order-title">
            <span
              style={ {
                color: '#3cbc34',
                marginRight: '5px',
              } }
            >
              |
            </span>
            订单信息
          </div>
          <div className="order-content">
            <div className="order-row">
              <span className="order-text">订单编号：</span>
              <span className="order-text">{ orderData.oid }</span>
            </div>
            <div className="order-row">
              <span className="order-text">下单时间：</span>
              <span className="order-text">{ createTime }</span>
            </div>
            <div className="order-row">
              <span className="order-text">发货时间：</span>
              <span className="order-text">{ updateTime }</span>
            </div>
          </div>
        </div>
        <WhiteSpace size="lg" />
        <div
          className="contact-seller container"
          onClick={ showConnect }
        >
          <img
            src={ require('@/images/order_phone.png') }
            width="50"
            height="50"
            alt="联系卖家"
          />
          <span className="contact-text">联系卖家</span>
        </div>
      </div>
    );
  }

}

export default OrderDetail;
