import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { NavLink } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import './passwordUpdatePage.less';
import userApi from '@/api/user';

class PasswordUpdatePage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值

    // 定义数据
    this.state = {
      oldPass: 0, // 手机号或密码错误提示
      newPass: '', // 记录手机号的值
      surePass: '', // 记录密码的值
      opacity: false, // 错误信息展示开关
      message: '', // 记录错误信息
    };
  }

  componentDidMount() {
    // 判断是否有误token， 无跳转登录页
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }
  }

  // 实时更新保存旧密码信息
  onChangeOld = event => {
    this.setState({
      oldPass: event.target.value,
    });
  };

  // 实时更新保存新密码信息
  onChangeNew = event => {
    this.setState({
      newPass: event.target.value,
    });
  };

  // 实时更新保存确认密码信息
  onChangeSure = event => {
    this.setState({
      surePass: event.target.value,
    });
  };

  // 提交修改密码按钮
  postPassWord = () => {
    // const rePhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    // const rePass = /^[a-z0-9A-Z]{6,16}$/;
    const item = { ...this.state };
    const params = {
      oldPassword: item.oldPass, // 旧密码,  0-9a-zA-Z.-
      newPassword: item.newPass, // 新密码, 0-9a-zA-Z.-
    };
    if (!item.newPass || !item.surePass || !item.oldPass) {
      this.setState({
        opacity: true,
        message: '输入信息不能为空',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else if (item.newPass !== item.surePass) {
      this.setState({
        opacity: true,
        message: '两次密码输入不一致',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else {
      // 判断信息无误调用修改密码 api
      userApi.updateUserPassWord(params).then(res => {
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
            message: '密码输入有误',
          });
          setTimeout(() => {
            this.setState({
              opacity: false,
            });
          }, 2000);
        }
      });
    }
  };

  render() {
    const item = { ...this.state };
    const styleDisplay = {
      opacity: item.opacity ? 1 : 0,
    };
    return (
      <DocumentTitle title="修改密码">
        <div className="password-update">
          <div className="password-update-title">
            <NavLink to="account">
              <span className="password-update-title-back" />
            </NavLink>
            <p className="password-update-title-name">修改密码</p>
          </div>
          <p className="password-update-redmin">6-16位密码，数字或字母</p>
          <input
            type="password"
            placeholder="请输入旧密码"
            className="password-update-old"
            onBlur={ this.onChangeOld }
          />
          <input
            type="password"
            placeholder="请输入新密码"
            className="password-update-new"
            onBlur={ this.onChangeNew }
          />
          <input
            type="password"
            placeholder="再次输入密码"
            className="password-update-sure"
            onBlur={ this.onChangeSure }
          />
          <span
            className="password-error-msg"
            style={ styleDisplay }
          >
            { item.message }
          </span>
          <button
            type="button"
            className="password-update-submit"
            onClick={ this.postPassWord }
          >
            提交
          </button>
        </div>
      </DocumentTitle>
    );
  }
}

export default PasswordUpdatePage;
