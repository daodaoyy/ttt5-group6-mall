import { manageApi } from '../../http/re-api';
import {
  All_GOODS,
  GOODS_LIST,
  GO_DETAIL,
  DELETE_GOODS,
  ADD_UPLOAD_TOKEN,
  HANDLE_LOGIN_LOADING,
} from '../mutationType';

export default {
  // 搜索商品
  async searchGoodsAction({ commit }, obj) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    const options = {
      method: 'GET'
    }
    const data = { page: obj.page, limit: obj.rows, title: obj.title }
    try {
      const res = await manageApi('/api/v1/admin/products', data, options)
      if (res.data.status === 200 && res.data.data.products.length !== 0) {
        commit(GOODS_LIST, res.data.data)
        if (obj.name == 'active') {
          res.data.data.products.map(item => {
            let goods_id = obj.goods_id !== undefined ? obj.goods_id : []
            for (let i = 0; i < goods_id.length; i++) {
              if (goods_id[i] == item.id) {
                item.checked = true
              } else {
                item.checked = false
              }
            }
          })
          obj.that.searchTableData = res.data.data.products
        }
      } else {
        obj.that.$message({
          message: "暂未为找到您要搜索的商品",
          type: 'warn'
        })
      }
    } catch (error) {
      obj.that.$message({
        message: "数据请求超时，请刷新重试！",
        type: 'warning'
      })
    }
    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  },
  // 查看详情
  async getGoodsDetailAction({ commit }, obj) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    try {
      const res = await manageApi(`/api/v1/admin/products/${obj.id}`, {})
      if (res.data.status === 200) {
        commit(GO_DETAIL, res.data.data)
      } else {
        obj.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      obj.that.$message({
        message: "数据请求超时，请刷新重试！",
        type: 'warning'
      })
    }
    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  },
  // 删除商品
  async DeleteGoodsAction({ commit }, obj) {
    const options = {
      method: 'DELETE'
    };
    const res = await manageApi(`/api/v1/admin/products/${obj.id}`, {}, options)
    if (res.data.status === 200) {
      commit(DELETE_GOODS, obj)
      obj.that.$message({
        message: '删除成功',
        type: 'success'
      })
    }
  },
  //获取展示商品
  async getAllGoodsAction({ commit }, obj) {
    commit(HANDLE_LOGIN_LOADING, { isLoading: true });
    try {
      const res = await manageApi(`/api/v1/admin/products`, { page: obj.data.page, limit: obj.data.rows })
      if (res.data.status === 200) {
        commit(All_GOODS, res.data.data)
        if (obj.data.name == 'active') {
          res.data.data.products.map(item => {
            item.checked = false
          })
          obj.that.tableData = obj.that.tableData.concat(res.data.data.products)
        }
      } else {
        obj.that.$message({
          message: res.data.message,
          type: 'warn'
        })
      }
    } catch (error) {
      obj.that.$message({
        message: "数据请求超时，请刷新重试！",
        type: 'warning'
      })
    }
    commit(HANDLE_LOGIN_LOADING, { isLoading: false });
  },
  // 增加商品
  async addGoodsAction({ commit }, obj) {
    const options = {
      method: 'POST'
    }
    try {
      const res = await manageApi('/api/v1/admin/products', obj.data, options)
      if (res.data.status === 200) {
        obj.that.$message({
          message: "添加商品成功",
          type: 'success'
        })
        obj.that.$router.push({ path: '/showGoods' })
      } else {
        obj.that.$message({
          message: res.data.message,
          type: 'error'
        })
      }
    } catch (error) {
      obj.that.$message({
        message: "数据请求超时，请刷新重试！",
        type: 'warning'
      })
    }
  },
  // 编辑商品
  async editGoodsAction({ commit }, obj) {
    const options = {
      method: 'PUT'
    }
    const res = await manageApi(`/api/v1/admin/products/${obj.id}`, obj.data, options)
    if (res.data.status === 200) {
      if (obj.name == 'search') {
        obj.that.$message({
          message: "编辑商品信息成功",
          type: 'success'
        })
      } else {
        obj.that.$message({
          message: "编辑商品信息成功",
          type: 'success'
        })
        obj.that.$router.push({ path: "/showGoods" })
      }
    }
  },
  async getTokenAction({ commit }, obj) {
    const options = {
      method: 'POST'
    }
    const res = await manageApi('/api/v1/basic/qiniu', { "bucket": 'vadxq' }, options);
    if (res.data.status === 200) {
      commit(ADD_UPLOAD_TOKEN, res.data.data)
    }
  },
}