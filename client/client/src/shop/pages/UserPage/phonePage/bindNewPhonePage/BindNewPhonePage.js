import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { NavLink } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import './BindNewPhonePage.less';
import userApi from '@/api/user';

class BindNewPhonePage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    this.state = {
      newPhone: '', // 记录新手机号
      oldIdentify: '', // 记录旧手机号
      newIdentify: '', // 记录新手机验证码
      opacity: false, // 错误信息展示开关,
      identifyMsg: '获取验证码', // 验证码已发送提示
      clickDisabled: false, // 控制验证码按钮状态
      errorMessage: '输入信息格式错误' // 错误信息内容
    };
  }

  componentDidMount() {
    // 判断有无token, 有则执行，无跳转登录页
    if (localStorage.getItem('token')) {
      const identify = localStorage.getItem('sign');
      this.setState({
        oldIdentify: identify,
      });
    } else {
      this.props.history.push('/login');
    }
  }

  // 实时更新保存新手机号
  onChangePhone = event => {
    this.setState({
      newPhone: event.target.value,
    });
  };

  // 实时更新保存新手机验证码
  onChangeIdentify = event => {
    this.setState({
      newIdentify: event.target.value,
    });
  };

  // 获取新手机短信验证码
  getIdentify = () => {
    const rePhone = /^[1][3,4,5,7,8][0-9]{9}$/; // 判断电话号码的正则
    const item = { ...this.state };
    if (!rePhone.test(item.newPhone)) {
      this.setState({
        opacity: true,
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else {
      const params = {
        phone: item.newPhone, // 新手机号
      };
      // 调用手机验证码 api
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

  // 提交修改绑定手机号
  postIdentify = () => {
    const item = { ...this.state };
    const params = {
      code: parseInt(item.oldIdentify, 10), // 旧手机验证码
      newPhone: item.newPhone, // 新手机号
      newCode: parseInt(item.newIdentify, 10), // 新手机验证码

    };
    // 修改成功跳登录页并删除本地存储
    userApi.updateUserPhone(params).then(res => {
      if (res.data.status === 200) {
        Toast.success('修改成功', 2);
        localStorage.removeItem('token');
        localStorage.removeItem('phone');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('sign');
        localStorage.removeItem('addressList');
        localStorage.removeItem('oneAddress');
        localStorage.removeItem('newBirthday');
        localStorage.removeItem('newSex');
        setTimeout(() => {
          this.props.history.push('/login');
        }, 1000);
      } else {
        this.setState({
          opacity: true,
          errorMessage: res.data.message,
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
      <DocumentTitle title="修改手机号">
        <div className="bind-phone">
          <div className="bind-phone-title">
            <NavLink to="phoneUpdate">
              <span className="bind-phone-title-back" />
            </NavLink>
            <p className="bind-phone-title-name">修改手机号</p>
          </div>
          <p className="bind-phone-redmin">绑定新号码</p>
          <input
            type="text"
            placeholder="请输入新手机号"
            className="bind-phone-new"
            onBlur={ this.onChangePhone }
          />
          <p className="bind-phone-tag">短信验证码</p>
          <div className="bind-phone-btn">
            <input
              type="text"
              placeholder="请输入短信验证码"
              className="bind-phone-identify"
              onBlur={ this.onChangeIdentify }
            />
            <button
              type="button"
              className="bind-phone-gain"
              onClick={ this.getIdentify }
              disabled={ item.clickDisabled }
            >
              { item.identifyMsg }
            </button>
          </div>
          <span
            className="bind-error-msg"
            style={ styleDisplay }
          >
            { item.errorMessage }
          </span>
          <button
            type="button"
            className="bind-phone-submit"
            onClick={ this.postIdentify }
          >
              提交
          </button>
        </div>
      </DocumentTitle>
    );
  }
}

export default BindNewPhonePage;
