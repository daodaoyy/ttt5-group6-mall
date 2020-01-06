<template>
  <div>
    <div class="active">
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
      <div class="active-main">
        <p 
          style="margin-left:-85%;"
        >
          全部商品:
        </p>
        <div class="data1">
          <template>
            <el-table
              :data="searchTableData.length !== 0 && input !== '' ? searchTableData : filterTableData"
              style="width: 100%"
            >
              <el-table-column
                label="商品名称"
                prop="title"
              />
              <el-table-column
                label="商品价格"
                prop="price"
              />
              <el-table-column
                label="折扣(%)"
                prop="discount"
                style="width:50px;"
              />
              <el-table-column
                align="center"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="handleEdit(scope.$index, scope.row)"
                    :disabled="scope.row.checked"
                    size="mini"
                    type="primary"
                    prop="checked"
                  >
                    编辑
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <p 
              v-if="tableData.length == total ? false : true"
              @click="getMoreData"
              class="getData"
            >
              点击加载更多
            </p>
          </template>
        </div>
        <p 
          style="margin-left:-85%;"
        >
          已选商品:
        </p>
        <div class="data2">
          <template>
            <el-table
              :data="tableData1"
              style="width: 100%"
            >
              <el-table-column
                label="商品名称"
                prop="title"
              />
              <el-table-column
                label="商品价格"
                prop="price"
              />
              <el-table-column
                label="折扣(%)"
                prop="discount"
                style="width:50px;"
              />
              <el-table-column
                align="center"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                    @click="handleDetail(scope.$index, scope.row)"
                    size="mini"
                    type="primary"
                  >
                    详情
                  </el-button>
                  <el-button
                    @click="handleDelete(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <div class="imgupload">
        <el-upload
          :on-exceed="showInfo"
          :on-success="success"
          :on-remove="handleRemove"
          :before-upload="beforeupload"
          :data="qiniuData"
          :limit="1"
          class="uploadImg"
          action="http://upload.qiniup.com"
          list-type="picture"
        >
          <el-button 
            type="primary" 
            size="medium"
          >
            点击上传活动封面图
            <i 
              class="el-icon-upload 
                  el-icon--right"
            />
          </el-button>
        </el-upload>
        <el-upload
          :on-exceed="showInfo"
          :on-success="successDetail"
          :on-remove="handleRemoveDetail"
          :before-upload="beforeuploadDetail"
          :data="qiniuData1"
          :limit="1"
          class="uploadImg"
          action="http://upload.qiniup.com"
          list-type="picture"
        >
          <el-button 
            type="primary" 
            size="medium"
          >
            点击上传活动详情图
            <i 
              class="el-icon-upload 
                  el-icon--right"
            />
          </el-button>
        </el-upload>
      </div>
      <div 
        class="submit"
      >
        <el-button
          @click="onSubmit"
          type="primary"
        >
          创建活动
        </el-button>
      </div>
      <el-dialog 
        :visible.sync="dialogFormVisible"
        title="请编辑活动折扣"
      >
        <el-form :model="form">
          <el-form-item 
            :label-width="formLabelWidth"
            label="折扣"
          >
            <el-input 
              v-model="form.discount"
              autocomplete="off"
              placeholder="请输入折扣类型-范围为数字1-10"
            />
          </el-form-item>
        </el-form>
        <div 
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">
            取 消
          </el-button>
          <el-button 
            @click="confirm"
            type="primary"
          >
            确 定
          </el-button>
        </div>
      </el-dialog>
      <el-dialog
        :before-close="handleClose"
        :visible.sync="dialogVisible"
        title="商品信息"
        width="70%"
      >
        <div class="goodsInfo">
          <template>
            <el-table
              :data="infoGoods"
              style="width: 100%"
            >
              <el-table-column
                label="商品名称"
                prop="title"
              />
              <el-table-column
                label="商品价格"
                prop="price"
              />
              <el-table-column
                label="折扣(%)"
                prop="discount"
                style="width:50px;"
              />
              <el-table-column
                label="销量"
                prop="sale"
                style="width:50px;"
              />
              <el-table-column
                label="库存"
                prop="stock"
                style="width:50px;"
              />
              <el-table-column
                label="评分"
                prop="score"
                style="width:50px;"
              />
            </el-table>
          </template>
          <div class="infoGoodsImg">
            <li 
              v-for="(item,num) in infoGoods.length !== 0 ? infoGoods[0].cover : ''"
              :key="num"
            >
              <img 
                :src="item"
                alt="商品封面图"
              >
            </li>
            <li 
              v-for="(item,num1) in infoGoods.length !== 0 ? infoGoods[0].detail : ''"
              :key="num1+0.1"
            >
              <img 
                :src="item"
                alt="商品详情图"
              >
            </li>
          </div>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button 
            @click="dialogVisible = false"
          >
            取 消
          </el-button>
          <el-button
            @click="dialogVisible = false"
            type="primary"
          >
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tableData: [], //全部商品
      tableData1: [], //已选商品
      searchTableData: [],
      infoGoods: [], //定义被查看详情的商品的数组
      search: "",
      select: "全部商品",
      input: "",
      id: "", //被点击id
      row: null, //被点击的一行
      index: "",
      discount: [], //折扣
      goods_id: [], //商品id添加的商品
      count: 1, //加载数据页数
      formLabelWidth: "120",
      dialogFormVisible: false, //编辑的模态框
      dialogVisible: false, //查看详情的模态框
      addUrl: "https://qnimg.vadxq.com/",
      img: {
        cover: '',
        detail: ''
      },
      qiniuData: {
        key: "",
        token: ""
      },
      qiniuData1: {
        key: "",
        token: ""
      },
      imgSpeice: "活动详情图片",
      form: {
        discount: "" //商品折扣
      }
    };
  },
  computed: {
    //获取store中的值
    ...mapState({
      data: state => state.active.active_goods,
      total: state => state.goods.total
    }),
    filterTableData() {
      this.tableData.map(item => {
        for (let i = 0; i < this.goods_id.length; i++) {
          if (this.goods_id[i] == item.id) {
            item.checked = true;
          }
        }
      });
      return this.tableData;
    }
  },
  mounted: function() {
    this.getToken();
    this.getAllGoods();
    this.count = 2;
  },
  methods: {
    // 引入Action
    ...mapActions([
      "getAllGoodsAction", //获取商品
      "createActiveAction", //创建活动
      "getTokenAction", //获取token
      "searchGoodsAction"
    ]),
    // 编辑折扣
    handleEdit(index, row) {
      if (this.input == "") {
        this.searchTableData = [];
      }
      this.dialogFormVisible = true;
      this.id = row.id;
      this.row = row;
      this.index = index;
    },
    //删除已选商品
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          for (let i = 0; i < this.goods_id.length; i++) {
            if (this.goods_id[i] == row.id) {
              this.goods_id.splice(i, 1);
              // 删除已选中的货物id
              this.discount.splice(i, 1);
              // 删除折扣
              this.tableData1.splice(index, 1);
              //删除已选商品
              this.tableData.map((item, index) => {
                if (row.id == item.id) {
                  item.checked = false;
                }
              });
              //回填删除的数据
            }
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查看商品详情
    handleDetail(index, row) {
      this.dialogVisible = true;
      let arr = [];
      arr.push(row);
      this.infoGoods = arr;
    },
    //确认修改折扣
    confirm() {
      this.testDiscount();
    },
    // 提示图片上传只能是一张
    showInfo() {
      this.$message({
        message: "活动的图片只能上传一张",
        type: "warn"
      });
    },
    //验证折扣以及处理数据
    testDiscount() {
      let reg = /^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?)|10)$/;
      if (!reg.test(this.form.discount)) {
        this.$message({
          message: "折扣格式不正确",
          type: "warn"
        });
        this.form.discount = "";
      } else {
        if (this.searchTableData.length == 0) {
          this.tableData.map((item, index) => {
            if (this.id == item.id) {
              item.checked = true;
            }
          });
          this.tableData.map((item, index) => {
            if (item.id == this.id) {
              item.discount = this.form.discount * 10;
            }
          });
          this.goods_id.push(this.id);
          this.discount.push(parseInt(this.form.discount, 10) * 10);
          this.dialogFormVisible = false;
          this.form.discount = "";
          this.tableData1.push(this.row);
        } else {
          this.searchTableData.map((item, index) => {
            if (this.id == item.id) {
              item.checked = true;
            }
          });
          this.searchTableData.map((item, index) => {
            if (item.id == this.id) {
              item.discount = this.form.discount * 10;
            }
          });
          this.goods_id.push(this.id);
          this.discount.push(parseInt(this.form.discount, 10) * 10);
          this.dialogFormVisible = false;
          this.form.discount = "";
          this.tableData1.push(this.row);
        }
        this.$message({
          message: "添加成功",
          type: "success"
        });
      }
    },
    getMoreData() {
      this.getAllGoods();
    },
    //获取活动商品
    getAllGoods() {
      let num = this.count++;
      let obj = {
        data: {
          page: num,
          rows: 10,
          name: "active"
        },
        that: this
      };
      this.getAllGoodsAction(obj);
    },
    //获取token
    getToken() {
      this.getTokenAction();
    },
    goSearch() {
      let title = this.input;
      let obj = {
        title: title,
        that: this,
        page: 1,
        rows: 10,
        name: "active",
        goods_id: this.goods_id
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
    // 上传封面图
    beforeupload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("图片只能是 JPG/PNG/GIF格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
      this.qiniuData.token = this.$store.state.active.token_data;
      let date = new Date();
      this.qiniuData.key = "luckyshop/" + date.getTime() + "/" + file.name;
    },
    // 上传成功后触发的事件
    success(response, fileList) {
      this.img.cover = this.addUrl + this.qiniuData.key;
    },
    // 移除照片的方法
    handleRemove(file, fileList) {
      this.img.cover = ''
    },
    //  上传详情图
    beforeuploadDetail(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("图片只能是 JPG/PNG/GIF格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
      this.qiniuData1.token = this.$store.state.active.token_data;
      let date = new Date();
      this.qiniuData1.key = "luckyshop/" + date.getTime() + "/" + file.name;
    },
    successDetail(reesponse, fileList) {
      this.img.detail = this.addUrl + this.qiniuData1.key;
    },
    handleRemoveDetail(file, fileList) {
      this.img.detail = ''
    },
    //创建活动
    onSubmit() {
      if (this.img.detail == '' || this.img.cover == '') {
        this.$message({
          message: "活动相关图片不能为空",
          type: "warn"
        });
      } else if (this.goods_id.length == 0) {
        this.$message({
          message: "请添加活动商品",
          type: "warn"
        });
      } else {
        let obj = {
          data: {
            products: this.goods_id.join(","),
            discount: this.discount,
            cover: this.img.cover,
            detail: this.img.detail
          },
          that: this
        };
        this.createActiveAction(obj);
      }
    },
    handleClose(done) {
      this.dialogVisible = false;
    }
  }
};
</script>
<style scoped>
.active {
  width: 100%;
}
.active-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.data1 {
  width: 80%;
  margin-bottom: 5px;
}
.data2 {
  width: 80%;
  margin-bottom: 10px;
}
.getData {
  padding: 0px;
  margin: 0px;
  text-align: center;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  line-height: 30px;
}
.search {
  margin: 0 auto;
  margin-bottom: 5px;
  width: 800px;
}
.search .el-select {
  width: 152px;
}
.cell {
  display: flex;
}
.uploadImg {
  margin: 5px;
}
.uploadImg li {
  width: 45%;
  margin: 0 5%;
}
.imgupload {
  display: flex;
  justify-content: center;
}
.submit {
  padding-top: 20px;
  width: 100%;
  text-align: center;
}
.infoGoodsImg {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.infoGoodsImg li {
  list-style: none;
  width: 100px;
}
.infoGoodsImg li img {
  width: 100px;
  height: 100px;
  margin: 10px;
}
.el-table__row .cell {
  text-align: center;
}
</style>