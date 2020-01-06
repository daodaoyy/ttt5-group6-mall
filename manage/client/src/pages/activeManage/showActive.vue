<template>
  <div>
    <div class="wrap">
      <div
        v-loading="isLoading"
        class="loading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0)"
        style="width:100px;position:fixed;left:50%;top:50%;"
      />
      <div class="displayActive">
        <ul>
          <li 
            v-for="(item) in activeList"
            :key="item.id"
          >
            <el-row :gutter="12">
              <el-col :span="8">
                <div class="goods-card">
                  <el-card 
                    shadow="hover"
                    class="card-body"
                  >
                    <img 
                      :src="item.cover"
                      alt
                    >
                    <el-switch
                      @change="shelf(item.isShelf, item)"
                      v-model="item.isShelf"
                      active-text="上线"
                      inactive-text="下线"
                      active-color="#409eff"
                      inactive-color="#dcdfe6"
                      class="shelf-btn"
                    />
                    <div class="btn">
                      <p @click="deleteActive(item)">
                        删除活动
                      </p>
                      <p @click="goActiveDetail(item)">
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
      v-if="this.$store.state.active.activeList.length == 0 ? false : true"
      class="page"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurentChange"
        :current-page="this.$store.state.active.activePage"
        :page-size="this.$store.state.active.activeRows"
        :page-sizes="[10]"
        :total="this.$store.state.active.activeTotal"
        layout="total, sizes, prev, pager, next, jumper"
        background
      />
    </div>
    <div
      v-if="this.$store.state.active.activeList.length == 0 ? true : false" 
      class="no-data"
    >
      暂无活动请前去创建
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { ADD_ACTIVE_PAGE, ADD_ACTIVE_ROWS } from "../../store/mutationType";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLoading: state => state.active.isLoading,
      activeList: state => state.active.activeList
    })
  },
  mounted() {
    this.getAllActiveList();
  },
  methods: {
    ...mapActions([
      "getActiveListAction",
      "deleteActiveAction",
      "editShelfAction"
    ]),
    ...mapMutations([ADD_ACTIVE_PAGE, ADD_ACTIVE_ROWS]),
    // 获取所有商品
    getAllActiveList() {
      // 获取值
      let obj = {
        data: {
          limit: this.$store.state.active.activeRows,
          page: this.$store.state.active.activePage
        },
        that: this
      };
      this.getActiveListAction(obj);
    },
    // 分页---
    handleSizeChange(rowsValue) {
      this.$store.commit(ADD_ACTIVE_ROWS, rowsValue);
      this.getAllActiveList();
    },
    handleCurentChange(pageValue) {
      this.$store.commit(ADD_ACTIVE_PAGE, pageValue);
      this.getAllActiveList();
    },
    shelf(str_shelf, item) {
      let isShelf;
      if (str_shelf == true) {
        isShelf = 1;
      } else {
        isShelf = 0;
      }
      let obj = {
        data: {
          id: item.id,
          isShelf: isShelf
        },
        that: this
      };
      this.editShelfAction(obj);
    },
    deleteActive(str) {
      let obj = {
        id: str.id,
        that: this
      };
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteActiveAction(obj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    goActiveDetail(str) {
      let obj = {
        id: str.id,
        that: this
      };
      this.$router.push({ path: `/activeDetail?id=${str.id}` });
    }
  }
};
</script>
<style scoped>
.displayActive ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  cursor: pointer;
}
.displayActive li {
  list-style: none;
  padding: 0;
  margin: 5px;
}
.wrap {
  justify-content: left;
}
.card-body {
  width: 320px;
  border-radius:5px; 
}
.no-data {
  text-align: center;
  line-height: 50px;
  color: #ccc;
  font-size: 24px;
}
.card-body img {
  width: 280px;
  height: 120px;
}
.card-body p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
.active-title {
  line-height: 20px;
}
.shelf-btn {
  margin-top: 10px;
}
.btn {
  margin-top: 10px;
  display: flex;
}
.btn p {
  font-size: 14px;
  padding: 3px 7px;
  border-radius: 20px;
  margin: 0px 5px;
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
</style>
