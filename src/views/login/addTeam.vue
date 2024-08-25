<template>
  <div>
    <el-form ref="saveTeamForm" :model="addTeamForm" label-width="80px">
      <el-form-item label="团队代码">
        <el-input v-model="addTeamForm.tcode"></el-input>
      </el-form-item>
    </el-form>
    <div style="display: flex; justify-content: center; margin-top: 50px !important">
      <el-button type="success" @click="$emit('switch-back')">上一步</el-button>
      <el-button type="primary" @click="addTeamFun">加入团队</el-button>
    </div>
  </div>
</template>
<script>
import { addTeam } from "@/api/team";
export default {
  name: "addTeam",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    data(val) {
      this.userData = val;
    },
    userData(val) {
      this.$emit("input", val);
    },
  },
  data() {
    return {
      userData: this.data,
      addTeamForm: {
        tcode: null,
      },
    };
  },
  methods: {
    addTeamFun() {
        const data = {
            tcode: this.addTeamForm.tcode,
            userId: this.userData.id,
          };
        
        addTeam(data).then((resv) => {
          if (resv.code) {
            this.$message({
              type: "success",
              message: resv.msg,
            });
            this.$router.push({ path: "/hint" });
          } else {
            this.$message({
              type: "info",
              message: resv.msg,
            });
          }
        });

    },
    getVerify() {
      this.$refs.captchaImg.src = `/api/auths/captcha?${Math.random()}`;
    },
  },
};
</script>
<style scoped>
.a {
}
</style>
