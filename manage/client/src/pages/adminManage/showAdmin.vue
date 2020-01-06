<template>
  <div>
    <div
      v-loading="admin.isLoading"
      class="listshow"
      element-loading-text="数据加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0,0)"
    />
    <div
      v-if="admin.isNoData"
      class="no-data"
    >
      暂无其他管理员
    </div>
    <template v-for="item in admin.infoList">
      <div
        :key="item.id"
        class="admin-cards"
      >
        <div class="cards-show">
          <img
            src="https://www.gravatar.com/avatar/1a47bad4413bbd9ff14edc4df00729f2?s=46&d=identicon"
            alt="s"
            class="photo"
          >
          <div class="admin-desc">
            <div>管理员名称：{{ item.username }}</div>
            <div>
              身份：
              <i v-if="item.role===0">普通管理员</i>
              <i v-else>超级管理员</i>
            </div>
          </div>
        </div>
        <div class="cards-action">
          <span class="status">
            状态：
            <el-switch
              v-model="item.status"
              :active-value="2"
              :inactive-value="1"
              @change="handleStatus(item.username,item.status)"
              value
              active-color="#dcdfe6"
              inactive-color="#409eff"
              active-text="禁用"
              inactive-text="正常"
            />
          </span>
          <span class="role">
            权限：
            <el-switch
              v-model="item.role"
              :active-value="0"
              @change="handleRole(item.username,item.role)"
              :inactive-value="1"
              value
              active-color="#dcdfe6"
              inactive-color="#409eff"
              active-text="普管"
              inactive-text="超管"
            />
          </span>
          <span
            @click="changPass(item.username)"
            class="change-btn"
          >
            修改密码
          </span>
          <span
            @click="delAdmin(item.username)"
            class="del-btn"
          >
            删除账号
          </span>
        </div>
      </div>
    </template>
    <el-pagination
      v-show="admin.infoList.length !== 0"
      :total="admin.totlePage*10"
      @current-change="getPageNum"
      @prev-click="getPageNum"
      @next-click="getPageNum"
      class="pages"
      background
      layout="prev, pager, next"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      pageNum: 1,
      userName: ""
    };
  },
  computed: {
    // ...mapState(["isLoading", "infoList", "totlePage"])
    ...mapState({
      admin: state => state.admin
    })
  },
  created() {
    handleGetList(this, 1);
    this.userName = localStorage.getItem("user_name");
  },
  beforeDestroy() {
    this.resetListAction("infoList");
  },
  methods: {
    ...mapActions([
      "getAdminListAction",
      "statusAdminAction",
      "roleAction",
      "delAdminAction",
      "changePassAction",
      "resetListAction"
    ]),
    // 管理员状态更改
    handleStatus(username, status) {
      this.statusAdminAction({ username, status, that: this });
    },
    // 管理员权限更改
    handleRole(username, role) {
      this.roleAction({ username, role, that: this });
    },
    // 删除管理员
    delAdmin(username) {
      handleDel(this, username, this.pageNum);
    },
    // 修改密码
    changPass(username) {
      handleChangePass(this, username);
    },
    // 获取page
    getPageNum(val) {
      this.pageNum = val;
      this.getAdminListAction({ page: val, this: this });
    }
  },
};
// 获取管理员数据
const handleGetList = (that, page) => {
  that.getAdminListAction({ that, page });
};
const handleDel = (that, username, pageNum) => {
  that
    .$confirm("此操作将永久删除管理员, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
    .then(() => {
      that.delAdminAction({ that, username, page: pageNum });
    })
    .catch(() => {
      that.$message({
        type: "info",
        message: "已取消删除"
      });
    });
};
const handleChangePass = (that, username) => {
  that
    .$prompt("新密码", "密码修改", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPattern: /^[A-Za-z0-9_]+$/,
      inputErrorMessage: "密码由数字字母下划线组成"
    })
    .then(({ value }) => {
      that.changePassAction({ username, value, that });
    })
    .catch(() => {
      that.$message({
        type: "info",
        message: "取消输入"
      });
    });
};
</script>

<style scoped>
i {
  font-weight: 700;
}
span {
  font-size: 14px;
  font-weight: 700;
}
.no-data{
  text-align: center;
  line-height: 50px;
  color:#CCC;
  font-size: 24px;
}
.admin-cards {
  width: 324px;
  height: 190px;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 5px;
  padding: 10px;
  box-sizing: border-box;
  display: inline-block;
  box-shadow: -5px 7px 7px 0 rgba(7, 17, 27, 0.06);
  background-image: url("../../images/adminbg.jpg");
}
.cards-action {
  text-align: center;
  /* padding-left: 90px; */
}
.status,
.role {
  display: block;
  margin-top: 10px;
  padding-left: 5px;
}
.photo {
  height: 70px;
  widows: 70px;
  border-radius: 35px;
  overflow: hidden;
}
.pages {
  text-align: end;
  margin-right: 150px;
}
.change-btn,
.del-btn {
  display: inline-block;
  border-radius: 20px;
  padding: 5px 15px;
  font-weight: inherit;
  cursor: pointer;
  /* margin-top: 10px; */
  margin: 10px 5px;
}
.change-btn {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.change-btn:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.del-btn {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.del-btn:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.admin-desc {
  width: 200px;
  line-height: 25px;
  font-size: 14px;
  margin-left: 25px;
  color: #303133;
  display: inline-block;
  word-wrap: break-word;
  word-break: break-all;
}
.cards-show {
  display: flex;
  align-items: center;
}
</style>