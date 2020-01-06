import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { NavLink } from 'react-router-dom';
import './PhoneUpdatePage.less';
import userApi from '@/api/user';

class PhoneUpdatePage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    this.state = {
      oldPhone: '', // 记录旧手机号
      identify: '', // 记录验证码
      opacity: 0.5, // 控制下一步按钮样式
      errorOpacity: false, // 出错信息提示开关
      disableMsg: false, // 控制下一步按钮是否可点击
      identifyMsg: '获取验证码', // 验证码已发送提示
      clickDisabled: false, // 控制验证码按钮状态
    };
  }

  componentDidMount() {
    // 判断有无token, 有则执行，无跳转登录页
    if (localStorage.getItem('token')) {
      const phone = localStorage.getItem('phone');
      this.setState({
        oldPhone: phone,
      });
    } else {
      this.props.history.push('/login');
    }
  }

  // 实时更新保存验证码
  onChangeIdentify = event => {
    if (event.target.value) {
      this.setState({
        opacity: 1,
        disableMsg: true,
      });
    } else {
      this.setState({
        opacity: 0.5,
        disableMsg: false,
      });
    }
    this.setState({
      identify: event.target.value,
    });
  };

  // 获取验证码
  getIdentify = () => {
    const item = { ...this.state };
    const params = {
      phone: item.oldPhone,
    };
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
  };

  // 提交旧手机验证
  postIdentify = () => {
    const item = { ...this.state };
    const params = {
      phone: item.oldPhone,
      code: parseInt(item.identify, 10),
    };
    userApi.putPhoneIdentify(params).then(res => {
      if (res.data.status === 200) {
        localStorage.setItem('sign', item.identify);
        this.props.history.push('/bindNewPhone');
      } else {
        this.setState({
          errorOpacity: true,
        });
        setTimeout(() => {
          this.setState({
            errorOpacity: false,
          });
        }, 2000);
      }
    });
  }

  render() {
    const item = { ...this.state };
    const styleDisplay = {
      opacity: item.errorOpacity ? 1 : 0,
    };
    let button = null;
    if (item.disableMsg) {
      button = (
        <button
          type="button"
          className="phone-update-next"
          onClick={ this.postIdentify }
          style={ { opacity: item.opacity } }
        >
        下一步
        </button>
      );
    } else {
      button = (
        <button
          type="button"
          className="phone-update-next"
          style={ { opacity: item.opacity } }
        >
        下一步
        </button>
      );
    }

    return (
      <DocumentTitle title="修改手机号">
        <div className="phone-update">
          <div className="phone-update-title">
            <NavLink to="account">
              <span className="phone-update-title-back" />
            </NavLink>
            <p className="phone-update-title-name">修改手机号</p>
          </div>
          <p className="phone-update-redmin">请完成以下认证</p>
          <p className="phone-update-tag">
            请输入
            { item.oldPhone }
            收到的短信验证码
          </p>
          <div className="phone-update-btn">
            <input
              type="text"
              placeholder="请输入短信验证码"
              className="phone-update-identify"
              onChange={ this.onChangeIdentify }
            />
            <button
              type="button"
              className="phone-update-gain"
              onClick={ this.getIdentify }
              disabled={ item.clickDisabled }
            >
              { item.identifyMsg }
            </button>
          </div>
          <span
            className="phone-update-error-msg"
            style={ styleDisplay }
          >
验证手机号失败
          </span>
          { button }
        </div>
      </DocumentTitle>
    );
  }
}

// PhoneUpdatePage.propTypes = {
//   history: PropTypes.string,
// };

export default PhoneUpdatePage;
