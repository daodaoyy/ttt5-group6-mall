import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import './AddressListPage.less';
import { NavLink } from 'react-router-dom';
import userApi from '@/api/user';
import queryString from 'query-string';
import AddressList from './AddressCard';
import creatHistory from 'history/createHashHistory'; // 返回上一页这段代码

class AddressListPage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值

    // 定义数据
    this.state = {
      addressList: [], // 获取的用户信息
    };
  }

  componentDidMount() {
    // 判断有无 token 无则跳转到登录页
    if (localStorage.getItem('token')) {
      userApi.getAddressList().then(res => {
        this.setState({
          addressList: res.data.data,
        });
      });
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    const item = { ...this.state };
    const addressList = item.addressList ? item.addressList : [];
    const string = queryString.parse(this.props.history.location.search);
    const history = creatHistory();// 返回上一页这段代码
    return (
      <DocumentTitle title="地址管理">
        <div className="addresslist">
          <div className="addresslist-title">
            <span className="addresslist-title-back"
              onClick={ () => (string.from === 'order' ? history.goBack() : this.props.history.push('myCenter')) }
            />
            <p className="addresslist-title-name">地址管理</p>
          </div>
          <AddressList
            addressList={ addressList }
            history={ this.props.history }
          />
          <div className="addresslist-btn">
            <NavLink to={ string.from === 'order' && !string.flag ? 'addressAdd?from=order' : string.from === 'order' && string.flag === '1' ? 'addressAdd?from=order&flag=1' : 'addressAdd' }>
              <button
                type="button"
                className="addresslist-submit"
              >
                新建地址
              </button>
            </NavLink>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default AddressListPage;
