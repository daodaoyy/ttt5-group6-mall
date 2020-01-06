import React, { Component } from 'react';
import { getshopCart } from '@/api/product';
import './SignIn.less';
import { Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import userApi from '@/api/user';

class SignIn extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值

    // 定义数据
    this.state = {
      phoneValue: '', // 记录手机号的值
      passwordValue: '', // 记录密码的值
      opacity: false, // 错误信息展示开关
      message: '', // 记录错误信息
    };
  }

  // 实时更新绑定的电话号码值
  onChangePhone = event => {
    this.setState({
      phoneValue: event.target.value,
    });
  };

  // 实时更新绑定的密码值
  onChangePassword = event => {
    this.setState({
      passwordValue: event.target.value,
    });
  };

  // 取消登录返回到首页
  goHome = () => {
    this.props.history.push('/');
  };

  // 点击登录按钮
  getInput = () => {
    const item = { ...this.state };
    const params = {
      phone: item.phoneValue,
      password: item.passwordValue,
    };
    // post登录信息
    userApi.loginUserInfo(params).then(res => {
      if (res.data.status === 200) {
        localStorage.setItem('token', res.data.data.token); // 保存token
        localStorage.setItem('phone', res.data.data.info.phone);
        this.props.history.push('/');
        getshopCart().then(res => {
          if (res.data.status !== 200) { // 未登录：从localstorage中获取
          } else if (res.data.status === 200) { // 已登录：从后台获取
            // console.log('已经登录');
            const arr = res.data.data.products;
            const newShopCart = [];
            arr.forEach(element => {
              const newobj = Object.assign(element, { productNumber: element.count });
              newShopCart.push(newobj);
            });
            this.props.getShopCartAfterLogin(newShopCart); // 存进store
          }
        });
      } else {
        this.setState({
          opacity: true,
          message: res.data.message,
        });
        setTimeout(() => {
          this.setState({
            opacity: false,
          });
        }, 2000);
      }
    });
  };

  render() {
    const item = { ...this.state };
    const styleDisplay = {
      opacity: item.opacity ? 1 : 0,
    };
    return (
      <div className="login">
        <span className="login-app-title">绿叶</span>
        <Icon
          type="cross"
          className="login-cross"
          onClick={ this.goHome }
        />
        <div className="login-bg-float">
          <div className="login-layer" />
          <div className="login-bg-img" />
        </div>
        <div className="login-form">
          <input
            type="phone"
            className="login-form-phone"
            placeholder="请输入手机号"
            onBlur={ this.onChangePhone }
          />
          <input
            type="password"
            className="login-form-password"
            placeholder="6-16位数字或字母"
            onBlur={ this.onChangePassword }
          />
          <span
            className="login-error-msg"
            style={ styleDisplay }
          >
            { item.message }
          </span>
          <button
            className="login-submit"
            type="button"
            onClick={ this.getInput }
          >
            登录
          </button>
          <div className="login-footer">
            <NavLink to="/register">
              <button
                className="to-register"
                type="button"
              >
                用户注册&nbsp;&nbsp;|
              </button>
            </NavLink>
            <NavLink to="forgetPass">
              <button
                className="forget-pass"
                type="button"
              >
                忘记密码
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  cartList: state.shopCartList.payload,
  len: state.shopCartList.payload.length,
});

const mapDispatch = dispatch => ({ // dispatch
  getShopCartAfterLogin(newShopCart) { // 购物车数量=>减
    dispatch(
      {
        type: 'GET_SHOPCART',
        payload: newShopCart,
      }
    );
  },
});

export default connect(mapState, mapDispatch)(SignIn);
