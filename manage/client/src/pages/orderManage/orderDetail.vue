<template>
  <div>
    <div class="wrap">
      <div class="main">
        <ul>
          <li
            v-for="(item) in this.$store.state.order.order_detail"
            :key="item.oid"
          >
            <div class="orderinfo">
              <p>
                订单信息
              </p>
              <p>
                订单Id:{{ item.oid }}
              </p>
              <p>
                订单生成时间：{{ item.createTime }}
              </p>
              <p>
                订单总额:{{ item.sale }}
              </p>
              <p>
                订单抵扣积分:{{ item.score }}
              </p>
            </div>
            <div class="address">
              <p>
                收货人信息
              </p>
              <p>
                收货人姓名:{{ item.name }}
              </p>
              <p>
                收货人手机号:{{ item.phone }}
              </p>
              <p>
                收获人地址:{{ item.address }}
              </p>
            </div>
            <div class="products">
              <ul>
                <li
                  v-for="(goods, index) in item.products"
                  :key="index"
                >
                  <p>
                    商品信息
                  </p>
                  <p>
                    商品名称:{{ goods.title }}
                  </p>
                  <p>
                    商品单价:{{ goods.price }}
                  </p>
                  <p>商品数量:{{ goods.count }}</p>
                  <p>
                    商品折扣后价格：{{ goods.sale }}
                  </p>
                  <p>
                    <img
                      :src="goods.cover[0]"
                      alt=""
                      class="Img"
                    >
                  </p>
                  <p>
                    商品状态:{{ goods.status }}
                  </p>
                  <button
                    @click="edit_goods_status(goods,item)"
                    v-if="goods.status == '申请退款' ? true : false"
                    class="btn"
                  >
                    同意退货
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  mounted: function() {
    let id;
    let reg = new RegExp("(^|&)id=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      id = unescape(r[2]);
    } else {
      this.$router.push("/orderDetail");
    }
    this.getOrderDetail(id);
  },
  methods: {
    ...mapActions(["getOrderDetailAction", "editGoodsStatusAction"]),
    getOrderDetail(id) {
      let obj = {
        data: {
          id
        },
        that: this
      };
      this.getOrderDetailAction(obj);
    },
    edit_goods_status(str, item) {
      let pid = str.pid;
      let id = item.oid;
      let status = 0;
      let obj = {
        data: {
          status,
          pid
        },
        id,
        that: this
      };
      if (str.status !== "申请退款") {
        this.$message({
          message: "无法操作此状态",
          type: "warn"
        });
      } else {
        this.editGoodsStatusAction(obj);
      }
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
}
.main {
  width: 800px;
  margin: 0 auto;
}
.main ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main ul li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.main ul li p {
  padding: 5px 20px;
  margin: 0;
}
.orderinfo,
.address,
.products {
  margin: 0 auto;
  box-shadow: -5px 7px 7px 0 rgba(7, 17, 27, 0.06);
  padding: 20px 0;
}
.orderinfo,
.address,
.products p {
  padding: 10px 0;
}
.btn {
  margin-left: 20px;
  outline: none;
  display: inline;
  padding: 7px 15px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.Img {
  width: 100px;
  height: 100px;
}
</style>