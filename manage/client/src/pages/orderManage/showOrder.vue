<template>
  <div>
    <div class="wrape">
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
            v-for="(item,index) in order"
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
                      <span class="id">订单id:</span>{{ item.oid }}
                    </p>
                    <p>
                      <span>下单时间:{{ item.createTime }}</span>
                    </p>
                    <p>
                      <span>订单总金额:{{ item.sale }}</span>
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
                          || item.status == '请快速发货' ? true : false"
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
    </div>
    <div 
      v-if="this.$store.state.order.order_list.length == 0 ? false : true"
      class="page"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurentChange"
        :current-page="this.$store.state.order.orderPage"
        :page-size="this.$store.state.order.orderRows"
        :page-sizes="[10]"
        :total="this.$store.state.order.orderTotal"
        layout="total, sizes, prev, pager, next, jumper"
        background
      />
    </div>
    <div
      v-if="this.$store.state.order.order_list.length == 0 ? true : false" 
      class="no-data"
    >
      暂无订单
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { ADD_ORDER_PAGE, ADD_ORDER_ROWS } from "../../store/mutationType";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      order: state => state.order.order_list
    })
  },
  mounted: function() {
    this.getOrderList();
  },
  methods: {
    ...mapMutations([ADD_ORDER_PAGE, ADD_ORDER_ROWS]),
    ...mapActions(["getOrderListAction", "editOrderAction"]),
    goOrderDetail(str) {
      let obj = {
        id: str.oid,
        that: this
      };
      this.$router.push({ path: `/orderDetail?id=${str.oid}` });
    },
    editOrder(str) {
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
        name: "show"
      };
      this.editOrderAction(obj);
    },
    getOrderList() {
      let obj = {
        data: {
          page: this.$store.state.order.orderPage,
          rows: this.$store.state.order.orderRows
        },
        that: this
      };
      this.getOrderListAction(obj);
    },
    // 分页
    handleSizeChange(rowsValue) {
      this.$store.commit(ADD_ORDER_ROWS, rowsValue);
      this.getOrderList();
    },
    handleCurentChange(pageValue) {
      this.$store.commit(ADD_ORDER_PAGE, pageValue);
      this.getOrderList();
    }
  }
};
</script>
<style scoped>
.wrape {
  width: 100%;
  display: flex;
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
.no-data {
  text-align: center;
  line-height: 50px;
  color: #ccc;
  font-size: 24px;
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
</style>