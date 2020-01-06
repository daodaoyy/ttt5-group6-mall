import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Switch, Modal, Toast, List, Picker } from 'antd-mobile';
import arrayTreeFilter from 'array-tree-filter';
import cityData from '../addressAddPage/addressData';
import './AddressUpdatePage.less';
import userApi from '@/api/user';
import queryString from 'query-string';
import creatHistory from 'history/createHashHistory'; // 返回上一页这段代码

class AddressUpdatePage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值

    // 定义数据
    this.state = {
      addressList: {}, // 存储当前地址的信息
      checked: false, // 设置默认的开关
      addressBase: '', // 记录主要地址
      addressDetile: '', // 记录详细地址
      mainAddress: '', // 记录更改地址
      pickerValue: [], // 记录选择 data 的地址
      asyncValue: [], // 记录地址 data 的 value 值
      visible: false, // 控制地址级联选择器展示的参数
      phoneValue: '', // 记录收货人电话
      nameValue: '', // 记录收货人姓名
      opacity: false, // 错误信息展示开关
      message: '', // 记录错误信息
    };
  }

  componentDidMount() {
    // 判断有无 token 无则跳转到登录页, 有即初始化state里的参数值
    if (localStorage.getItem('token')) {
      const addressData = JSON.parse(localStorage.getItem('addressList'));
      const tempAddress = addressData.address.split('\xa0');
      this.setState({
        addressList: addressData,
        addressBase: tempAddress[0],
        addressDetile: tempAddress[1],
        mainAddress: tempAddress[0],
        phoneValue: addressData.phone,
        nameValue: addressData.name,
        checked: addressData.isDefault,
        initChecked: addressData.isDefault,
      });
    } else {
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
      nameValue: event.target.value,
    });
    if (event.target.value.length >= 10) {
      Toast.info('最多10个字哟~', 2);
    }
  };

  // 实时更新保存收货人电话
  onChangePhone = event => {
    this.setState({
      phoneValue: event.target.value,
    });
  };

  // 实时更新保存详细地址
  onChangeDetile = event => {
    this.setState({
      addressDetile: event.target.value,
    });
    if (event.target.value.length >= 30) {
      Toast.info('最多30个字哟~', 2);
    }
  };

  // 实时更新保存是否设置默认
  onChangeSwitch = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  // 点击删除地址
  deleteAddress = () => {
    const item = { ...this.state };
    const addressId = item.addressList.id;
    const string = queryString.parse(this.props.history.location.search);
    Modal.alert('删除', '确定删除该地址？', [
      { text: '取消', style: 'default' },
      {
        text: '确定',
        onPress: () => userApi.deleteAddress(addressId).then(res => {
          // console.log(res.data.status);
          if (res.data.status === 200) {
            Toast.success('删除成功', 2);
            setTimeout(() => {

              if (string.from === 'order' && !string.flag) {
                this.props.history.push('/addressList?from=order');
              } else if (string.from === 'order' && string.flag === '1') {
                this.props.history.push('/addressList?from=order&flag=1');
              } else {
                this.props.history.push('/addressList');
              }
              // this.props.history.push('/addressList');
            }, 1000);
          } else {
            Toast.fail('删除失败', 2);
          }
        }),
        style: 'default',
      },
    ]);
  };

  // 点击保存修改的修改的地址
  postEdit = () => {
    const string = queryString.parse(this.props.history.location.search);
    const item = { ...this.state };
    const rePhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    const address = this.getSel();
    const getAddress = (address) => {
      return (address ? address : item.addressBase);
    };
    const allAddress = `${getAddress(address)}\xa0${item.addressDetile}`;
    const params = {
      name: item.nameValue, // 姓名, 2-4位中文
      phone: item.phoneValue, // 手机号, 11位
      address: allAddress, // 地址,
      isDefault: item.checked, // 默认地址
    };
    const addressId = item.addressList.id;
    if (!item.nameValue || !item.phoneValue || !getAddress(address) || !item.addressDetile) {
      this.setState({
        opacity: true,
        message: '信息不能为空',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else if (!rePhone.test(item.phoneValue)) {
      this.setState({
        opacity: true,
        message: '手机号格式错误',
      });
      setTimeout(() => {
        this.setState({
          opacity: false,
        });
      }, 2000);
    } else {
      // 信息判断无误则调取修改地址 api
      userApi.updateAddress(addressId, params).then(res => {
        if (res.data.status === 200) {
          Toast.success('修改成功', 2);
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
          Toast.fail('修改失败', 2);
        }
      });
    }
  };

  render() {
    const item = { ...this.state }; // 解构state的参数
    const styleDisplay = {
      opacity: item.opacity ? 1 : 0,
    };
    let selectBtn = null;
    const string = queryString.parse(this.props.history.location.search);
    if (item.initChecked) {
      selectBtn = (
        <Switch
          color="#07e278"
          checked
          disabled
        />
      );
    } else {
      selectBtn = (
        <Switch
          color="#07e278"
          onChange={ this.onChangeSwitch }
          checked={ item.checked }
        />
      );
    }
    const history = creatHistory();// 返回上一页这段代码
    return (
      <DocumentTitle title="编辑收货地址">
        <div className="edit-address">
          <div className="edit-address-title">
            <span className="edit-address-title-back"
              onClick={ () => (string.from === 'order' ? history.goBack() : this.props.history.push('addressList')) }
            />
            <p className="edit-address-title-name">编辑收货地址</p>
            <button
              type="button"
              className="edit-address-delete"
              onClick={ this.deleteAddress }
            >
              删除
            </button>
          </div>
          <div className="edit-address-receiver">
            <span className="edit-address-receiver-tag">收货人：</span>
            <input
              type="text"
              className="edit-address-receiver-edit"
              defaultValue={ item.addressList.name }
              onChange={ this.onChangeName }
              maxLength="10"
            />
          </div>
          <div className="edit-address-phone">
            <span className="edit-address-phone-tag">手机号码：</span>
            <input
              type="text"
              className="edit-address-phone-text"
              defaultValue={ item.addressList.phone }
              onChange={ this.onChangePhone }
            />
          </div>
          <div className="edit-address-select">
            <List
              style={ { backgroundColor: 'white' } }
              className="edit-address-picker-list"
            >
              <Picker
                visible={ this.state.visible }
                data={ cityData }
                value={ this.state.pickerValue }
                extra={ item.addressBase }
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
          <div className="edit-address-detile">
            <span className="edit-address-detile-tag">详细地址：</span>
            <textarea
              className="edit-address-detile-text"
              onChange={ this.onChangeDetile }
              value={ item.addressDetile }
              maxLength="30"
            />
          </div>
          <div className="edit-address-default">
            <p className="edit-address-default-main">
              <span className="edit-address-tag">设置默认地址</span>
              <span className="edit-address-redmin">
                提醒：每次下单会默认推荐使用改地址
              </span>
            </p>
            <div className="edit-address-switch">
              { selectBtn }
            </div>
          </div>
          <span
            className="edit-address-error-msg"
            style={ styleDisplay }
          >
            { item.message }
          </span>
          <div className="edit-address-btn">
            <button
              type="button"
              className="edit-address-submit"
              onClick={ this.postEdit }
            >
              保存
            </button>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default AddressUpdatePage;
