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
          @click="goEditActive"
          class="btn"
        >
          编辑活动
        </div>
        <li>
          <p>活动id:</p>
          <p>{{ active_detail.aInfo ? active_detail.aInfo.id:'' }}</p>
          <el-divider />
          <p>活动状态:</p>
          <p>{{ active_detail.aInfo ? active_detail.aInfo.isShelf == true ? '上线' : '下线' : '' }}</p>
          <el-divider />
          <div class="title">
            活动图片:
          </div>
          <div class="goods-img">
            <ul class="picture">
              <li>
                <img  
                  :src="active_detail.aInfo ? active_detail.aInfo.cover : ''"
                  class="Img"
                  alt="努力加载中..."
                >
              </li>
              <li>
                <img 
                  :src="active_detail.aInfo ? active_detail.aInfo.detail : ''"
                  class="Img"
                  alt="努力加载中...."
                >
              </li>
            </ul>
          </div>
          <div class="goods">
            <el-table
              :data="active_detail.productList"
              style="width: 100%"
            >
              <el-table-column
                prop="id"
                label="商品id"
                width="70"
              />
              <el-table-column
                prop="title"
                label="名称"
                width="200"
              />
              <el-table-column
                prop="stock"
                label="库存"
              />
              <el-table-column
                prop="sale"
                label="销量"
              />
              <el-table-column
                prop="discount"
                label="折扣(%)"
              />
              <el-table-column
                prop="desc"
                label="商品描述"
                width="300"
              />
            </el-table>
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
      Id: ""
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.active.isLoading,
      active_detail: state => state.active.active_detail
    })
  },
  mounted: function() {
    let id;
    let reg = new RegExp("(^|&)id=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      id = unescape(r[2]);
    } else {
      this.$router.push("/showActive");
    }
    this.getOneActive(id);
  },
  methods: {
    ...mapActions(["getActiveDetailAction"]),
    getOneActive(id) {
      let obj = {
        id,
        that: this
      };
      this.getActiveDetailAction(obj);
    },
    goEditActive() {
      this.$router.push({ path: "/editActive" });
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 845px;
  margin: 0 auto;
}
.wrap ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.wrap ul li {
  padding: 0;
  margin: 5px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.wrap ul li p {
  user-select: none;
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
.Img {
  display: inline-block;
  width: 300px;
  height: 150px;
}
.title {
  width: 650px;
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
.goods {
  margin-top: 20px;
  width: 100%;
}
.el-table_1_column_2,
.el-table_1_column_6 {
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.cell {
  text-align: center;
}
.picture {
  display: flex;
}
</style>
