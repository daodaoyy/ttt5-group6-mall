import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Icon, Modal, Toast } from 'antd-mobile';
import shopCartApi from '@/api/product';
import './AccountPage.less';

class AccountPage extends Component {
  constructor(props) {
    // super指代父类的实例（this对象）用在构造函数中，必须在使用this之前调用
    super(props); // props用于父子组件传值
    this.state = {
      oldPhone: '', // 存储当前手机号码
      cartList: this.props.cartList, // 存储购物车信息
    };
  }

  componentDidMount() {
    // 判断有无 token 无则跳转到登录页，有则获取的当前手机号码
    if (localStorage.getItem('token')) {
      const phone = localStorage.getItem('phone');
      this.setState({
        oldPhone: phone,
      });
    } else {
      this.props.history.push('/login');
    }
  }

  // 点击退出登录
  logout = () => {
    const params1 = this.state.cartList;
    const params = {
      data: params1,
    };
    Modal.alert('退出登录', '确定退出当前用户？', [
      { text: '取消', style: 'default' },
      {
        text: '确定',
        // 确认退出登录后post 购物车， 成功后清除本地存储并跳转到登录页
        onPress: () => shopCartApi.submitShopCart(params).then(res => {
          if (res.data.status === 200) {
            const emptyShopCart = [];
            this.props.emptyShopCartStore(emptyShopCart);
            Toast.success('退出成功', 2);
            localStorage.removeItem('token');
            localStorage.removeItem('phone');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('sign');
            localStorage.removeItem('addressList');
            localStorage.removeItem('oneAddress');
            localStorage.removeItem('newBirthday');
            localStorage.removeItem('newSex');
            setTimeout(() => {
              this.props.history.push('/login');
            }, 1000);
          } else {
            Toast.fail('退出失败', 2);
          }
        }),
        style: 'default',
      },
    ]);
  };

  render() {
    const item = { ...this.state };
    return (
      <DocumentTitle title="账号管理">
        <div className="account">
          <div className="account-title">
            <NavLink to="myCenter">
              <span className="account-title-back" />
            </NavLink>
            <p className="account-title-name">账号管理</p>
          </div>
          <NavLink to="phoneUpdate">
            <div className="account-phone">
              <p className="account-phone-tag">手机号</p>
              <div className="account-phone-main">
                <p className="account-phone-msg">{ item.oldPhone }</p>
                <Icon
                  type="right"
                  size="lg"
                  color="#707070"
                  style={ { marginRight: '20px' } }
                />
              </div>
            </div>
          </NavLink>
          <NavLink to="passwordUpdate">
            <div className="account-password">
              <p className="account-password-tag">修改密码</p>
              <Icon
                type="right"
                size="lg"
                color="#707070"
                style={ { marginRight: '20px' } }
              />
            </div>
          </NavLink>
          <button
            className="account-out"
            type="button"
            onClick={ this.logout }
          >
            退出登录
          </button>
        </div>
      </DocumentTitle>
    );
  }
}

const mapState = state => ({
  cartList: state.shopCartList.payload,
});

const mapDispatch = dispatch => ({ // dispatch
  emptyShopCartStore(emptyShopCart) { // 退出登录的时候清空redux里边的购物车
    // console.log(emptyShopCart);
    dispatch(
      {
        type: 'EMPTY_SHOPCART',
        payload: emptyShopCart,
      }
    );
  },
});

export default connect(mapState, mapDispatch)(AccountPage);
