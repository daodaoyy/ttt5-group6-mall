import { manageApi } from '../../http/re-api';

import {
  HANDLE_LOGIN_LOADING,
  GET_INFO_LIST,
  GET_TOTLE_PAGE,
  RESET_PART_STORE,
} from '../mutationType';

export default {
  // 组件销毁前重置state
  resetListAction({ commit }, key) {
    commit(RESET_PART_STORE, key);
  },
  // 更改用户状态
  async statusAction({ }, data) {
    const options = {
      method: 'PUT'
    }
    try {
      const res = await manageApi('/api/v1/admin/members',{ phone: data.phone, status: data.status },options);
      if (res.data.status === 200) {

      } else {
        data.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      console.log(error)
      data.that.$message({
        message: "连接超时，数据提交失败！",
        type: 'warning'
      })
    }
  },
  // 获取会员列表
  async getUserListAction({ commit }, data) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    const options = {
      method: 'GET'
    }
    try {
      const res = await manageApi(`/api/v1/admin/members`, { page: data.page, limit: 6 }, options);
      if (res.data.status === 200) {
        commit(GET_INFO_LIST, { infoList: res.data.data.data });
        commit(GET_TOTLE_PAGE, res.data.data.pages);
      } else {
        data.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      data.that.$message({
        message: "数据请求超时，请刷新重试！",
        type: 'warning'
      })
    }

    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  },
  // 搜索会员
  async searchUserAction({ commit }, data) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    const options = {
      method: 'GET'
    }
    try {
      const res = await manageApi(`/api/v1/admin/members`,{ type: data.type, keyword: data.keyword })
      if (res.data.status === 200) {
        commit(GET_INFO_LIST, { infoList: res.data.data.data });
        commit(GET_TOTLE_PAGE, res.data.data.pages);
      } else {
        data.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      data.that.$message({
        message: "数据请求超时，请刷新重试！",
        type: 'warning'
      })
    }
    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  }
}