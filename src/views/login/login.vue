<template>
  <div class="container">
    <div class="login-wrapper">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="header">Login</div>
        <div class="form-wrapper">
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>

          <div style="display: flex">
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="code"
                style="width: 300px"
                placeholder="code"
                name="code"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
            <img
              ref="captchaImg"
              src="/api/auths/captcha"
              style="margin-left: 20px; height: 40px"
              alt=""
              @click="getVerify"
            />
          </div>
           <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          class="btn"
          @click.native.prevent="handleLogin"
          >login</el-button
        >
      </el-form-item>

        </div>
        <div class="msg">
          Don't have account?
          <router-link to="/register"> Sign up </router-link>
        </div>
      </el-form>
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
export default {
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
      loginForm: {
        username: "",
        password: "",
      },
      code: "",
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    // this.getEmail()
  },
  methods: {
    getVerify() {
      this.$refs.captchaImg.src = `/api/auths/captcha?${Math.random()}`;
      // obj.src = "/api/auths/captcha?" + Math.random();
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
              const loginData = {
                username: this.loginForm.username,
                password: this.loginForm.password,
              };
              this.$store
                .dispatch("user/login", loginData)
                .then((res) => {
                  this.$store.commit("menu/CLOSE_SIDEBAR");
                  if(res.teamState==0){
                    this.$router.push({ path: "teamChoice" });
                  }
                  if(res.teamState==1){
                    this.$router.push({ path: "index" });
                  }
                  if(res.teamState==2){
                    this.$router.push({ path: "hint" });
                  }
                  if(res.teamState==3){
                    this.$router.push({ path: "teamChoice" });
                  }
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
