import React, { Component } from 'react';
import { Modal, List, Radio, InputItem, Toast, Button } from 'antd-mobile';
import userApi from '@/api/user';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import orderApi from '@/api/order';
import queryString from 'query-string';

const { RadioItem } = Radio;
class Discount extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值

    // 定义数据
    this.state = {
      value: 1,
      hasError: false,
      integral: '',
      data: {}
    };
  }

  componentDidMount() {
    userApi.getUserScore().then(res => {
      if (res.data.status === 403 || res.data.status === 401) {
        this.props.history.push('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('phone');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('sign');
        localStorage.removeItem('addressList');
        localStorage.removeItem('oneAddress');
        localStorage.removeItem('newBirthday');
        localStorage.removeItem('newSex');
      } else {
        this.setState({ userInfo: res.data.data });
        this.bestDiscount();
      }
    });
  }

  LEVEL_MAP = {
    1: 10,
    2: 9.9,
    3: 9.8,
    4: 9.5,
    5: 9.2,
    6: 9,
    7: 8.8
  };
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('输入有误');
    }
  };

  onIntegralChange = integral => {
    if (integral >= 0) {
      this.setState({ value: '' });
      this.setState({ method: '积分' });
    } else {
      this.setState({
        hasError: false
      });
    }
    this.setState({
      integral
    });
  };

  onChange = value => {
    this.setState({ integral: '' });
    this.setState({ method: '等级' });
    this.setState({
      value
    });
  };

  bestDiscount = () => {
    const string = queryString.parse(this.props.history.location.search).flag;
    const cartList = [];
    let totalPrice = 0;
    let totalNumber = 0;
    const { userInfo } = this.state;
    if (string === '1') {
      const result = JSON.parse(localStorage.getItem('buyNow'));
      cartList.push(result);
      cartList.forEach(e => {
        totalPrice += e.productNumber * e.price;
        totalNumber += e.productNumber;
      });
    } else {
      const orderInfo = this.props.cartList;
      orderInfo.forEach(e => {
        totalPrice += e.productNumber * e.price;
        totalNumber += e.productNumber;
      });
    }
    this.setState({ totalPrice });
    this.setState({ totalNumber });
    // 积分
    let integralDiscount;
    let countNum;
    if (userInfo.score / 100 > totalPrice) {
      integralDiscount = 0;
      countNum = totalPrice * 100;
    } else {
      integralDiscount = totalPrice - userInfo.score / 100;
      countNum = userInfo.score;
    }
    // 等级
    const levelDiscount =
      Math.round((this.LEVEL_MAP[userInfo.level] / 10) * totalPrice * 100) /
      100;
    if (integralDiscount < levelDiscount) {
      this.setState({ method: '积分' });
      this.setState({ integral: countNum });
    } else {
      this.setState({ method: '等级' });
      this.setState({ value: 0 });
      this.setState({ integral: '' });
    }
  };

  postOrderList = () => {
    const cartList = this.props.orderInfo.price;
    let totalPrice = 0;
    cartList.forEach(e => {
      totalPrice += e.productNumber * e.price;
    });
    const { alert } = Modal;
    if (this.state.method === '积分') {
      if (this.state.integral / 100 > totalPrice) {
        alert('积分超过商品总价');
      } else if (this.state.integral > this.state.userInfo.score) {
        alert('积分不足');
      } else {
        const score = this.state.integral;
        const discount = 0;
        if (!this.props.orderInfo.address) {
          alert('请填写地址');
        } else {
          cartList.forEach(e => {
            e.count = e.productNumber;
          });
          const submitOrderInfo = {
            address:
              this.props.orderInfo.address &&
              this.props.orderInfo.address.address,
            name:
              this.props.orderInfo.address && this.props.orderInfo.address.name,
            phone:
              this.props.orderInfo.address &&
              this.props.orderInfo.address.phone,
            score,
            discount,
            products: cartList
          };
          orderApi.postOrder(submitOrderInfo).then(res => {
            if (res.data.status === 200) {
              const alertInstance = alert(
                <img
                  className="pay-img"
                  src={ require('../../../../images/payImg.jpeg') }
                  style={ { width: '100%' } }
                  alt="品质保障"
                />,
                '',
                [
                  {
                    text: '取消',
                    onPress: () => this.props.history.push('/orderList?type=1'),
                    style: 'default'
                  },
                  {
                    text: '我已支付',
                    onPress: () => {
                      orderApi.updateOrderStatus({
                        id: res.data.data.oid,
                        status: 2
                      });
                      this.props.history.push('/orderList?type=2');
                    }
                  }
                ]
              );
              setTimeout(() => {
                // 可以调用close方法以在外部close
                alertInstance.close();
              }, 500000);
              //  积分支付，清空购物车
              const string = queryString.parse(
                this.props.history.location.search
              ).flag;
              if (string === '1') {
                // 清空ls
                localStorage.removeItem('buyNow');
              } else {
                // 清空redux
                const emptyArr = [];
                this.props.emptyShopCart(emptyArr);
              }
            } else if (res.data.status === 500) {
              const alertInstance = alert(`${res.data.message}`, '', [
                { text: '确认', onPress: () => {} }
              ]);
              setTimeout(() => {
                // 可以调用close方法以在外部close
                alertInstance.close();
              }, 500000);
            }
          });
        }
      }
    } else {
      const score = 0;
      const discount = this.LEVEL_MAP[this.state.userInfo.level] * 10;
      if (!this.props.orderInfo.address) {
        alert('请填写地址');
      } else {
        cartList.forEach(e => {
          e.count = e.productNumber;
        });
        const submitOrderInfo = {
          address:
            this.props.orderInfo.address &&
            this.props.orderInfo.address.address,
          name:
            this.props.orderInfo.address && this.props.orderInfo.address.name,
          phone:
            this.props.orderInfo.address && this.props.orderInfo.address.phone,
          score,
          discount,
          products: cartList
        };
        orderApi.postOrder(submitOrderInfo).then(res => {
          if (res.data.status === 200) {
            const alertInstance = alert(
              <img
                className="pay-img"
                src={ require('../../../../images/payImg.jpeg') }
                style={ { width: '100%' } }
                alt="品质保障"
              />,
              '',
              [
                {
                  text: '取消',
                  onPress: () => this.props.history.push('/orderList?type=1'),
                  style: 'default'
                },
                {
                  text: '我已支付',
                  onPress: () => {
                    orderApi.updateOrderStatus({
                      id: res.data.data.oid,
                      status: 2
                    });
                    this.props.history.push('/orderList?type=2');
                  }
                }
              ]
            );
            setTimeout(() => {
              // 可以调用close方法以在外部close
              alertInstance.close();
            }, 500000);
            // localStorage.removeItem('shopCart');
            // 等级支付， 清空
            const string = queryString.parse(this.props.history.location.search)
              .flag;
            if (string === '1') {
              // 清空ls
              localStorage.removeItem('buyNow');
            } else {
              // 清空redux
              const emptyArr = [];
              this.props.emptyShopCart(emptyArr);
            }
          } else if (res.data.status === 500) {
            const alertInstance = alert(`${res.data.message}`, '', [
              { text: '确认', onPress: () => {} }
            ]);
            setTimeout(() => {
              // 可以调用close方法以在外部close
              alertInstance.close();
            }, 500000);
          }
        });
      }
    }
  };

  render() {
    const integralDiscount = (
      (this.state && this.state.totalPrice) * 1 -
      (this.state.integral / 100) * 1
    ).toFixed(2);
    // 等级
    const levelDiscount =
      Math.round(
        (this.LEVEL_MAP[this.state.userInfo && this.state.userInfo.level] /
          10) *
          this.state.totalPrice *
          100
      ) / 100;
    const { value } = this.state;
    const data = [
      {
        value: 0,
        label: `等级折扣${
          this.state.method === '等级'
            ? this.LEVEL_MAP[
              this.state.userInfo && this.state.userInfo.level
            ] === 10
              ? '不打折'
              : `,(推荐Level${this.state.userInfo &&
                  this.state.userInfo.level},打${
                this.LEVEL_MAP[
                  this.state.userInfo && this.state.userInfo.level
                ]
              }折)`
            : ''
        }`
      }
    ];
    return (
      <div>
        <List>
          <InputItem
            type="money"
            placeholder="请输入抵扣积分"
            error={ this.state.hasError }
            onErrorClick={ this.onErrorClick }
            onChange={ this.onIntegralChange }
            value={
              this.state.integral / 100 > this.state.totalPrice
                ? this.state.totalPrice * 100
                : this.state.integral
            }
            className={ this.state.method === '积分' ? 'method-is-green' : '' }
          >
            积分抵扣
            <span className="integral-desc">
              { this.state.method === '积分'
                ? `(推荐积分抵扣，可用积分为${this.state.userInfo &&
                    this.state.userInfo.score})`
                : '' }
            </span>
          </InputItem>
          { data.map(i => (
            <RadioItem
              key={ 0 }
              checked={ value === i.value }
              onChange={ () => this.onChange(i.value) }
              className={ this.state.method === '等级' ? 'method-is-green' : '' }
            >
              { i.label }
            </RadioItem>
          )) }
        </List>
        <div className="total-price-container total-price-footer">
          <span className="num">
            共{ this.state.totalNumber }
            件，
          </span>
          <span className="total">合计：</span>
          <span className="total-price final-price">
            ￥{ this.state.method === '积分' ? integralDiscount : levelDiscount }
          </span>
          <Button
            type="primary"
            inline
            size="small"
            style={ { marginRight: '4px' } }
            disabled={ this.state.hasError }
            onClick={ () => {
              this.postOrderList();
            } }
          >
            提交订单
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  cartList: state.shopCartList.payload // 获取到的购物车数组
});
const mapDispatch = dispatch => ({
  emptyShopCart(emptyArr) {
    dispatch({
      type: 'EMPTY_SHOPCART',
      payload: emptyArr
    });
  }
});

export default connect(
  mapState,
  mapDispatch
)(withRouter(Discount));
