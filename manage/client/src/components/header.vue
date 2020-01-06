<template>
  <div>
    <div class="logo">
      <i class="el-icon-ship" />
    </div>
    <div
      @click="handleLogout"
      class="admin"
    >
      <i class="el-icon-switch-button" />
      <span>安全退出</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ManageHeader",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logoutAction"]),
    handleLogout() {
      this.logoutAction(this);
    }
  }
};
</script>

<style scoped>
.logo,
.admin {
  display: inline-block;
  cursor: pointer;
  color: #303133;
}
.logo {
  margin-left: 30px;
}
.admin {
  float: right;
  margin-right: 30px;
  font-size: 14px;
}
</style>