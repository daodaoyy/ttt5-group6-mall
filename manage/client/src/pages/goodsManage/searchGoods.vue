<template>
  <div>
    <div class="main">
      <div class="search">
        <el-input
          v-model="input"
          placeholder="请输入您要查找的商品名称"
          class="input-with-select"
        >
          <el-button
            slot="append"
            @click="goSearch"
            icon="el-icon-search"
          />
        </el-input>
      </div>
      <div
        v-loading="isLoading"
        class="loading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0)"
        style="width:100px;position:fixed;left:50%;top:50%;"
      />
      <div 
        class="displayGoods"
      >
        <ul>
          <li 
            v-for="(item,index) in this.$store.state.goods.searchGoods"
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
                    <img
                      :src="item.cover[0]"
                      alt=""
                    >
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
                      是否下架:
                      <el-switch
                        v-model="item.isShelf"
                        @change="recommend(item.isRecommend, item.isShelf, item)"
                        active-color="#409eff"
                        inactive-color="#dcdfe6"
                      />
                    </p>
                    <div class="edit">
                      <p @click="goDelete(item,index)">
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
      <div 
        v-if="this.$store.state.goods.searchGoods.length == 0 ? false : true"
        class="page"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurentChange"
          :current-page="this.$store.state.goods.searchGoodsPage"
          :page-size="this.$store.state.goods.searchGoodsRows"
          :page-sizes="[10]"
          :total="this.$store.state.goods.searchGoodsTotal"
          layout="total, sizes, prev, pager, next, jumper"
          background
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {
  ADD_SEARCH_PAGE,
  ADD_SEARCH_ROWS
} from "../../../src/store/mutationType";
export default {
  data() {
    return {
      input: ""
    };
  },
  computed: {
    ...mapState({
      searchGoods: state => state.goods.searchGoods,
      isLoading: state => state.goods.isLoading
    })
  },
  methods: {
    ...mapActions([
      "searchGoodsAction",
      "DeleteGoodsAction",
      "editGoodsAction"
    ]),
    ...mapMutations([ADD_SEARCH_PAGE, ADD_SEARCH_ROWS]),
    // 搜索商品
    goSearch() {
      let title = this.input;
      let obj = {
        title: title,
        that: this,
        page: this.$store.state.goods.searchGoodsPage,
        rows: this.$store.state.goods.searchGoodsRows
      };
      if (this.input === "") {
        this.$message({
          showClose: true,
          message: "请您输入需要搜索的商品名称"
        });
      } else {
        this.searchGoodsAction(obj);
      }
    },
    //编辑
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
        id: item.id,
        name: "search"
      };
      this.editGoodsAction(obj);
    },
    // 去详情页
    goDetail(str) {
      let obj = {
        id: str.id,
        that: this
      };
      this.$router.push({ path: `/detailGoods?id=${str.id}` });
    },
    // 删除商品
    goDelete(str) {
      let obj = {
        id: str.id,
        index: str.id,
        name: "search",
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
    // 分页---
    handleSizeChange(rowsValue) {
      this.$store.commit(ADD_SEARCH_PAGE, rowsValue);
      this.goSearch();
    },
    handleCurentChange(pageValue) {
      this.$store.commit(ADD_SEARCH_ROWS, pageValue);
      this.goSearch();
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.search {
  width: 60%;
}
.inner {
  margin: 0 auto;
}
.displayGoods ul {
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
.displayGoods li {
  list-style: none;
  padding: 0;
  margin: 1px;
}
.card-body {
  width: 200px;
  height: 300px;
}
.card-body img {
  width: 160px;
  height: 145px;
}
.card-body p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
.edit {
  display: flex;
}
.edit p {
  font-size: 14px;
  padding: 3px 7px;
  border-radius: 20px;
  margin: 5px;
}
.edit p:nth-child(1) {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.edit p:nth-child(1):hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.edit p:nth-child(2) {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.edit p:nth-child(2):hover {
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
</style>