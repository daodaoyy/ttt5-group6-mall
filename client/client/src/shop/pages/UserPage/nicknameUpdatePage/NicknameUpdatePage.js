import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { NavLink } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import './NicknameUpdatePage.less';
import userApi from '@/api/user';

class NicknameUpdatePage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    // 定义数据
    this.state = {
      newNickName: '', // 记录新昵称
      oldNickName: '', // 记录当前旧昵称
      userInfo: {}, // 记录用户信息
      opacity: false, // 控制错误信息是否展示开关
      errorMessage: '', // 错误信息
      tempBirth: '', // 记录生日
      tempSex: '', // 记录性别
    };
  }

  componentDidMount() {
    // 判断是否有误token， 无跳转登录页，有执行代码
    if (localStorage.getItem('token')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const newBirth = localStorage.getItem('newBirthday');
      const newSex = localStorage.getItem('newSex');
      if (newBirth) {
        this.setState({
          tempBirth: newBirth,
        });
      } else {
        this.setState({
          tempBirth: userInfo.birthday,
        });
      }
      if (newSex) {
        this.setState({
          tempSex: newSex
        });
      } else {
        this.setState({
          tempSex: userInfo.sex,
        });
      }
      this.setState({
        oldNickName: userInfo.nickname,
        newNickName: userInfo.nickname,
        userInfo,
      });
    } else {
      this.props.history.push('/login');
    }
  }

  // 实时更新保存昵称信息
  onChangeName = event => {
    this.setState({
      newNickName: event.target.value,
    });
    if (event.target.value.length >= 10) {
      Toast.info('最多10个字哟~', 2);
    }
  };

  // 提交更改的昵称
  updateNickname = () => {
    const item = { ...this.state };
    const reNick = /^[A-Za-z\d_\-\u4e00-\u9fa5]{2,16}$/;
    if (!reNick.test(item.newNickName)) {
      this.setState({
        opacity: true,
        errorMessage: '昵称格式错误',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else if (item.newNickName === item.oldNickName) {
      this.setState({
        opacity: true,
        errorMessage: '昵称未修改',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else {
      const params = {
        nickname: item.newNickName,
        avatar: item.userInfo.avatar,
        sign: item.userInfo.sign,
        sex: Number(item.tempSex),
        birthday: item.tempBirth,
      };
      // 判断信息无误调用修改用户信息 api
      userApi.updateUserInfo(params).then(res => {
        if (res.data.status === 200) {
          this.props.history.push('/myInformation');
        } else {
          Toast.fail('修改失败', 2);
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
      <DocumentTitle title="修改昵称">
        <div className="nickname-update">
          <div className="nickname-title">
            <NavLink to="myInformation">
              <span className="nickname-title-back" />
            </NavLink>
            <p className="nickname-title-name">修改昵称</p>
          </div>
          <p className="nickname-update-redmin">2-10个汉字或字母或-或_</p>
          <input
            type="text"
            className="nickname-update-name"
            defaultValue={ item.oldNickName }
            onChange={ this.onChangeName }
            maxLength="10"
          />
          <span
            className="nickname-error-msg"
            style={ styleDisplay }
          >
            { item.errorMessage }
          </span>
          <button
            type="button"
            className="nickname-update-submit"
            onClick={ this.updateNickname }
          >
            提交
          </button>
        </div>
      </DocumentTitle>
    );
  }
}

export default NicknameUpdatePage;
