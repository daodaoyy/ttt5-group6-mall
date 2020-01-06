import {manageApi} from '../../http/re-api';

import {
  HANDLE_LOGIN,
  HANDLE_LOGIN_LOADING,
} from '../mutationType';

export default {
  // 登录action
  async loginAction({ commit }, data) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    const options = {
      method: 'POST',
    }
    try {
      const res = await manageApi('/api/v1/admin/users/login',data.userInfo,options);
      if (res.data.status === 200) {
        const { info } = res.data.data;
        localStorage.setItem('role',info.role);
        localStorage.setItem('user_name',info.username);
        data.that.$message({
          message: '登陆成功！',
          type: 'success'
        });
        if(res.data.data.info.role === 1){
          data.that.$router.push('/showAdmin');
        } else {
          data.that.$router.push('/showUser');
        }
        commit(HANDLE_LOGIN, res.info);
      } else {
        data.that.$message({
          message: res.data.message,
          type: 'error'
        });
      }
    } catch (error) {
      console.log(error)
      data.that.$message({
        message: '请求超时，请检查网络！',
        type: 'warning'
      });
    }
    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  },
  // 退出登录Action
  async logoutAction({ commit }, that) {
    const options = {
      method: 'GET',
    }
    const res = await manageApi('/api/v1/admin/users/logout', {}, options);
    if (res.status === 200) {
      localStorage.clear();
      that.$message({
        message: '您已经安全退出！',
        type: 'success'
      });
      that.$router.push('/');
    } else if (res.status === 403) {
      that.$message({
        message: '您的登录已过期！',
        type: 'warning'
      });
      that.$router.push('/');
    }
  },
}