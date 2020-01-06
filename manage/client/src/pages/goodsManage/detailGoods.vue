<template>
  <div>
    <div
      v-loading="isLoading"
      class="loading"
      element-loading-text="数据加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0,0)"
      style="width:100px;position:fixed;left:50%;top:50%;"
    />
    <div class="wrap">
      <ul>
        <div
          v-if="this.$store.state.goods.goods_detail.length == 0 ? false : true"
          @click="goEdit"
          class="btn"
        >
          编辑商品信息
        </div>
        <li
          v-for="(item,index) in this.$store.state.goods.goods_detail"
          :key="index"
        >
          <p>商品id:</p>
          <p>{{ item.id }}</p>
          <el-divider />
          <p>商品名称:</p>
          <p>{{ item.title }}</p>
          <el-divider />
          <p>商品描述:</p>
          <p>{{ item.desc }}</p>
          <el-divider />
          <p>商品价格:</p>
          <p>{{ item.price }}元</p>
          <el-divider />
          <p>商品评分:</p>
          <p>{{ item.score }}分</p>
          <el-divider />
          <p>销售数量:</p>
          <p>{{ item.count }}</p>
          <el-divider />
          <p>分类:</p>
          <p>{{ item.tag }}</p>
          <el-divider />
          <p>商品状态:</p>
          <p>{{ item.isShelf }}</p>
          <el-divider />
          <p>折扣详情:</p>
          <p>{{ item.discount }}%</p>
          <el-divider />
          <p>是否为推荐:</p>
          <p>{{ item.isRecommend }}</p>
          <el-divider />
          <p>销售总额:</p>
          <p>{{ item.sale }}</p>
          <el-divider />
          <div class="title">
            商品封面图:
          </div>
          <div
            v-if="item.cover.length == 0 ? false : true"
            class="goods-img"
          >
            <ul class="picture">
              <li
                v-for="(el,i) in item.cover"
                :key="i"
                style="width:100px;"
              >
                <img
                  :src="el"
                  alt=""
                >
              </li>
            </ul>
          </div>
          <div 
            class="title"
          >
            商品详情图:
          </div>
          <div class="goods-img">
            <ul
              v-if="item.detail.length == 0 ? false : true"
              class="picture"
            >
              <li 
                v-for="(el,i) in item.detail"
                :key="i" 
                style="width:100px;"
              >
                <img
                  :src="el"
                  alt=""
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      id: ""
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.goods.isLoading
    })
  },
  mounted: function() {
    let id;
    let reg = new RegExp("(^|&)id=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      id = unescape(r[2]);
      this.id = id;
    } else {
      this.$router.push("/detailGoods");
    }
    this.getOneGoods(id);
  },
  methods: {
    ...mapActions(["getGoodsDetailAction"]),
    getOneGoods(id) {
      let obj = {
        id,
        that: this
      };
      this.getGoodsDetailAction(obj);
    },
    goEdit() {
      this.$router.push({ path: "/editGoods" });
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
}
.wrap ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.wrap ul li {
  width: 500px;
  padding: 0;
  margin-left: 5px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.wrap ul li p {
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.wrap ul li p:nth-child(3n + 1) {
  width: 100px;
  height: 50px;
  padding: 0;
  margin: 0;
  text-align: left;
  line-height: 50px;
  font-size: 16px;
}
.wrap ul li p:nth-child(3n-1) {
  height: 50px;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  text-align: left;
  line-height: 50px;
  font-size: 14px;
  padding-left: 5px;
}
/* 横线样式 */
.el-divider--horizontal {
  margin: 1px 0;
}
.wrap ul li img {
  width: 100px;
  height: 100px;
}
.title {
  width: 500px;
  height: 30px;
  line-height: 30px;
  text-align: left;
}
.btn {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  display: inline-block;
  border-radius: 15px;
}
.picture {
  display: flex;
  width: 500px;
  flex-wrap: wrap;
}
</style>
