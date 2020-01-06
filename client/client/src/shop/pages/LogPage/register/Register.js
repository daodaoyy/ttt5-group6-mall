import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import './Register.less';
import userApi from '@/api/user';

class register extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    this.state = {
      phoneValue: '', // 记录手机号的值
      passwordValue: '', // 记录密码的值
      identify: '', // 记录验证码,
      opacity: false, // 错误信息展示开关
      identifyMsg: '获取验证码', // 验证码已发送提示
      message: '', // 记录错误信息
      clickDisabled: false, // 控制验证码按钮状态
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

  // 点击获取验证码
  getIdentify = () => {
    const rePhone = /^[1][3,4,5,7,8][0-9]{9}$/; // 判断电话号码的正则
    const item = { ...this.state };
    if (!rePhone.test(item.phoneValue)) {
      this.setState({
        opacity: true,
        message: '手机号格式不正确',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else {
      const params = {
        phone: item.phoneValue,
      };
      // 前端验证信息格式无误则调取获取验证码的 api
      userApi.getUserIdentify(params).then(res => {
        const that = this;
        if (res.status === 200) {
          let time = 60;
          const set = setInterval(() => {
            that.setState({
              identifyMsg: `${time -= 1}s已发送`,
              clickDisabled: true,
            });
          }, 1000);
          setTimeout(() => {
            that.setState({
              identifyMsg: '获取验证码',
              clickDisabled: false,
            });
            clearInterval(set);
          }, 60000);
        }
      });
    }
  };

  // 实时更新绑定的验证码值
  onChangeIdentify = event => {
    this.setState({
      identify: event.target.value,
    });
  };

  // 点击注册提交注册信息
  postInput = () => {
    const item = { ...this.state };
    const params = {
      phone: item.phoneValue,
      password: item.passwordValue,
      code: parseInt(item.identify, 10),
    };
    userApi.postUserInfo(params).then(res => {
      if (res.data.status === 200) {
        Toast.success('注册成功', 2);
        setTimeout(() => {
          this.props.history.push('/login'); // 注册成功后跳转登录页
        }, 1000);
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
      <div className="register">
        <NavLink to="login">
          <div className="register-back-icon" />
        </NavLink>
        <div className="register-form">
          <input
            type="register-phone"
            className="register-form-phone"
            placeholder="请输入手机号"
            onBlur={ this.onChangePhone }
          />
          <input
            type="password"
            className="register-form-password"
            placeholder="6-16位数字或字母"
            onBlur={ this.onChangePassword }
          />
          <div className="register-identify">
            <input
              type="password"
              className="register-form-identify"
              placeholder="输入验证码"
              onBlur={ this.onChangeIdentify }
            />
            <button
              className="register-get-identify"
              type="button"
              onClick={ this.getIdentify }
              disabled={ item.clickDisabled }
            >
              { item.identifyMsg }
            </button>
          </div>
          <span
            className="register-error-msg"
            style={ styleDisplay }
          >
            { item.message }
          </span>
          <button
            className="register-submit"
            type="button"
            onClick={ this.postInput }
          >
            注册
          </button>
          <div className="register-footer">
            <button
              className="login-tag"
              type="button"
            >
              已有账号？&nbsp;&nbsp;|
            </button>
            <NavLink to="login">
              <button
                className="to-login"
                type="button"
              >
                直接登陆
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default register;
