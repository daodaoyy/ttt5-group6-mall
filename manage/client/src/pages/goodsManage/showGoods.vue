<template>
  <div>
    <div class="wrap">
      <div 
        v-loading="this.$store.state.goods.isLoading"
        class="isLoading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0)"
        style="width:100px;position:fixed;left:50%;top:50%;"
      />
      <div class="displayGoods">
        <ul>
          <li
            v-for="(item,index) in goodsList"
            :key="index"
          >
            <el-row :gutter="12">
              <el-col :span="8">
                <div class="goods-card">
                  <el-card
                    shadow="hover"
                    class="card-body"
                  >
                    <p class="title">
                      <span>{{ item.title }}</span>
                      <span class="ID">id:{{ item.id }}</span>
                    </p>
                    <p class="title">
                      <span>价格:{{ item.price }}</span>
                      <span class="stock">库存:{{ item.stock }}</span>
                    </p>
                    <div class="img">
                      <img
                        :src="item.cover[0]"
                        alt=""
                      >
                    </div>
                    <p>
                      是否推荐:
                      <el-switch
                        v-model="item.isRecommend"
                        @change="recommend(item.isRecommend, item.isShelf, item)"
                        active-color="#409eff"
                        inactive-color="#dcdfe6"
                      />
                    </p>
                    <p>
                      是否上架:
                      <el-switch
                        v-model="item.isShelf"
                        @change="recommend(item.isRecommend, item.isShelf, item)"
                        active-color="#409eff"
                        inactive-color="#dcdfe6"
                      />
                    </p>
                    <div class="btn">
                      <p @click="deleteGoods(item)">
                        删除商品
                      </p>
                      <p @click="goDetail(item)">
                        查看详情
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
      v-if="this.$store.state.goods.goodsList.length == 0 ? false : true"
      class="page"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurentChange"
        :current-page="paper.page"
        :page-size="paper.rows"
        :page-sizes="[10]"
        :total="paper.total"
        layout="total, sizes, prev, pager, next, jumper"
        background
      />
    </div>
    <div
      v-if="this.$store.state.goods.goodsList.length == 0 ? true : false" 
      class="no-data"
    >
      暂无商品请前去添加
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { ADD_PAGE, ADD_ROWS } from "../../store/mutationType";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      goodsList: state => state.goods.goodsList,
      paper: state => state.goods
    })
  },
  mounted: function() {
    this.getAllGoodsList();
  },
  methods: {
    ...mapMutations([ADD_PAGE, ADD_ROWS]),
    ...mapActions([
      "getAllGoodsAction",
      "DeleteGoodsAction",
      "editGoodsAction"
    ]),
    // 获取所有商品
    getAllGoodsList() {
      let obj = {
        data: {
          page: this.$store.state.goods.page,
          rows: this.$store.state.goods.rows
        },
        that: this
      };
      this.getAllGoodsAction(obj);
    },
    // 分页---
    handleSizeChange(rowsValue) {
      this.$store.commit(ADD_ROWS, rowsValue);
      this.getAllGoodsList();
    },
    handleCurentChange(pageValue) {
      this.$store.commit(ADD_PAGE, pageValue);
      this.getAllGoodsList();
    },
    recommend(str_recommend, str_shelf, item) {
      if (str_recommend == true) {
        str_recommend = 1;
      } else {
        str_recommend = 0;
      }
      if (str_shelf == true) {
        str_shelf = 1;
      } else {
        str_shelf = 0;
      }
      let obj = {
        data: {
          title: item.title,
          cover: item.cover,
          detail: item.detail,
          desc: item.desc,
          tag: parseInt(item.tag, 10),
          price: item.price,
          stock: parseInt(item.stock, 10),
          discount: parseInt(item.discount, 10),
          isRecommend: str_recommend,
          isShelf: str_shelf
        },
        that: this,
        id: item.id
      };
      this.editGoodsAction(obj);
    },
    deleteGoods(str) {
      let obj = {
        id: str.id,
        index: str.id,
        name: "show",
        that: this
      };
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.DeleteGoodsAction(obj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    goDetail(str) {
      let obj = {
        id: str.id,
        that: this
      };
      this.$router.push({ path: `/detailGoods?id=${str.id}` });
    }
  }
};
</script>
<style scoped>
.displayGoods ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  cursor: pointer;
}
.displayGoods li {
  list-style: none;
  padding: 0;
  margin: 5px;
}
.card-body {
  width: 200px;
  height: 300px;
}
.img {
  width: 160px;
  height: 145px;
}
.img img {
  width: 100%;
  height: 100%;
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
}
.btn {
  display: flex;
}
.btn p {
  font-size: 14px;
  padding: 3px 7px;
  border-radius: 20px;
  margin: 5px 5px;
}
.btn p:nth-child(1) {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.btn p:nth-child(1):hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.btn p:nth-child(2) {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.btn p:nth-child(2):hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.title {
  border-bottom: 1px solid brown;
  display: flex;
}
.title span:nth-child(1) {
  flex-grow: 1;
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.stock {
  color: red;
}
.page {
  text-align: center;
}
</style>
