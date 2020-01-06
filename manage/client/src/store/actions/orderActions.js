import { manageApi } from '../../http/re-api';
import {
	ORDER_LIST,
	SEARCH_ORDER_LIST,
	ORDER_DETAIL,
	EDIT_ORDER_INFO,
	HANDLE_LOGIN_LOADING,
} from '../mutationType';

export default {
	// 获取订单 
	async getOrderListAction({ commit }, obj) {
		commit(HANDLE_LOGIN_LOADING, { isLoading: true });
		try {
			const res = await manageApi('/api/v1/admin/orders', obj.data)
			if (res.data.status === 200) {
				commit(ORDER_LIST, res.data.data)
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
	// 修改订单状态
	async editOrderAction({ commit }, obj) {
		const options = {
			method: 'PUT'
		}
		const data = {
			oid: obj.data.oid,
			status: obj.data.status,
		}
		try {
			const res = await manageApi('/api/v1/admin/orders', data, options)
			if (res.data.status === 200) {
				commit(EDIT_ORDER_INFO, obj)
				obj.that.$message({
					message: '修改成功',
					type: 'success'
				})
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
	// 查询订单
	async searchOrderAction({ commit }, obj) {
		commit(HANDLE_LOGIN_LOADING, { isLoading: true });
		try {
			const res = await manageApi('/api/v1/admin/orders', obj.data)
			if (res.data.status === 200 && res.data.data.orderList.length !== 0) {
				commit(SEARCH_ORDER_LIST, res.data.data.orderList)
			} else {
				obj.that.$message({
					message: '未搜索到输入的订单',
					type: 'warn'
				})
				obj.that.input = ''
			}
		} catch (error) {
			obj.that.$message({
				message: "数据请求超时，请刷新重试！",
				type: 'warning'
			})
		}
		commit(HANDLE_LOGIN_LOADING, { isLoading: false });
	},
	// 获取订单详情
	async getOrderDetailAction({ commit }, obj) {
    const options = {
      method: 'GET'
    }
    try {
      const res = await manageApi(`/api/v1/admin/orders/${obj.data.id}`)
      if (res.data.status === 200) {
        commit(ORDER_DETAIL, res.data.data)
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
	// 编辑商品信息
	async editGoodsStatusAction({ commit }, obj) {
    const options = {
      method: 'PUT'
    }
    const res = await manageApi(`/api/v1/admin/orders/${obj.id}`,obj.data,options);
    if (res.data.status === 200) {
      obj.that.$message({
        message: '退货成功',
        type: 'success'
      })
    }
    obj.that.$router.push({ path: '/showOrder' })
  }
}