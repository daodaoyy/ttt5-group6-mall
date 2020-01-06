import React, { Component } from 'react';
import { WhiteSpace } from 'antd-mobile';
import userApi from '@/api/user';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const address = JSON.parse(localStorage.getItem('oneAddress'));

    if (!address) {
      userApi.getAddressList().then(res => {
        const temp = res.data.data;
        const data = temp.find(x => x.isDefault === true);
        this.setState({ data });
      });
    } else {
      const data = address;
      this.setState({ data });
      localStorage.removeItem('oneAddress');
    }
  }

  componentWillUnmount() {
  }

  render() {
    const addressData = this.state.data;
    this.props.parentGetAddress(addressData);
    return (
      <div>
        <div className="address-container">
          <div
            style={ {
              display: 'flex',
              alignItems: 'center',
            } }
          >
            <div className="address-img">
              <img
                src={ require('@/images/order_address.png') }
                width="70"
                height="60"
                alt="地址图片"
              />
            </div>
            <div className="address-info">
              <div className="address-info-title">
                <div className="info-name">
                  { addressData && addressData.name ? addressData && addressData.name : '新增地址' }
                </div>
                <div className="info-phone">
                  { addressData && addressData.phone }
                </div>
              </div>
              <div className="address">
                { addressData && addressData.address }
              </div>
            </div>
          </div>
          <span
            style={ {
              color: '#aaa8a8',
            } }
          >
            &gt;
          </span>
        </div>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default Address;
