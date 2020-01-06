<template>
  <div>
    <div
      v-loading="user.isLoading"
      class="listshow"
      element-loading-text="数据加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0,0)"
    />
    <div
      v-for="item in user.infoList"
      :key="item.id"
      class="admin-cards"
    >
      <div class="cards-show">
        <img
          :src="item.avatar"
          alt="s"
          class="photo"
        >
        <div class="admin-desc">
          <div>昵称：{{ item.nickname }}</div>
          <div>
            等级：
            <i class="level">LV{{ scoreToLevel(item.totalScore) }}</i>
          </div>
        </div>
      </div>
      <div class="cards-action">
        <span class="cards-tel">电话： {{ item.phone }}</span>
        <span class="cards-score">可用积分： {{ item.score }}</span>
        <span class="status">
          账号：
          <el-switch
            v-model="item.status"
            :disabled="role == 0"
            :active-value="0"
            :inactive-value="1"
            @change="handleStatus(item.phone,item.status)"
            value
            active-color="#dcdfe6"
            inactive-color="#409eff"
            active-text="冻结"
            inactive-text="正常"
          />
        </span>
        <span
          @click="showDetal(item)"
          class="change-btn"
        >
          展开详情
        </span>
      </div>
    </div>
    <el-pagination
      v-show="user.infoList.length !== 0"
      :total="user.totlePage*10"
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
      role: 0
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  created() {
    this.getUserListAction({ page: 1, that: this });
    this.role = localStorage.getItem('role');
  },
  beforeDestroy() {
    this.resetListAction("infoList");
  },
  methods: {
    ...mapActions(["getUserListAction", "resetListAction", "statusAction"]),
    scoreToLevel(totalScore) {
      let level;
      switch (true) {
        case totalScore < 1000:
          level = 1;
          break;
        case totalScore < 2000:
          level = 2;
          break;
        case totalScore < 5000:
          level = 3;
          break;
        case totalScore < 10000:
          level = 4;
          break;
        case totalScore < 30000:
          level = 5;
          break;
        case totalScore < 50000:
          level = 6;
          break;
        default:
          level = 7;
          break;
      }
      return level;
    },
    // 会员状态更改
    handleStatus(phone, status) {
      this.statusAction({ phone, status, that: this });
    },
    numToSex(num) {
      if (num === 0) return "女";
      if (num === 1) return "男";
      if (num === 2) return "保密";
    },
    showDetal(item) {
      const h = this.$createElement;
      this.$alert(
        `<div style="padding: 10px;border-radius:5px;font-size: 14px;background:url('http://hbimg.b0.upaiyun.com/ad3c35bd918f0884a7d6b4c8064bd70f515b9b902e79-yy5xhj_fw658')">
      <p style="line-height: 35px;border-bottom: 1px solid #ccc;padding-bottom: 5px;"><span>昵称：</span>${
        item.nickname
      }</p>
      <p style="line-height: 35px;border-bottom: 1px solid #ccc;padding-bottom: 5px;"><span>生日：</span>${
        item.birthday
      }</p>
      <p style="line-height: 35px;border-bottom: 1px solid #ccc;padding-bottom: 5px;"><span>手机号：</span>${
        item.phone
      }</p>
      <p style="line-height: 35px;border-bottom: 1px solid #ccc;padding-bottom: 5px;"><span>性别：</span>${this.numToSex(
        item.sex
      )}</p>
      <p style="line-height: 35px;border-bottom: 1px solid #ccc;padding-bottom: 5px;"><span>总积分：</span>${
        item.totalScore
      }</p>
      <p style="line-height: 35px;border-bottom: 1px solid #ccc;padding-bottom: 5px;"><span>余积分：</span>${
        item.score
      }</p>
      <p style="line-height: 35px;border-bottom: 1px solid #ccc;padding-bottom: 5px;"><span>签名：</span>${
        item.sign
      }</p>
  </div>`,
        "个人详情",
        {
          dangerouslyUseHTMLString: true
        }
      );
    },
    getPageNum(val) {
      this.getUserListAction({ page: val, this: this });
    }
  },
};
</script>

<style scoped>
i {
  font-weight: 700;
}
span {
  font-size: 14px;
}
.admin-cards {
  width: 324px;
  height: 190px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 5px;
  padding: 10px;
  box-sizing: border-box;
  display: inline-block;
  box-shadow: -5px 7px 7px 0 rgba(7, 17, 27, 0.06);
  background-image: url("../../images/adminbg.jpg");
}
.admin-cards:hover .change-btn {
  /* display: block; */
  opacity: 1;
}
.level {
  color: #0fd1ff;
}
.cards-tel,
.cards-score {
  margin-top: 10px;
  padding-left: 10px;
}
.cards-tel {
  display: block;
}
.cards-score {
  display: inline-block;
}
.status {
  display: block;
  margin-top: 10px;
  padding-left: 10px;
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
.change-btn {
  position: absolute;
  opacity: 0;
  right: 20px;
  bottom: 10px;
  border-radius: 20px;
  padding: 5px 15px;
  font-weight: inherit;
  cursor: pointer;
  margin: 10px 5px;
  transition: all 0.5s linear;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.change-btn:hover {
  background: #66b1ff;
  border-color: #66b1ff;
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