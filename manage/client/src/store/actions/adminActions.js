import {
  manageApi
} from '../../http/re-api';

import {
  HANDLE_LOGIN_LOADING,
  GET_INFO_LIST,
  GET_TOTLE_PAGE,
  RESET_PART_STORE,
  HANDLE_IS_NO_DATA,
} from '../mutationType';

export default {
  // 获取管理员数据
  async getAdminListAction({ commit }, data) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    const options = {
      method: 'GET',
    }
    try {
      const res = await manageApi(`/api/v1/admin/users`, { page: data.page, limit: 6 }, options);
      if (res.data.status === 200) {
        if (res.data.pages !== 1 && res.data.data.length !== 1) {
          commit(GET_INFO_LIST, { infoList: res.data.data.data });
          commit(GET_TOTLE_PAGE, res.data.data.pages);
        } else {
          commit(HANDLE_IS_NO_DATA, true)
        }
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
  // 更改管理员状态
  async statusAdminAction({ }, data) {
    const options = {
      method: 'PUT',
    }
    try {
      let res = await manageApi('/api/v1/admin/users', { username: data.username, status: data.status }, options);
      if (res.data.status === 200) {

      } else {
        data.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      data.that.$message({
        message: "连接超时，数据提交失败！",
        type: 'warning'
      })
    }
  },
  // 更改管理员权限
  async roleAction({ }, data) {
    const options = {
      method: 'PUT',
    }
    try {
      const res = await manageApi('/api/v1/admin/users', { username: data.username, role: data.role }, options);
      if (res.data.status === 200) {

      } else {
        data.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      data.that.$message({
        message: "连接超时，数据提交失败！",
        type: 'warning'
      })
    }
  },
  // 删除管理员
  async delAdminAction({ commit }, data) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    const options = {
      method: 'DELETE',
    }
    try {
      const delmessage = await manageApi(`/api/v1/admin/users/${data.username}`, {}, options);
      if (delmessage.status === 200) {
        let getmessage = await manageApi(`/api/v1/admin/users`, { page: data.page, limit: 6 });
        if (getmessage.data.status === 200) {
          if (getmessage.data.data.data.length === 0) {
            getmessage = await manageApi(`/api/v1/admin/users`, { page: data.page - 1, limit: 6 });
            if (getmessage.data.status === 200) {
              commit(GET_INFO_LIST, { infoList: getmessage.data.data.data });
              commit(GET_TOTLE_PAGE, getmessage.data.data.pages);
            } else {
              data.that.$message({
                message: getmessage.data.message,
                type: 'error'
              })
            }
          } else {
            commit(GET_INFO_LIST, { infoList: getmessage.data.data.data });
            commit(GET_TOTLE_PAGE, getmessage.data.data.pages);
          }
        }
      } else {
        data.that.$message({
          message: getmessage.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      data.that.$message({
        message: "连接超时，数据提交失败！",
        type: 'warning'
      })
    }
    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  },
  // 修改管理员密码
  async changePassAction({ commit }, data) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    const options = {
      method: 'PUT',
    }
    try {
      const res = await manageApi('/api/v1/admin/users', { username: data.username, password: data.value }, options);
      if (res.data.status === 200) {
        data.that.$message({
          message: "密码修改成功，请及时告知相关人员",
          type: 'success'
        })
      } else {
        data.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      data.that.$message({
        message: "连接超时，数据提交失败！",
        type: 'warning'
      });
    }
    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  },
  // 增加管理员
  async addAdminAction({ commit }, data) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    const options = {
      method: 'POST',
    };
    try {
      const res = await manageApi('/api/v1/admin/users/join',{ username: data.username, password: data.password },options);
      if (res.data.status === 200) {
        data.that.$message({
          message: '添加成功！',
          type: 'success'
        })
        data.that.$refs[data.formName].resetFields();
      } else {
        data.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      data.that.$message({
        message: "连接超时，数据提交失败！",
        type: 'warning'
      });
    }
    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  },
  // 组件销毁前重置state
  resetListAction({ commit }, key) {
    commit(RESET_PART_STORE, key);
    commit(HANDLE_IS_NO_DATA, false);
  },
}