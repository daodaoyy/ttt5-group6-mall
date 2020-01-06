<template>
  <div>
    <div class="wrap">
      <div class="goods-edit">
        <el-form
          ref="ruleForm" 
          :model="ruleForm" 
          :rules="rules"
          label-width="100px" 
          class="demo-ruleForm"
        >
          <el-form-item
            prop="title"
            label="商品名称"
          >
            <el-input
              v-model="ruleForm.title"
            />
          </el-form-item>
          <el-form-item
            label="商品价格"
            prop="price"
          >
            <el-input 
              v-model.number="ruleForm.price"
              type="price"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            prop="stock"
            label="商品数量"
          >
            <el-input 
              v-model.number="ruleForm.stock" 
              type="stock"
              autocomplete="off" 
            />
          </el-form-item>
          <el-form-item
            prop="desc"
            label="商品描述"
          >
            <el-input 
              v-model="ruleForm.desc" 
              type="textarea" 
              autocomplete="off" 
              show-word-limit
              maxlength="200"
            />
          </el-form-item>
          <el-form-item
            prop="tag"
            label="商品分类"
          >
            <el-select 
              v-model="ruleForm.tag"
              placeholder="请选择商品分类"
            >
              <el-option 
                label="个人护理" 
                value="个人护理"
              />
              <el-option 
                label="日用百货" 
                value="日用百货"
              />
              <el-option 
                label="生鲜冷藏" 
                value="生鲜冷藏"
              />
              <el-option 
                label="乳饮酒水" 
                value="乳饮酒水"
              />
              <el-option 
                label="面点素食" 
                value="面点素食"
              />
              <el-option 
                label="数码家电" 
                value="数码家电"
              />
              <el-option 
                label="家用纺织" 
                value="家用纺织"
              />
              <el-option 
                label="坚果蜜饯" 
                value="坚果蜜饯"
              />
              <el-option 
                label="纸品家清" 
                value="纸品家清"
              />
              <el-option 
                label="粮油米面" 
                value="粮油米面"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="商品推荐"
            prop="isRecommend"
          >
            <el-select
              v-model="ruleForm.isRecommend"
              placeholder="请选择是否推荐商品"
              value="不推荐"
            >
              <el-option
                label="推荐"
                value="推荐"
              />
              <el-option 
                label="不推荐"
                value="不推荐"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            prop="isShelf"
            label="商品状态"
          >
            <el-select 
              v-model="ruleForm.isShelf"
              placeholder="请选择商品状态"
              value="下架"
            >
              <el-option
                label="上架"
                value="上架"
              />
              <el-option
                label="下架"
                value="下架"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            prop="discount"
            label="折扣类型"
          >
            <el-input
              @blur="testDiscount"
              v-model="ruleForm.discount"
              type="discount"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="图片类型"
            prop="speice"
          >
            <el-select
              v-model="ruleForm.imgSpeice"
              placeholder="请选择上传图片类型"
              value="商品封面图"
            >
              <el-option
                label="商品封面图"
                value="商品封面图"
              />
              <el-option 
                label="商品详情图"
                value="商品详情图"
              />
            </el-select>
          </el-form-item>
          <div class="imgUpload">
            <el-upload
              id="uploadImg"
              :on-success="success"
              :on-remove="handleRemove"
              :data="qiniuData"
              :before-upload="beforeupload"
              action="http://upload.qiniup.com"
              list-type="picture"
            >
              <el-button 
                type="primary" 
                size="medium"
              >
                上传图片
                <i 
                  class="el-icon-upload 
                  el-icon--right"
                />
              </el-button>
            </el-upload>
          </div>
          <div 
            class="Img"
          >
            <p
              v-if="img.data_cover.length == 0 ? false :true"
              class="info"
            >
              封面图片:
            </p>
            <li 
              @click="delCover(el,index)"
              v-for="(el, index) in img.data_cover"
              :key="index"
            >
              <img 
                :src="el" 
                alt="努力加载中"
              >
              <a>
                点击删除
              </a>
            </li>
          </div>
          <div
            class="Img1"
          >
            <p
              v-if="img.data_detail.length == 0 ? false :true"
              class="info"
            >
              详情图片:
            </p>
            <li
              @click="delDetail(el,index)"
              v-for="(el,index) in img.data_detail"
              :key="index+0.1"
            >
              <img 
                :src="el" 
                alt="努力加载中"
              >
              <a>
                点击删除
              </a>
            </li>
          </div>
          <el-form-item>
            <el-button
              @click="submitForm('ruleForm')"
              type="primary"
            >
              修改商品信息
            </el-button>
            <el-button
              @click="resetForm('ruleForm')" 
              type="primary"
            >
              清空商品信息
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: "",
      qiniuData: {
        key: "",
        token: ""
      },
      addUrl: "https://qnimg.vadxq.com/",
      img: {
        cover: [],
        detail: [],
        data_cover: [],
        data_detail: []
      },
      ruleForm: {
        title: "",
        tag: "",
        price: "",
        desc: "",
        stock: "",
        discount: 0,
        isRecommend: "",
        isShelf: "",
        imgSpeice: "商品封面图"
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名名称", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", min: 0, message: "价格不能为负数" }
        ],
        stock: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { type: "number", min: 0, message: "数量不能为负数" }
        ],
        desc: [
          { required: true, message: "请输入商品详情", trigger: "blur" },
          {
            min: 0,
            max: 100000000000000,
            message: "详情不能为空",
            trigger: "blur"
          }
        ],
        tag: [{ required: true, message: "请选择商品类别", trigger: "change" }],
        discount: [
          { required: true, message: "请填写商品折扣", trigger: "change" }
        ],
        isRecommend: [
          { required: true, message: "请选择是否推荐", trigger: "change" }
        ],
        isShelf: [
          {
            required: true,
            message: "请选择商品状态",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted: function() {
    this.showOldInfo();
    this.getToken();
  },
  methods: {
    ...mapActions(["editGoodsAction", "getTokenAction"]),
    testDiscount() {
      let reg = /^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?)|10)$/;
      if (!reg.test(this.ruleForm.discount)) {
        this.$message({
          message: "折扣格式不正确",
          type: "error"
        });
        this.ruleForm.discount = "";
      }
    },
    // 提交表单方法
    submitForm(formName) {
      this.testDiscount();
      if (
        (this.img.detail.length == 0 && this.img.data_detail.length == 0) ||
        (this.img.cover.length == 0 && this.img.data_cover.length == 0)
      ) {
        this.$message({
          message: "图片不能为空",
          type: "error"
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 是否推荐
            let isRecommend;
            if (this.ruleForm.isRecommend === "推荐") {
              isRecommend = 1;
            } else {
              isRecommend = 0;
            }
            // 上下架
            let isShelf;
            if (this.ruleForm.isShelf == "上架") {
              isShelf = 1;
            } else {
              isShelf = 0;
            }
            let tag;
            switch (this.ruleForm.tag) {
              case "个人护理":
                tag = 1;
                break;
              case "日用百货":
                tag = 2;
                break;
              case "生鲜冷藏":
                tag = 3;
                break;
              case "乳饮酒水":
                tag = 4;
                break;
              case "面点素食":
                tag = 5;
                break;
              case "数码家电":
                tag = 6;
                break;
              case "家用纺织":
                tag = 7;
                break;
              case "坚果蜜饯":
                tag = 8;
                break;
              case "纸品家清":
                tag = 9;
                break;
              case "粮油米面":
                tag = 10;
                break;
            }
            let obj = {
              data: {
                title: this.ruleForm.title,
                cover: this.img.cover.concat(this.img.data_cover),
                detail: this.img.detail.concat(this.img.data_detail),
                desc: this.ruleForm.desc,
                tag: parseInt(tag, 10),
                price: parseInt(this.ruleForm.price, 10),
                stock: parseInt(this.ruleForm.stock, 10),
                discount: parseInt(this.ruleForm.discount * 10, 10),
                isRecommend: isRecommend,
                isShelf: isShelf
              },
              that: this,
              id: this.id,
              name: "edit"
            };
            this.editGoodsAction(obj);
          } else {
            this.$message({
              message: "信息不能为空",
              type: "warn"
            });
            return false;
          }
        });
      }
    },
    // 重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.img.cover = [];
      this.img.detail = [];
      this.ruleForm.discount = "";
    },
    // 移除照片的方法
    handleRemove(file, fileList) {
      let url = this.addUrl + file.response.key;
      if (this.img.cover.includes(url)) {
        for (let i = 0; i < this.img.cover.length; i++) {
          if (this.img.cover[i] == url) {
            this.img.cover.splice(i, 1);
          }
        }
      } else {
        for (let i = 0; i < this.img.detail.length; i++) {
          if (this.img.detail[i] == url) {
            this.img.detail.splice(i, 1);
          }
        }
      }
    },
    success(response, fileList) {
      if (this.ruleForm.imgSpeice == "商品封面图") {
        this.img.cover.push(this.addUrl + this.qiniuData.key);
      } else {
        this.img.detail.push(this.addUrl + this.qiniuData.key);
      }
    },
    delDetail(str, index) {
      this.img.data_detail.splice(index, 1);
    },
    delCover(str, index) {
      this.img.data_cover.splice(index, 1);
    },
    beforeupload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
      this.qiniuData.token = this.$store.state.goods.token_data;
      let date = new Date();
      this.qiniuData.key = "luckyshop/" + date.getTime() + "/" + file.name;
    },
    // 获取七牛云上传图片的凭证
    getToken() {
      this.getTokenAction();
    },
    showOldInfo() {
      this.ruleForm.title =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].title
          : "";
      this.ruleForm.desc =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].desc
          : "";
      this.ruleForm.price =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].price
          : "";
      this.img.data_cover =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].cover
          : "";
      this.img.data_detail =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].detail
          : "";
      this.ruleForm.stock =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].stock
          : "";
      this.ruleForm.tag =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].tag
          : "";
      this.ruleForm.isRecommend =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].isRecommend
          : "";
      this.ruleForm.isShelf =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].isShelf
          : "";
      this.ruleForm.discount =
        this.$store.state.goods.goods_detail.length !== 0
          ? parseInt(this.$store.state.goods.goods_detail[0].discount, 10) / 10
          : "";
      this.id =
        this.$store.state.goods.goods_detail.length !== 0
          ? this.$store.state.goods.goods_detail[0].id
          : "";
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
.goods-edit {
  width: 400px;
}
.el-select {
  width: 300px;
}
.el-input__inner {
  width: 300px;
}
#uploadImg {
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  padding-left: 100px;
  margin-bottom: 5px;
}
.cover {
  width: 400px;
}
.cover ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  padding-left: 100px;
}
.cover ul li {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100px;
  height: 100px;
}
.cover ul li img {
  width: 100px;
  height: 100px;
}
.detail {
  width: 400px;
}
.detail ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  padding-left: 100px;
}
.detail ul li {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100px;
  height: 100px;
}
.detail ul li img {
  width: 100px;
  height: 100px;
}
.el-upload--picture-card i {
  font-size: 22px;
}
.el-upload-list__item {
  width: 305px;
}
.Img li,
.Img1 li {
  width: 189px;
  height: 92px;
  background: #ffffff;
  margin: 10px 0px 0px;
  padding: 10px 10px 10px 90px;
  box-sizing: border-box;
  list-style: none;
  border-radius: 6px;
  border: 1px solid #c0ccda;
  margin-left: 100px;
  cursor: pointer;
}
.Img li a,
.Img1 li a {
  width: 58px;
  height: 70px;
  color: #606266;
  margin: 0px 40px 0px;
  padding: 0px 0px 0px 4px;
  font-size: 14px;
  padding-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* margin-right: 40px; */
  font-family: "Microsoft Ya Hei";
  display: block;
  position: relative;
  top: -45px;
  left: -36px;
}
.Img li img,
.Img1 li img {
  width: 70px;
  height: 70px;
  display: inline-block;
  position: relative;
  z-index: 1;
  margin-left: -80px;
  background-color: #ffffff;
  vertical-align: middle;
}
.info {
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #606266;
  padding-left: 30px;
  margin-bottom: 20px;
}
</style>