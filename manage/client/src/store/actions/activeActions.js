import { manageApi } from '../../http/re-api';
import {
	ADD_ACTIVE,
	ADD_ACTIVE_LIST,
	ADD_ACTIVE_DETAIL,
	ADD_UPLOAD_TOKEN,
	HANDLE_LOGIN_LOADING,
	EDIT_ONE_ACTIVE,
	DELETE_ACTIVE
} from '../mutationType';

export default {
	async createActiveAction({ commit }, obj) {
		const options = {
			method: 'POST'
		}
		const res = await manageApi('/api/v1/admin/activity', obj.data, options)
		try {
			if (res.data.status === 200) {
				commit(ADD_ACTIVE, obj.that)
				obj.that.$message({
					message: "创建成功",
					type: 'success'
				})
				obj.that.goods_id = []
				obj.that.img.cover = ''
				obj.that.img.detail = ''
				obj.that.img.data_cover = ''
				obj.that.img.data_detail = ''
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
	// 获取活动列表
	async getActiveListAction({ commit }, obj) {
		commit(HANDLE_LOGIN_LOADING, { isLoading: true });
		try {
			const res = await manageApi('/api/v1/admin/activity', obj.data)
			if (res.data.status == 200) {
				commit(ADD_ACTIVE_LIST, res.data.data)
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
	// 编辑活动是否上下架
	async editShelfAction({ commit }, obj) {
		const options = {
			method: 'PUT'
		}
		try {
			const res = await manageApi(`/api/v1/admin/activity/${obj.data.id}`, { isShelf: obj.data.isShelf }, options)
			if (res.data.status === 200 && res.data.data == "上架成功" || res.data.data == "下架成功") {
				obj.that.$message({
					message: '修改成功',
					type: 'success'
				})
			} else if (res.data.status === 200 && res.data.data == "已经有上线活动") {
				obj.that.$message({
					message: '活动只能同时存在一个',
					type: 'warn'
				})
				//  传活动的id过去  找到这个活动将他的值改为 0
				commit(EDIT_ONE_ACTIVE, obj)
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
	//删除活动
	async deleteActiveAction({ commit }, obj) {
		const options = {
			method: 'DELETE'
		}
		try {
			const res = await manageApi(`/api/v1/admin/activity/${obj.id}`,{},options)
			if (res.data.status === 200) {
				commit(DELETE_ACTIVE, obj)
				obj.that.$message({
					message: '删除成功',
					type: 'success'
				})
			} else {
				obj.that.$message({
					message: '删除失败',
					type: 'error'
				})
			}
		}
		catch (error) {
			obj.that.$message({
				message: "数据请求超时，请刷新重试！",
				type: 'warning'
			})
		}
	},
	// 编辑活动信息
	async editActiveInfoAction({ commit }, obj) {
		const options = {
			method: 'PUT'
		}
		const res = await manageApi(`/api/v1/admin/activityInfo/${obj.id}`, obj.data, { method: 'PUT' })
		if (res.data.status === 200) {
			obj.that.$message({
				message: '修改成功',
				type: 'success'
			})
			obj.that.$router.push({ path: "/showActive" })
			obj.that.goods_id = []
			obj.that.img.cover = ''
			obj.that.img.detail = ''
			obj.that.img.data_cover = ''
			obj.that.img.data_detail = ''
		} else {
			obj.that.$message({
				message: '修改失败',
				type: 'error'
			})
		}
	},
	//删除活动
	async deleteActiveAction({ commit }, obj) {
		try {
			const res = await manageApi(`/api/v1/admin/activity/${obj.id}`,{},{method: 'DELETE'})
			if (res.data.status === 200) {
				commit(DELETE_ACTIVE, obj)
				obj.that.$message({
					message: '删除成功',
					type: 'success'
				})
			} else {
				obj.that.$message({
					message: '删除失败',
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
	// 获取活动详情
	async getActiveDetailAction({ commit }, obj) {
		commit(HANDLE_LOGIN_LOADING, { isLoading: true });
		try {
			const res = await manageApi(`/api/v1/admin/activity/${obj.id}`)
			if (res.data.status === 200) {
				commit(ADD_ACTIVE_DETAIL, res.data.data)
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