<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">团队配置</div>
      <div class="form-wrapper">
        <component :is="currentComponent" @switch-back="switchBack"></component>

        <div v-if="showButtons" class="btnGroup">
          <div>你已申请加入他人团队，请等待管理员审核。请稍后<span style="color: blue" @click="goLogin()">登录</span></div>
          <!-- <el-button class="addTeam btn2" type="success" @click="addTeamFun()">加入团队</el-button> -->
          <div class="msg">
            我想自己创建团队
            <span style="color: blue" @click="saveTeamFun()">创建团队</span>
          </div>
          
        </div>

        <!-- <el-button v-if="!showButtons" @click="switchBack()">返回</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { setToken } from "@/utils/auth";
import axios from "axios";
import { getTokenInfo } from "@/utils/jwtUtils";
import { verifyCode } from "@/api/user";
import { Message } from "element-ui";
import { Encrypt } from "@/utils/Secret";
import addTeam from "./addTeam";
import saveTeam from "./saveTeam";
export default {
  components: {
    saveTeam,
    addTeam,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      userData: this.data,
      showButtons: true,
      currentComponent: "MyTasks",
      items: [
        { title: "我的工作台", component: "MyTasks" },
        { title: "任务看板", component: "AssignedTasks" },
        { title: "我的日报", component: "MyDemands" },
        { title: "我的任务排期", component: "TaskSchedules" },
        { title: "我提的需求", component: "MyRequests" },
        { title: "我的问题", component: "MyQuestions" },
        { title: "我创建的问题", component: "CreatedQuestions" },
        { title: "我的项目", component: "MyProjects" },
      ],
      registerForm: {
        username: "",
        password: "",
        checkedPassword: "",
      },
      code: "",
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      checkedPasswordType: "password",
    };
  },
  watch: {
    data(val) {
      this.userData = val;
    },
    userData(val) {
      this.$emit("input", val);
    },
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    this.$on("switch-back", this.switchBack);
  },
  methods: {
    addTeamFun() {
      this.currentComponent = "addTeam"; // 假设这是加入团队的组件名称
      this.showButtons = false;
    },
    goLogin(){
      this.$router.push({ path: "/login" });
    },
    saveTeamFun() {
      this.currentComponent = "saveTeam"; // 假设这是创建团队的组件名称
      this.showButtons = false;
    },
    toggleButtons() {
      this.showButtons = true;
    },
    switchBack() {
      this.currentComponent = "MyTasks";
      this.toggleButtons();
    },
    changeContent(item) {
      this.currentComponent = item.component;
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    getVerify() {
      this.$refs.captchaImg.src = `/api/auths/captcha?${Math.random()}`;
    },

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      verifyCode(this.code).then((res) => {
        if (res.code) {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              this.loading = true;
              const registerData = {
                username: this.registerForm.username,
                password: this.registerForm.password,
              };
              this.$store
                .dispatch("user/login", registerData)
                .then(() => {
                  this.$store.commit("menu/CLOSE_SIDEBAR");
                  const userInfo = getTokenInfo();
                  console.log(userInfo);
                  this.$store.dispatch("loginUser", { id: userInfo.id });
                  this.$router.push({ path: "index" });
                  this.loading = false;
                })
                .catch((error) => {
                  this.getVerify();
                  Message.error(error.msg);
                  this.loading = false;
                });
            } else {
              return false;
            }
          });
        } else {
          this.getVerify();
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.addTeam {
  margin-bottom: 50px !important;
}
.saveTeam {
}
.btn2 {
  text-align: center;
  padding: 10px;
  width: 50%;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}
.btnGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-button {
    margin: 0 10px;
  }
}
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
body {
  height: 100%;
}
.container {
  height: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-wrapper {
  background-color: #fff;
  width: 500px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}
.input-item:placeholder {
  text-transform: uppercase;
}
.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}
.msg {
  text-align: center;
  line-height: 88px;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}

.form-wrapper {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      /* background: transparent; */
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
