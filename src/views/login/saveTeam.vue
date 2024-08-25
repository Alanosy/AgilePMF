<template>
  <div>
    <el-form ref="saveTeamForm" :model="saveTeamForm" label-width="80px">
      <el-form-item label="团队名称">
        <el-input v-model="saveTeamForm.teamName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="团队代码">
    <el-input v-model="saveTeamForm.name"></el-input>
  </el-form-item>
    <el-form-item label="邮箱">
    <el-input v-model="saveTeamForm.name"></el-input>
  </el-form-item> -->
      <div style="display: flex">
        <el-form-item prop="username" label="验证码">
          <el-input
            ref="vcode"
            v-model="saveTeamForm.vcode"
            style="width: 220px"
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
    </el-form>
    <div style="display: flex; justify-content: center">
      <el-button type="success" @click="$emit('switch-back')">上一步</el-button>
      <el-button type="primary" @click="saveTeamFun()">创建团队</el-button>
    </div>
  </div>
</template>
<script>
import { verifyCode } from "@/api/user";
import { saveTeam } from "@/api/team";
export default {
  name: "saveTeam",
 props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
        userData: this.data,
      saveTeamForm: {
        teamName: "",
        vcode: "",
      },
    };
  },
  watch: {
    data(val) {
      this.userData = val;
    },
    userData(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    getVerify() {
      this.$refs.captchaImg.src = `/api/auths/captcha?${Math.random()}`;
    },
    saveTeamFun() {
      verifyCode(this.vcode).then((resv) => {
        if (resv.code) {
          const data = {
            teamName: this.saveTeamForm.teamName,
          };
          saveTeam(data).then((res) => {
            if (res.code) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.$router.push({ path: "/login" });
            } else {
              this.$message({
                type: "info",
                message: res.msg,
              });
            }
          });
        } else {
          this.$message({
            type: "info",
            message: resv.msg,
          });
        }
      });
    },
  },
};
</script>
<style scoped></style>
