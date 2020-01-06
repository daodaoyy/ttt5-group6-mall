import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import logActions from './actions/logAction';
import adminActions from './actions/adminActions';
import userActions from './actions/userActions';
import goodsActions from './actions/goodsActions';
import orderActions from './actions/orderActions';
import activeActions from './actions/activeActions';

Vue.use(Vuex);


const logModule = {
  state: {
    isLoading: false,
  },
  mutations: mutations,
  actions: logActions
}

const adminModule = {
  state: {
    isLoading: false,
    isNoData: false,
    infoList: [],
    totlePage: 1,
  },
  mutations: mutations,
  actions: adminActions
}

const userModule = {
  state: {
    isLoading: false,
    infoList: [],
    totlePage: 1,
  },
  mutations: mutations,
  actions: userActions
}

const goodsModule = {
  state: {
    searchGoods: [],
    goodsList: [],
    goods_detail: [],
    order_detail: [],
    isLoading: false,
    infoList: [],
    totlePage: 1,
    token_data: '1',
    activeList: [],
    active_detail: {},
    // 分页
    list: [],
    page: 1,
    rows: 10,
    total: 0,
    searchGoodsPage: 1,
    searchGoodsRows: 10,
    searchGoodsTotal: 0,
  },
  mutations: mutations,
  actions:goodsActions
  }

 const orderModule = {
  state: {
    order_detail: [],
    order_list: [],
    isLoading: false,
    searchOrderList: [],
    orderPage: 1,
    orderRows: 10,
    orderTotal: 0,
  },
  mutations: mutations,
  actions: orderActions
}

const activeModule = {
  state: {
    isLoading: false,
    token_data: '1',
    activeList: [],
    active_detail:{},
    activePage: 1,
    activeRows: 10,
    activeTotal: 0,
  },
  mutations: mutations,
  actions: activeActions
}


export default new Vuex.Store({
  modules: {
    log: logModule,
    admin: adminModule,
    user: userModule,
    goods: goodsModule,
    order: orderModule,
    active: activeModule,
  }
})