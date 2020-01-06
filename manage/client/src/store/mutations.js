import {
  HANDLE_LOGIN,
  HANDLE_LOGIN_LOADING,
  HANDLE_IS_NO_DATA,
  GOODS_LIST,
  All_GOODS,
  DELETE_GOODS,
  GO_DETAIL,
  GET_INFO_LIST,
  GET_TOTLE_PAGE,
  RESET_PART_STORE,
  ORDER_LIST,
  SEARCH_ORDER_LIST,
  ADD_ACTIVE,
  ADD_ACTIVE_ID,
  DELETE_ACTIVE,
  ADD_ACTIVE_LIST,
  EDIT_ACTIVE,
  ADD_ACTIVE_DETAIL,
  ADD_UPLOAD_TOKEN,
  ADD_PAGE,
  ADD_ROWS,
  ADD_ORDER_PAGE,
  ADD_ORDER_ROWS,
  ORDER_DETAIL,
  EDIT_ORDER_INFO,
  ADD_ACTIVE_PAGE,
  ADD_ACTIVE_ROWS,
  ADD_SEARCH_PAGE,
  ADD_SEARCH_ROWS,
  EDIT_ONE_ACTIVE,
} from './mutationType';
export default {
  // 登录
  [HANDLE_LOGIN](state, userInfo) {
    state.userInfo = userInfo
  },
  // 商品列表
  [GOODS_LIST](state, data) {
    state.searchGoods = data.products
    state.searchGoodsTotal = data.sum
  },
  // 控制loading
  [HANDLE_LOGIN_LOADING](state, isLoading) {
    state.isLoading = isLoading.isLoading
  },
  [All_GOODS] (state, list) {
    state.goodsList = list.products
    state.total = list.sum
  },
  [DELETE_GOODS] (state, obj) {
    if(obj.name === 'search'){
     state.searchGoodsTotal = state.searchGoodsTotal - 1
     state.searchGoods.map((item,index) => {
       if(item.id == obj.index){
         state.searchGoods.splice(index,1)
       }
     })
     if(state.searchGoodsTotal%10 == 0){
        obj.that.$router.go(0)
     }
    } else {
      state.total = state.total -1
      state.goodsList.map((item,index) => {
        if(item.id == obj.index){
          state.goodsList.splice(index,1)
        }
      })
      if(state.total%10 == 0){
        obj.that.$router.go(0)
      }
    }
  },
  [EDIT_ONE_ACTIVE](state, obj){
    state.activeList.map( (item, index) => {
      if(item.id == obj.data.id){
        item.isShelf = false
      }
    })
  },
  [DELETE_ACTIVE] (state, obj) {
      state.activeTotal = state.activeTotal - 1
      state.activeList.map((el,index) => {
        if(el.id == obj.id){
          state.activeList.splice(index,1)
        }
      })
      if(state.activeTotal%10 == 0){
        obj.that.$router.go(0)
     }
  },
  [ADD_PAGE](state, pageValue){
    state.page = pageValue
  },
  [ADD_ROWS](state, rowsValue){
    state.rows = rowsValue
  },
  [ADD_SEARCH_PAGE](state, pageValue){
    state.searchGoodsPage = pageValue
  },
  [ADD_SEARCH_ROWS](state, pageValue){
    state.searchGoodsRows = pageValue
  },
  [ADD_ACTIVE_PAGE](state, pageValue){
    state.activePage = pageValue
  },
  [ADD_ACTIVE_ROWS](state, pageValue){
    state.activeRows = pageValue
  },
  [ADD_ORDER_PAGE](state, pageValue){
    state.orderPage = pageValue
  },
  [ADD_ORDER_ROWS](state, pageValue){
    state.orderRows = pageValue
  },
  [ADD_ACTIVE_LIST](state,list){
    state.activeList = list.activities
    state.activeTotal = list.sum
  },
  [EDIT_ACTIVE](state,that){
    that.$message({
      message:'修改成功',
      type:'success'
    })
  },
  [ADD_ACTIVE_ID](state,obj){
     obj.that.$router.push({path: '/activeDetail'})
     state.active_id = obj.id
  },
  [ADD_ACTIVE_DETAIL](state, list){
    state.active_detail = list
  },
  [GET_INFO_LIST] (state, infoList) {
    state.infoList = infoList.infoList
  },
  // 获取总页数
  [GET_TOTLE_PAGE] (state, totlePage) {
    state.totlePage = totlePage
  },
  [HANDLE_IS_NO_DATA](state, flag) {
    state.isNoData = flag
  },
  // 商品详情
  [GO_DETAIL](state, list) {
    let arr = []
    arr.push(list)
    arr.map( item => {
      switch (item.tag) {
        case 1:
          item.tag = '个人护理';
          break;
        case 2:
          item.tag = '日用百货';
          break;
        case 3:
          item.tag = '生鲜冷藏';
          break;
        case 4:
          item.tag = '乳饮酒水';
          break;
        case 5:
          item.tag = '面点素食';
          break;
        case 6:
          item.tag = '数码家电';
          break;
        case 7:
          item.tag = '家用纺织';
          break;
        case 8:
          item.tag = '坚果蜜饯';
          break;
        case 9:
          item.tag ='纸品家清';
          break;
        case 10:
          item.tag ='粮油米面';
          break;
      }
      switch (item.isShelf) {
        case true:
          item.isShelf = "上架";
          break;
        case false:
          item.isShelf = "下架";
          break;
      }
      switch (item.isRecommend) {
        case true:
          item.isRecommend = "推荐";
          break;
        case false:
          item.isRecommend = "不推荐"
      }
    })
    state.goods_detail = arr
  },
  // 订单列表
  [ORDER_LIST] (state,list) {
    list.orderList.map((item) => {
      switch(item.status){
        case 1:
          item.status = '待付款';
          break;
        case 2:
          item.status = '已付款/待发货';
          break;
        case 3:
          item.status = '已发货/未收货';
          break;
        case 4:
          item.status = '已收货';
          break;
        case 5:
          item.status = '失效订单';
          break;
        case 6:
          item.status = '已收货'
          break;
        case 7:
          item.status = '申请退款'
          break;
        case 8:
          item.status = '请快速发货'
          break;
      }
    })
    state.order_list = list.orderList
    state.orderTotal = list.sum
  },
  [ORDER_DETAIL](state, obj){
    let products = obj.products
    products.map(item => {
      switch(item.status){
        case 0:
          item.status = "退款成功";
          break;
        case 1:
          item.status = "正常";
          break;
        case 2:
          item.status = "申请退款"
      }
    })
    obj.products = products
    let arr = []
    arr.push(obj)
    state.order_detail = arr
  },
  [SEARCH_ORDER_LIST] (state, list) {
    list.map( (item) => {
      switch(item.status){
        case 1:
          item.status = '待付款';
          break;
        case 2:
          item.status = '已付款/待发货';
          break;
        case 3:
          item.status = '已发货/未收货';
          break;
        case 4:
          item.status = '已收货';
          break;
        case 5:
          item.status = '失效订单';
          break;
        case 6:
          item.status = '已收货'
          break;
        case 7:
          item.status = '申请退款'
          break;
        case 8:
          item.status = '请快速发货'
      }
    })
    state.searchOrderList = list
  },
  [ADD_ACTIVE](state,that){
    that.$router.push({path: '/showActive'})
  },
   [ADD_UPLOAD_TOKEN](state, data){
     state.token_data = data
   },
   [EDIT_ORDER_INFO](state, obj){
     if(obj.name == 'show'){
      state.order_list.map(el => {
        if(el.oid == obj.data.oid && obj.data.status == '3'){
          el.status = "已发货/未收货"
        }else if(el.oid == obj.data.id && obj.data.status == '5'){
          el.status = "失效订单"
        }
      })
     }else{
      state.searchOrderList.map(el => {
        if(el.oid == obj.data.oid && obj.data.status == '3'){
          el.status = "已发货/未收货"
        }else if(el.oid == obj.data.id && obj.data.status == '5'){
          el.status = "失效订单"
        }
      })
     }
   },
   // 管理员列表
  [GET_INFO_LIST](state, infoList) {
    state.infoList = infoList.infoList
  },
  // 获取总页数
  [GET_TOTLE_PAGE](state, totlePage) {
    state.totlePage = totlePage
  },
  // 重置部分store数据
  [RESET_PART_STORE](state, key) {
    state[key] = [];
  }
}
