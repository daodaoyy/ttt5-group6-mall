<template>
  <div>
    <div class="wrap">
      <div class="goods-add">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="商品名称"
            prop="title"
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
            label="商品分类"
            prop="tag"
          >
            <el-select
              v-model="ruleForm.tag"
              placeholder="请选择商品分类"
            >
              <el-option 
                label="个人护理" 
                value="1"
              />
              <el-option
                label="日用百货"
                value="2"
              />
              <el-option 
                label="生鲜冷藏" 
                value="3"
              />
              <el-option 
                label="乳饮酒水" 
                value="4"
              />
              <el-option 
                label="面点素食" 
                value="5"
              />
              <el-option 
                label="数码家电" 
                value="6"
              />
              <el-option 
                label="家用纺织" 
                value="7"
              />
              <el-option 
                label="坚果蜜饯" 
                value="8"
              />
              <el-option 
                label="纸品家清" 
                value="9"
              />
              <el-option 
                label="粮油米面" 
                value="10"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="商品推荐"
            prop="recommend"
          >
            <el-select
              v-model="ruleForm.recommend"
              placeholder="请选择活动区域"
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
          <div class="imgupload">
            <el-upload
              :on-success="success"
              :on-remove="handleRemove"
              :before-upload="beforeupload"
              :data="qiniuData"
              class="uploadImg"
              action="http://upload.qiniup.com"
              list-type="picture"
            >
              <el-button 
                type="primary" 
                size="medium"
              >
                点击上传图片
                <i 
                  class="el-icon-upload 
                  el-icon--right"
                />
              </el-button>
            </el-upload>
          </div>
          <el-form-item>
            <el-button
              @click="submitForm('ruleForm')"
              type="primary"
            >
              添加商品
            </el-button>
            <el-button
              @click="resetForm('ruleForm')"
              type="primary"
            >
              清空信息
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
      qiniuData: {
        key: "",
        token: ""
      },
      addUrl: "https://qnimg.vadxq.com/",
      imgUrl: "",
      img: {
        cover: [],
        detail: []
      },
      ruleForm: {
        title: "",
        tag: "",
        price: "",
        desc: "",
        stock: "",
        recommend: "",
        imgSpeice: "商品封面图"
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名名称", trigger: "blur" },
          { min: 1, max: 20, message: "名称不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "价格只能为数字" },
          { type: "number", min: 0, mx: 11, message: "请输入正确的价格" }
        ],
        stock: [
          { required: true, message: "请输入商品数量", trigger: "change" },
          { type: "number", message: "数量只能为数字", trigger: "blur" },
          { type: "number", min: 0, mx: 11, message: "请您输入正确的库存" }
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
          { required: true, message: "请选择商品折扣方式", trigger: "change" },
          { type: "number", message: "数量只能为数字", trigger: "change" },
          { type: "number", min: 0, mx: 11, message: "请您输入合理的折扣" }
        ],
        recommend: [
          { required: true, message: "请选择是否推荐", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.goods.token_data
    })
  },
  mounted: function() {
    this.getToken();
  },
  methods: {
    ...mapActions(["addGoodsAction", "getTokenAction"]),
    // 提交表单方法
    submitForm(formName) {
      if (this.img.cover.length == 0 || this.img.detail.length == 0) {
        this.$message({
          message: "图片不能为空",
          type: "warn"
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 处理选择的上架状态
            let recommend;
            if (this.ruleForm.recommend == "推荐") {
              recommend = 1;
            } else {
              recommend = 0;
            }
            let obj = {
              data: {
                title: this.ruleForm.title,
                cover: this.img.cover,
                detail: this.img.detail,
                tag: parseInt(this.ruleForm.tag, 10),
                price: this.ruleForm.price,
                stock: parseInt(this.ruleForm.stock),
                discount: parseInt(100, 10),
                isRecommend: recommend,
                desc: this.ruleForm.desc
              },
              that: this
            };
            this.addGoodsAction(obj);
          } else {
            this.$message({
              message: "信息不能为空",
              type: "warn"
            });
          }
        });
      }
    },
    // 重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
        for (let i = 0; i < this.img.cover.length; i++) {
          if (this.img.cover[i] == url) {
            this.img.cover.splice(i, 1);
          }
        }
      }
    },
    // 上传成功后触发的事件
    success(response, fileList) {
      console.log(this.ruleForm.imgSpeice)
      if (this.ruleForm.imgSpeice == "商品封面图") {
        this.img.cover.push(this.addUrl + this.qiniuData.key);
      } else {
        this.img.detail.push(this.addUrl + this.qiniuData.key);
      }
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
    getToken() {
      this.getTokenAction();
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
.goods-add {
  width: 400px;
}
.el-select {
  width: 300px;
}
.el-input--suffix .el-input__inner {
  width: 300px;
}
.uploadImg {
  width: 300px;
  padding-left: 100px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
}
.imgupload {
  display: flex;
}
.el-button--primary {
  width: 142px;
}
</style>
