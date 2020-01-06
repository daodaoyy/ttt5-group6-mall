import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import './MyCenterPage.less';
import MyFooter from './MyFooter/MyFooter';
import userApi from '@/api/user';

class MyCenterPage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    // 定义数据
    this.state = {
      userInfo: {}, // 记录个人信息
      score: {}, // 记录积分和等级信息
    };
  }

  componentDidMount() {
    // 判断是否有误token， 无跳转登录页，有执行代码
    // res.data.status     403跳转登录页，清空locals
    if (localStorage.getItem('token')) {
      userApi.getUserInfo().then(res => {
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
          this.setState({
            userInfo: res.data.data,
          });
        }
      });
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
          this.setState({
            score: res.data.data,
          });
        }
      });
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    const item = { ...this.state };
    let img = null;
    if (item.userInfo.avatar) {
      img = (
        <img
          src={ item.userInfo.avatar }
          alt="头像"
        />
      );
    } else {
      img = (
        <img
          src={ require('../../../../images/boy.png') }
          alt="头像"
        />
      );
    }
    return (
      <DocumentTitle title="我的">
        <div className="mycenter">
          <div className="mycenter-banner">
            <div className="mycenter-pic">
              { img }
            </div>
            <div className="mycenter-memeber">
              <p className="mycenter-nickname">{ item.userInfo.nickname }</p>
              <div className="mycenter-main">
                <p className="mycenter-grade">Lv{ item.score.level }</p>
                <p className="mycenter-score">积分{ item.score.score }</p>
              </div>
            </div>
          </div>
          <NavLink to="myInformation">
            <div className="mycenter-msg">
              <p className="mycenter-msg-tag">个人资料</p>
              <Icon
                type="right"
                size="lg"
                color="#707070"
                style={ { marginRight: '20px' } }
              />
            </div>
          </NavLink>
          <NavLink to="account">
            <div className="mycenter-id">
              <p className="mycenter-id-tag">账号管理</p>
              <Icon
                type="right"
                size="lg"
                color="#707070"
                style={ { marginRight: '20px' } }
              />
            </div>
          </NavLink>
          <NavLink to="addressList">
            <div className="mycenter-address">
              <p className="mycenter-address-tag">地址管理</p>
              <Icon
                type="right"
                size="lg"
                color="#707070"
                style={ { marginRight: '20px' } }
              />
            </div>
          </NavLink>
          <NavLink to="about">
            <div className="mycenter-introduct">
              <p className="mycenter-introduct-tag">关于</p>
              <Icon
                type="right"
                size="lg"
                color="#707070"
                style={ { marginRight: '20px' } }
              />
            </div>
          </NavLink>
          <MyFooter />
        </div>
      </DocumentTitle>
    );
  }
}

export default MyCenterPage;
