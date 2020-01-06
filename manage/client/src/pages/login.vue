<template>
  <div>
    <div class="header">
      后台管理系统
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      class="login el-zoom-in-bottom"
    >
      <el-form-item prop="userName">
        <el-input
          v-model="ruleForm.userName"
          class="item"
          placeholder="请输入用户名"
          clearable
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-user-solid"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          class="item"
          placeholder="请输入密码"
          show-password
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-lock"
          />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="log.isLoading"
          @click="login"
          class="item submit"
          type="primary"
          round
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    const validateUserName = validateUser;
    const validatePassword = validatePass;
    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({
      log: state => state.log
    })
  },
  methods: {
    ...mapActions(["loginAction"]),
    login() {
      submitForm(this);
    }
  }
};

// 自定义用户名验证规则
const validateUser = (rule, value, cb) => {
  if (value === "") {
    cb(new Error("请输入用户名"));
  } else {
    const verifyType = /^[A-Za-z0-9_]+$/;
    const flag = verifyType.test(value);
    if (!flag) {
      cb(new Error("用户名由字母数字下划线组成！"));
    }
    cb();
  }
};

// 自定义密码验证规则
const validatePass = (rule, value, cb) => {
  if (value === "") {
    cb(new Error("请输入密码"));
  } else {
    const len = value.length;
    if (len < 6 || len > 12) {
      cb(new Error("密码长度为6-12位"));
    }
    cb();
  }
};

// 表单提交
const submitForm = that => {
  that.$refs["ruleForm"].validate(valid => {
    if (valid) {
      const username = that.$data.ruleForm.userName;
      const password = that.$data.ruleForm.password;
      const userInfo = {
        username,
        password
      };
      that.loginAction({ userInfo, that });
    } else {
      that.$message({
        message: "请查看填写内容",
        type: "error"
      });
      return false;
    }
  });
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 200px;
  text-align: center;
  line-height: 200px;
  color: aliceblue;
  font-size: 24px;
  font-weight: bold;
  background-color: #292961;
}
.login {
  width: 300px;
  padding: 20px;
  border: 1px solid rgba(7, 17, 27, 0.06);
  box-sizing: content-box;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(7, 17, 27, 0.06);
  margin: 50px auto 0;
}
.login .submit {
  width: 100%;
}
</style>