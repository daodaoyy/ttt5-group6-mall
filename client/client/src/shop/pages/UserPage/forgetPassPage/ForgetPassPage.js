import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import './ForgetPassPage.less';
import userApi from '@/api/user';

class ForgetPassPage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    this.state = {
      phoneValue: '', // 记录手机号的值
      passwordValue: '', // 记录密码的值
      identify: '', // 记录验证码
      identifyMsg: '获取验证码', // 验证码已发送提示
      clickDisabled: false, // 控制验证码按钮状态
      message: '', // 记录错误信息
    };
  }

  // 实时更新保存账号信息
  onChangePhone = event => {
    this.setState({
      phoneValue: event.target.value,
    });
  };

  // 实时更新保存密码信息
  onChangePassword = event => {
    this.setState({
      passwordValue: event.target.value,
    });
  };

  // 点击获取验证码
  getIdentify = () => {
    const rePhone = /^[1][3,4,5,7,8][0-9]{9}$/;
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
      // 判断信息无误调取获取验证码 api
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

  // 实时更新保存验证码
  onChangeIdentify = event => {
    this.setState({
      identify: event.target.value,
    });
  };

  // 点击提交忘记密码信息
  postInput = () => {
    const item = { ...this.state };
    const params = {
      phone: item.phoneValue,
      password: item.passwordValue,
      code: parseInt(item.identify, 10),
    };
    userApi.fogetUserInfo(params).then(res => {
      if (res.data.status === 200) {
        Toast.success('找回成功', 2);
        setTimeout(() => {
          this.props.history.push('/login');
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
      <div className="forget">
        <NavLink to="login">
          <div className="forget-back-icon" />
        </NavLink>
        <p className="forget-app-title">找回登录密码</p>
        <div className="forget-form">
          <input
            type="forget-phone"
            className="forget-form-phone"
            placeholder="请输入手机号"
            onBlur={ this.onChangePhone }
          />
          <div className="forget-identify">
            <input
              type="password"
              className="forget-form-identify"
              placeholder="输入验证码"
              onBlur={ this.onChangeIdentify }
            />
            <button
              className="forget-get-identify"
              type="button"
              onClick={ this.getIdentify }
              disabled={ item.clickDisabled }
            >
              { item.identifyMsg }
            </button>
          </div>
          <input
            type="password"
            className="forget-form-password"
            placeholder="新密码 6-16位数字或字母"
            onBlur={ this.onChangePassword }
          />
          <span
            className="forget-error-msg"
            style={ styleDisplay }
          >
            { item.message }
          </span>
          <button
            className="forget-submit"
            type="button"
            onClick={ this.postInput }
          >
            确认
          </button>
        </div>
      </div>
    );
  }
}

export default ForgetPassPage;
