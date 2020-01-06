import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import './AutographUpdatePage.less';
import { NavLink } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import userApi from '@/api/user';

class AutographUpdatePage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    // 定义数据
    this.state = {
      newAutogra: '', // 记录修改的个性签名
      oldAutogra: '', // 记录当前旧的个性签名
      userInfo: {}, // 记录个人信息
      tempBirth: '', // 记录生日
      tempSex: '', // 记录性别
      opacity: false, // 错误信息是否展示开关
    };
  }

  componentDidMount() {
    // 判断是否有token， 有则初始化state， 无则跳转到登录页
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
        oldAutogra: userInfo.sign,
        newAutogra: userInfo.sign,
        userInfo,
      });
    } else {
      this.props.history.push('/login');
    }
  }

  // 实时更新保存个新签名
  onChangAutogra = event => {
    this.setState({
      newAutogra: event.target.value,
    });
    if (event.target.value.length >= 50) {
      Toast.info('最多50个字哟~', 2);
    }
  };

  // 点击保存修改
  updateAutogra = () => {
    const item = { ...this.state };
    const params = {
      nickname: item.userInfo.nickname,
      avatar: item.userInfo.avatar,
      sign: item.newAutogra,
      sex: Number(item.tempSex),
      birthday: item.tempBirth,
    };
    if (item.newAutogra === item.oldAutogra) {
      this.setState({
        opacity: true,
        errorMessage: '昵称格式错误',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else {
      // 判断信息无误则调取修改用户信息的 api
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
      <DocumentTitle title="个性签名">
        <div className="autograph">
          <div className="autograph-title">
            <NavLink to="myInformation">
              <span className="autograph-title-back" />
            </NavLink>
            <p className="autograph-title-name">个性签名</p>
          </div>
          <p className="autograph-tag">有趣的个人介绍会吸引更多人哦~（50字以内）</p>
          <textarea
            className="autograph-words"
            value={ item.newAutogra }
            onChange={ this.onChangAutogra }
            maxLength="50"
          />
          <span
            className="autograph-error-msg"
            style={ styleDisplay }
          >
            签名未修改
          </span>
          <button
            type="button"
            className="autograph-submit"
            onClick={ this.updateAutogra }
          >
            提交
          </button>
        </div>
      </DocumentTitle>
    );
  }
}

export default AutographUpdatePage;
