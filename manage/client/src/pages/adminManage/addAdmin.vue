<template>
  <div class="addAdmin">
    <div
      v-loading="admin.isLoading"
      class="listshow"
      element-loading-text="数据加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0,0)"
    />
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      status-icon
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="名称"
        prop="username"
      >
        <el-input
          v-model="ruleForm.username"
          placeholder="请填写用户名..."
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="请填写密码..."
          show-password
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="checkPassword"
      >
        <el-input
          v-model="ruleForm.checkPassword"
          type="password"
          placeholder="请再次确认密码..."
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submitForm('ruleForm')"
          type="primary"
        >
          添加
        </el-button>
        <el-button @click="resetForm('ruleForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("管理员名称不能为空"));
      }
      const verifyType = /^[A-Za-z0-9_]+$/;
      const flag = verifyType.test(value);
      if (!flag) {
        callback(new Error("用户名由字母数字下划线组成！"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const verifyType = /^[A-Za-z0-9_]+$/;
        const flag = verifyType.test(value);
        if (!flag) {
          callback(new Error("用户名由字母数字下划线组成！"));
        }
        const len = value.length;
        if (len < 6 || len > 12) {
          callback(new Error("密码长度为6-12位"));
        }
        callback();
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPassword: "",
        username: ""
      },
      rules: {
        username: [{ validator: checkUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPassword: [{ validator: validatePassword2, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({
      admin: state => state.admin
    })
  },
  methods: {
    ...mapActions(["addAdminAction"]),
    submitForm(formName) {
      handleSubmit(this, formName);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
const handleSubmit = (that, formName) => {
  that.$refs[formName].validate(valid => {
    if (valid) {
      const username = that.$data.ruleForm.username;
      const password = that.$data.ruleForm.password;
      that.addAdminAction({ username, password, that, formName });
    } else {
      return false;
    }
  });
};
</script>

<style scoped>
.addAdmin {
  width: 400px;
  height: 230px;
  margin: 50px auto;
  padding: 30px 85px 30px 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
}
</style>