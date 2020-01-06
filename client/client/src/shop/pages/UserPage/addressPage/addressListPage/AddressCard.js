import React, { Component } from 'react';
import './AddressListPage.less';
import queryString from 'query-string';

class AddressCard extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值

    // 定义数据
    this.state = {
      addressList: [], // 获取的用户信息
    };
  }

  // 点击编辑按钮进入地址编辑
  goEdit = (index, item, ev) => {
    ev.stopPropagation();
    localStorage.setItem('addressList', JSON.stringify(item));
    const string = queryString.parse(this.props.history.location.search);
    if (string.from === 'order' && !string.flag) {
      this.props.history.push('/addressUpdate?from=order');
    } else if (string.from === 'order' && string.flag === '1') {
      this.props.history.push('/addressUpdate?from=order&flag=1');
    } else {
      this.props.history.push('/addressUpdate');
    }
  };

  // 订单页调转到地址页点击地址卡片即选中
  setAddress = (index, item) => {
    const string = queryString.parse(this.props.history.location.search);
    if (string.from === 'order' && !string.flag) {
      this.props.history.push('/submitOrder?from=addressList');
    } else if (string.from === 'order' && string.flag === '1') {
      this.props.history.push('/submitOrder?from=addressList&flag=1');
    }
    localStorage.setItem('oneAddress', JSON.stringify(item));
  };

  render() {
    const { addressList } = this.props;
    // console.log(this.props);
    return (
      <ul className="addresslist-ul">
        { addressList.map((item, index) => (
          <li
            key={ item.id }
            className="addresslist-li"
            onClick={ this.setAddress.bind(this, index, item) }
          >
            <div className="addresslist-msg">
              <div className="addresslist-reciver-msg">
                <span className="addresslist-reciver-name">{ item.name }</span>
                <p className="addresslist-reciver-tag">
                  <span className="addresslist-reciver-phone">
                    { item.phone }
                  </span>
                  { item.isDefault === true && (
                    <span className="addresslist-default-tag">默认</span>
                  ) }
                </p>
              </div>
              <p className="addresslist-detile">{ item.address }</p>
            </div>
            <span
              className="addresslist-edit"
              onClick={ this.goEdit.bind(this, index, item) }
            />
          </li>
        )) }
      </ul>
    );
  }
}

export default AddressCard;
