<template>
  <div>
    <div class="wrap">
      <div style="margin:20px 0;">
        <el-input
          id="ipt"
          v-model="input"
          placeholder="请输入查询的内容"
          class="input-with-select"
        >
          <el-select
            id="sel"
            slot="prepend"
            v-model="select"
            placeholder="请选择查询的手段"
          >
            <el-option
              label="收货人手机号"
              value="2"
            />
            <el-option
              label="订单号"
              value="1"
            />
          </el-select>
          <el-button
            slot="append"
            @click="searchorder"
            icon="el-icon-search"
          />
        </el-input>
      </div>
      <div
        v-loading="this.$store.state.order.isLoading"
        class="loading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0)"
        style="width:100px;position:fixed;left:50%;top:50%;"
      />
      <div class="main">
        <ul>
          <li 
            v-for="(item,index) in searchOrder"
            :key="index"
          >
            <el-row :gutter="12">
              <el-col :span="8">
                <div class="goods-card">
                  <el-card
                    shadow="hover"
                    class="card-body"
                  >
                    <p>
                      <span class="id">
                        订单:
                      </span>
                      {{ item.oid }}
                    </p>
                    <p>
                      <span>
                        下单时间:
                        {{ item.createTime }}
                      </span>
                    </p>
                    <p>
                      <span>
                        订单总金额:
                        {{ item.sale }}
                      </span>
                    </p>
                    <p>
                      订单状态：{{ item.status }}
                    </p>
                    <p v-if="item.discount">
                      <span>有退货情况，请前往处理</span>
                    </p>
                    <p v-else>
                      <span>暂无退货情况</span>
                    </p>
                    <div class="edit">
                      <p 
                        @click="goOrderDetail(item)"
                      >
                        查看详情
                      </p>
                      <p 
                        @click="editOrder(item)" 
                        v-if="item.status == '已付款/待发货' 
                          || item.status == '请快速发货'? true : false"
                      >
                        点击发货
                      </p>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
      <div
        v-if="flag" 
        class="footer"
      >
        <p>很抱歉，未查找到您所搜索的商品!</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      flag: false,
      input: "",
      select: ""
    };
  },
  computed: {
    ...mapState({
      searchOrder: state => state.order.searchOrderList
    })
  },
  methods: {
    ...mapActions(["editOrderAction", "searchOrderAction"]),
    searchorder() {
      let sel = this.select;
      let content = this.input;
      if (sel == "" || content == "") {
        this.$message({
          message: "请选择查询类型，并且输入查询内容",
          type: "warn"
        });
      } else {
        let obj = {
          data: {
            type: parseInt(sel, 10),
            keyword: content
          },
          that: this
        };
        this.searchOrderAction(obj);
      }
    },
    editOrder(str) {
      if (
        str.status == "已付款/待发货" ||
        str.status == "申请退款" ||
        str.status == "请快速发货"
      ) {
        let status;
        switch (str.status) {
          case "已付款/待发货":
            status = 3;
            break;
          case "申请退款":
            status = 5;
            break;
          case "请快速发货":
            status = 3;
            break;
        }
        let obj = {
          data: {
            status: status,
            oid: str.oid
          },
          that: this,
          name: "search"
        };
        this.editOrderAction(obj);
      } else {
        this.$message({
          message: "我没说明白？不要点了",
          type: "warn"
        });
      }
    },
    goOrderDetail(str) {
      let obj = {
        id: str.oid,
        that: this
      };
      this.$router.push({ path: `/orderDetail?id=${str.oid}` });
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.main ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  cursor: pointer;
}
.main ul li {
  list-style: none;
  padding: 0;
  margin: 5px;
}
.card-body {
  width: 260px;
  height: 230px;
  margin: 0 auto;
  border-radius: 20px;
}
.footer {
  position: fixed;
  left: 50%;
  top: 50%;
}
.card-body p {
  padding: 0;
  margin: 0;
  font-size: 14px;
  text-align: center;
  margin: 10px 0px;
}
.edit {
  display: flex;
}
.edit p {
  padding: 5px 25px;
  font-size: 14px;
  border-radius: 15px;
}
.edit p:nth-child(2) {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.edit p:nth-child(1) {
  margin-left: 8px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.id {
  font-size: 16px;
}
.footer p {
  text-align: center;
  padding: 0;
  margin: 0;
}
.el-select {
  width: 160px;
}
.el-input-group {
  width: 800px;
}
.el-input-group__append button.el-button {
  width: 100px;
}
</style>