import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { NavLink } from 'react-router-dom';
import {
  Icon, Picker, List, WhiteSpace, DatePicker,
} from 'antd-mobile';
import './MyInformationPage.less';
import userApi from '@/api/user';

// ant design mobile 日期组件相关函数、参数
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
// GMT is not currently observed in the UK. So use UTC now.
const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

// Make sure that in `time` mode, the maxDate and minDate are within one day.
let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
if (minDate.getDate() !== maxDate.getDate()) {
  // set the minDate to the 0 of maxDate
  minDate = new Date(
    maxDate.getFullYear(),
    maxDate.getMonth(),
    maxDate.getDate()
  );
}

// 性别组件参数
const sex = [
  {
    label: (
      <div>
        <span>男</span>
      </div>
    ),
    value: '1',
  },
  {
    label: (
      <div>
        <span>女</span>
      </div>
    ),
    value: '0',
  },
  {
    label: (
      <div>
        <span>保密</span>
      </div>
    ),
    value: '2',
  },
];

class MyInformationPage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    this.state = {
      data: [], // 记录生日日期
      cols: 1, // 记录日期级联列数
      visible: false, // 日期及联展示开关
      sexValue: [], // 性别选择参数
      userInfo: {}, // 记录个人信息
      date: now, // 记录当前日期
      time: now, // 记录时间
      newBirthday: '', // 记录新生日
      utcDate: utcNow, // 记录时间格式
      // dpValue: null,
      // customChildValue: null,
    };
  }

  componentDidMount() {
    // 判断是否有误token， 无跳转登录页，有执行代码
    if (localStorage.getItem('token')) {
      userApi.getUserInfo().then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
        const date = res.data.data.birthday;
        const testDate = Date.parse(date);
        if (!isNaN(testDate)) {
          const oldDate = new Date(Date.parse(date.replace(/-/g, '/')));
          this.setState({
            date: oldDate,
          });
        }
        this.setState({
          userInfo: res.data.data,
          sexValue: [ `${res.data.data.sex}` ],
        });
      });
    } else {
      this.props.history.push('/login');
    }
  }

  // 提交改变性别信息
  onChangeSex = sexs => {
    this.setState({
      sexValue: [ `${sexs}` ],
    });
    const newSex = Number(sexs);
    localStorage.setItem('newSex', newSex);
    const item = { ...this.state };
    const params = {
      nickname: item.userInfo.nickname,
      avatar: item.userInfo.avatar,
      sign: item.userInfo.sign,
      sex: newSex,
      birthday: item.userInfo.birthday,
    };
    userApi.updateUserInfo(params).then(res => {
      if (res.data.status === 200) {
        this.props.history.push('/myInformation');
      }
    });
  };

  // 提交改变生日信息
  onChangeBirth = event => {
    const newBirth = event;
    function checkTime(i) {
      if (i < 10) {
        i = `0${i}`;
      }

      return i;
    }
    const dateTime = `${newBirth.getFullYear()}-${checkTime(newBirth.getMonth() + 1)}-${checkTime(newBirth.getDate())}`;
    localStorage.setItem('newBirthday', dateTime);
    this.setState({
      date: newBirth,
      newBirthday: dateTime,
    });
    const item = { ...this.state };
    const params = {
      nickname: item.userInfo.nickname,
      avatar: item.userInfo.avatar,
      sign: item.userInfo.sign,
      sex: Number(item.sexValue[0]),
      birthday: dateTime,
    };
    userApi.updateUserInfo(params).then(res => {
      if (res.data.status === 200) {
        this.props.history.push('/myInformation');
      }
    });
  };

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
      <DocumentTitle title="个人资料">
        <div className="myinfo">
          <div className="myinfo-title">
            <NavLink to="myCenter">
              <span className="myinfo-title-back" />
            </NavLink>
            <p className="myinfo-title-name">个人资料</p>
          </div>
          <div className="myinfo-banner">
            <div className="myinfo-pic">
              { img }
              { /* <img
                src={ require('../../../../images/boy.png') }
                alt="头像"
              /> */ }
              <p className="myinfo-tag">头像</p>
            </div>
            { /* <Icon
              type="right"
              size="lg"
              color="#707070"
              style={ { marginRight: '20px' } }
            /> */ }
          </div>
          <NavLink to="nicknameUpdate">
            <div className="myinfo-nickname">
              <p className="myinfo-nickname-main">
                <span className="myinfo-nickname-tag">昵称</span>
                <span className="myinfo-nickname-msg">
                  { item.userInfo.nickname }
                </span>
              </p>
              <Icon
                type="right"
                size="lg"
                color="#707070"
                style={ { marginRight: '20px' } }
              />
            </div>
          </NavLink>
          <div className="myinfo-sex">
            <WhiteSpace size="lg" />
            <List
              style={ { backgroundColor: 'white' } }
              className="sex-picker-list"
            >
              <Picker
                data={ sex }
                value={ item.sexValue }
                cols={ 1 }
                onChange={ this.onChangeSex }
              >
                <List.Item
                  arrow="horizontal"
                >性别</List.Item>
              </Picker>
            </List>
          </div>
          <div className="myinfo-birth">
            <List
              className="date-picker-list"
              style={ { backgroundColor: 'white' } }
            >
              <DatePicker
                mode="date"
                title="选择日期"
                extra="Optional"
                minDate={ new Date(1899, 12, 31) }
                maxDate={ minDate }
                value={ item.date }
                onChange={ this.onChangeBirth }
              >
                <List.Item
                  arrow="horizontal"
                  key="horizontal"
                >
生日
                </List.Item>
              </DatePicker>
            </List>
          </div>
          <NavLink to="autographUpdate">
            <div className="myinfo-sign">
              <p className="myinfo-sign-main">
                <span className="myinfo-sign-tag">个性签名</span>
                <span className="myinfo-sign-msg">{ item.userInfo.sign }</span>
              </p>
              <Icon
                type="right"
                size="lg"
                color="#707070"
                style={ { marginRight: '20px' } }
              />
            </div>
          </NavLink>
        </div>
      </DocumentTitle>
    );
  }
}

export default MyInformationPage;
