import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('../pages/login');
const Home = () => import('../pages/home');
const AddActive = () => import('../pages/activeManage/addActive');
const ShowActive = () => import('../pages/activeManage/showActive');
const AddAdmin = () => import('../pages/adminManage/addAdmin');
const ShowAdmin = () => import('../pages/adminManage/showAdmin');
const AddGoods = () => import('../pages/goodsManage/addGoods');
const SearchGoods = () => import('../pages/goodsManage/searchGoods');
const ShowGoods = () => import('../pages/goodsManage/showGoods');
const DetailGoods = () => import('../pages/goodsManage/detailGoods');
const EditGoods = () => import('../pages/goodsManage/editGoods');
const SearchOrder = () => import('../pages/orderManage/searchOrder');
const ShowOrder = () => import('../pages/orderManage/showOrder');
const OrderDetail = () => import('../pages/orderManage/orderDetail');
const SearchUser = () => import('../pages/userManage/searchUser');
const ShowUser = () => import('../pages/userManage/showUser');
const EditActive = () => import('../pages/activeManage/editActive');
const ActiveDetail =() => import('../pages/activeManage/activeDetail');

Vue.use(VueRouter);

const routes = [
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "/showAdmin",
          name: "showAdmin",
          component: ShowAdmin
        },
        {
          path: "/addAdmin",
          name: "addAdmin",
          component: AddAdmin
        },
        {
          path: "/showUser",
          name: "showUser",
          component: ShowUser
        },
        {
          path: "/searchUser",
          name: "searchUser",
          component: SearchUser
        },
        {
          path: "/addGoods",
          name: "addGoods",
          component: AddGoods
        },
        {
          path: "/showGoods",
          name: "showGoods",
          component: ShowGoods
        },
        {
          path: "/searchGoods",
          name: "searchGoods",
          component: SearchGoods
        },
        {
           path: '/detailGoods',
           name: 'detailGoods',
           component: DetailGoods
        },
        {
           path: '/editGoods',
           name: 'editGoods',
           component: EditGoods
        },
        {
          path: "/showOrder",
          name: "showOrder",
          component: ShowOrder
        },
        {
          path: "/searchOrder",
          name: "searchOrder",
          component: SearchOrder
        },
        {
          path: "/orderDetail",
          name: "orderDetail",
          component: OrderDetail
        },
        {
          path: "/showActive",
          name: "showActive",
          component: ShowActive
        },
        {
          path: "/addActive",
          name: "addActive",
          component: AddActive
        },
        {
          path: "/editActive",
          name: "editActive",
          component: EditActive
        },
        {
          path: "/activeDetail",
          name: "activeDetail",
          component: ActiveDetail
        },
      ]
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
  ];
  
  const router = new VueRouter({
    base: "/",
    mode: "history",
    routes
  });

  // 路由守卫
  router.beforeEach(function (to, from, next) {
    const role = localStorage.getItem('role');
    let cookie = document.cookie.indexOf('user_token=');
    if(cookie !== -1){
      if(to.path === '/') {
        if(role === 1) {
          next('/showAdmin');
        } else {
          next('/showUser')
        }
      } else {
        next()
      }
    } else {
      if(to.path === '/') {
        next()
      } else {
        next('/');
      }
    }
  })
  
  export default router;