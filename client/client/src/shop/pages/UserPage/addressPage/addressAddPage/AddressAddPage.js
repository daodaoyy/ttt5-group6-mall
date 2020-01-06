import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import {
  Switch, Picker, List, Toast,
} from 'antd-mobile';
import arrayTreeFilter from 'array-tree-filter';
import cityData from './addressData';
import './AddressAddPage.less';
import userApi from '@/api/user';
import queryString from 'query-string';
import creatHistory from 'history/createHashHistory'; // 返回上一页这段代码

class AddressAddPage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值

    // 定义数据
    this.state = {
      checked: false, // 设置默认地址的开关
      name: '', // 记录收货人姓名
      Phone: '', // 记录收货人电话
      detile: '', // 记录地址详情信息
      pickerValue: [], // 记录选择 data 的地址
      asyncValue: [], // 记录地址 data 的 value 值
      visible: false, // 控制地址级联选择器展示的参数
      opacity: false, // 错误信息展示开关
      message: '', // 记录错误信息
      changeDisabled: true, // 判断是否已添加了地址
    };
  }

  componentDidMount() {
    // 判断有无 token 无则跳转到登录页
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    }
  }

  // 记录选择的地址信息
  getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(
      cityData,
      (c, level) => c.value === value[level]
    );
    return treeChildren.map(v => v.label).join('');
  }

  // 实时更新绑定的收货人姓名
  onChangeName = event => {
    this.setState({
      name: event.target.value,
    });
    if (event.target.value.length >= 10) {
      Toast.info('最多10个字哟~', 2);
    }
  };

  // 实时更新绑定的收货人电话信息
  onChangePhone = event => {
    this.setState({
      phone: event.target.value,
    });
  };

  // 实时更新绑定的地址详情信息
  onChangeDetile = event => {
    this.setState({
      detile: event.target.value,
    });
    if (event.target.value.length >= 30) {
      Toast.info('最多30个字哟~', 2);
    }
  };

  // 是否选择默认地址开关
  onChangeSwitch = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  // 点击保存地址
  postAddress = () => {
    // ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    const string = queryString.parse(this.props.history.location.search);
    const rePhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    const item = { ...this.state };
    const address = this.getSel();
    const allAddress = `${address}\xa0${item.detile}`;
    const params = {
      name: item.name,
      phone: item.phone,
      address: allAddress,
      isDefault: item.checked, // 默认地址
    };
    if (!item.name || !item.phone || !address || !item.detile) {
      this.setState({
        opacity: true,
        message: '信息不能为空',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else if (!rePhone.test(item.phone)) {
      this.setState({
        opacity: true,
        message: '手机号格式错误',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else if (item.changeDisabled) {
      this.setState({
        changeDisabled: false,
      });

      // post 新地址调取添加地址api
      userApi.newAddress(params).then(res => {
        if (res.data.status === 200) {
          Toast.success('添加成功', 2);
          setTimeout(() => {
            if (string.from === 'order' && !string.flag) {
              this.props.history.push('/addressList?from=order');
            } else if (string.from === 'order' && string.flag === '1') {
              this.props.history.push('/addressList?from=order&flag=1');
            } else {
              this.props.history.push('/addressList');
            }
          }, 1000);
        } else {
          Toast.fail('添加失败', 2);
          this.setState({
            changeDisabled: true,
          });
        }
      });
    }
  };

  render() {
    const item = { ...this.state }; // 解构state的参数
    const styleDisplay = {
      opacity: item.opacity ? 1 : 0,
    };
    const string = queryString.parse(this.props.history.location.search);
    const history = creatHistory();// 返回上一页这段代码
    return (
      <DocumentTitle title="新建地址">
        <div className="new-address">
          <div className="new-address-title">
            <span className="new-address-title-back"
              onClick={ () => (string.from === 'order' ? history.goBack() : this.props.history.push('addressList')) }
            />
            <p className="new-address-title-name">新建地址</p>
          </div>
          <div className="new-address-receiver">
            <span className="new-address-receiver-tag">收货人：</span>
            <input
              type="text"
              className="new-address-receiver-edit"
              placeholder="请填写收货人姓名"
              onChange={ this.onChangeName }
              maxLength="10"
            />
          </div>
          <div className="new-address-phone">
            <span className="new-address-phone-tag">手机号码：</span>
            <input
              type="text"
              className="new-address-phone-text"
              placeholder="请填写收货人手机号"
              onChange={ this.onChangePhone }
            />
          </div>
          <div className="new-address-select">
            <List
              style={ { backgroundColor: 'white' } }
              className="address-picker-list"
            >
              <Picker
                visible={ this.state.visible }
                data={ cityData }
                value={ this.state.pickerValue }
                onChange={ v => this.setState({ pickerValue: v }) }
                onOk={ () => this.setState({ visible: false }) }
                onDismiss={ () => this.setState({ visible: false }) }
              >
                <List.Item
                  extra={ this.getSel() }
                  onClick={ () => this.setState({ visible: true }) }
                >
                  所在地区:
                </List.Item>
              </Picker>
            </List>
          </div>
          <div className="new-address-detile">
            <span className="new-address-detile-tag">详细地址：</span>
            <textarea
              className="new-address-detile-text"
              placeholder="街道、楼牌号等"
              onChange={ this.onChangeDetile }
              maxLength="30"
            />
          </div>
          <div className="new-address-default">
            <p className="new-address-default-main">
              <span className="new-address-tag">设置默认地址</span>
              <span className="new-address-redmin">
                提醒：每次下单会默认推荐使用改地址
              </span>
            </p>
            <div className="new-address-switch">
              <Switch
                color="#07e278"
                onChange={ this.onChangeSwitch }
                checked={ item.checked }
              />
            </div>
          </div>
          <span
            className="new-address-error-msg"
            style={ styleDisplay }
          >
            { item.message }
          </span>
          <div className="new-address-btn">
            <button
              type="button"
              className="new-address-submit"
              onClick={ this.postAddress.bind(this) }
            >
              保存
            </button>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default AddressAddPage;
