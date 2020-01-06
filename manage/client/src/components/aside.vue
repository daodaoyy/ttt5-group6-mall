<template>
  <el-container style="height: 100%;border: 1px solid #eee;">
    <el-aside
      width="200px"
      style="background-color: rgb(238, 241, 246)"
    >
      <el-menu
        :default-active="this.$route.path"
        :unique-opened="isunique"
        router
      >
        <el-submenu
          v-show="role == 1"
          index="/showAdmin"
        >
          <template slot="title">
            <i class="el-icon-user" />管理员管理
          </template>
          <el-menu-item-group>
            <router-link
              class="link"
              to="/showAdmin"
            >
              <el-menu-item index="/showAdmin">
                管理员展示
              </el-menu-item>
            </router-link>
            <router-link
              class="link"
              to="/addAdmin"
            >
              <el-menu-item index="/addAdmin">
                添加管理员
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/showUser">
          <template slot="title">
            <i class="el-icon-menu" />会员管理
          </template>
          <el-menu-item-group>
            <router-link
              class="link"
              to="/showUser"
            >
              <el-menu-item index="/showUser">
                会员展示
              </el-menu-item>
            </router-link>
            <router-link
              class="link"
              to="/searchUser"
            >
              <el-menu-item index="/searchUser">
                查找会员
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/showGoods">
          <template slot="title">
            <i class="el-icon-goods" />商品管理
          </template>
          <el-menu-item-group>
            <router-link
              class="link"
              to="/showGoods"
            >
              <el-menu-item index="/showGoods">
                商品展示
              </el-menu-item>
            </router-link>
            <router-link 
              class="link"
              to="/addGoods"
            >
              <el-menu-item index="/addGoods">
                增加商品
              </el-menu-item>
            </router-link>
            <router-link
              class="link"
              to="/searchGoods"
            >
              <el-menu-item index="/searchGoods">
                查找商品
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/showOrder">
          <template slot="title">
            <i class="el-icon-shopping-cart-1" />订单管理
          </template>
          <el-menu-item-group>
            <router-link
              class="link"
              to="/showOrder"
            >
              <el-menu-item index="/showOrder">
                订单展示
              </el-menu-item>
            </router-link>
            <router-link
              class="link"
              to="/searchOrder"
            >
              <el-menu-item index="/searchOrder">
                查找订单
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/showActive">
          <template slot="title">
            <i class="el-icon-video-camera" />活动管理
          </template>
          <el-menu-item-group>
            <router-link
              class="link"
              to="/showActive"
            >
              <el-menu-item index="/showActive">
                活动展示
              </el-menu-item>
            </router-link>
            <router-link
              class="link"
              to="/addActive"
            >
              <el-menu-item index="/addActive">
                增加活动
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isunique: true,
      role: 0
    };
  },
  mounted() {
    const role = localStorage.getItem('role');
    this.role = role
  },
  methods: {
    handleOpen(key) {
      handleIndex(key, this);
    }
  },
};

const handleIndex = (key, that) => {
  console.log(that.defaultActiveMenu)
  switch (key) {
    case "/showAdmin":
      that.defaultActiveMenu="/showAdmin";
      // that.defaultActiveItem = "/showAdmin";
      break;
    case "/showUser":
      that.defaultActiveMenu= "/showUser";
      // that.defaultActiveItem = "/showUser";
      break;
    case "/showGoods":
      that.defaultActiveMenu= "/showGoods";
      // that.defaultActiveItem = "/showGoods";
      break;
    case "/showOrder":
      that.defaultActiveMenu= "/showOrder";
      // that.defaultActiveItem = "/showOrder";
      break;
    case "/showActive":
      that.defaultActiveMenu= "/showActive";
      // that.defaultActiveItem = "/showActive";
      break;
    default:
      that.defaultActiveMenu= "/showAdmin";
      // that.defaultActiveItem = "/showAdmin";
      break;
  }
};
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
}
.link {
  text-decoration: none;
  color: #303133;
}
</style>