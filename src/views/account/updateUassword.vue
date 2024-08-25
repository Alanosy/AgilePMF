<template>
  <div class="myself">
    <div class="myself-content">
      <div class="myself-title" style="font-size:18px;">密码修改</div>
      <div class="myself-content-main">
        <div>
          <el-form :model="updatePasswordForm">
            <el-form-item label="原 密 码" :label-width="formLabelWidth">
              <el-input
                v-model="updatePasswordForm.oldPw"
                autocomplete="off"
                style="width: 300px"
              />
            </el-form-item>
            <el-form-item label="新 密 码" :label-width="formLabelWidth">
              <el-input
                v-model="updatePasswordForm.newPw"
                type="password"
                autocomplete="off"
                style="width: 300px"
              />
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input
                v-model="updatePasswordForm.newPwC"
                type="password"
                autocomplete="off"
                style="width: 300px"
              />
            </el-form-item>

            <el-form-item  :label-width="formLabelWidth">
              <el-button type="primary" @click="updatePassword">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassword } from "@/api/user";

export default {
  data() {
    return {
      formLabelWidth: "70px",
      updatePasswordForm: {
        oldPw: "",
        newPw: "",
        newPwC: "",
      },
    };
  },
  methods: {
    updatePassword() {
      const data = {
        originPassword: this.updatePasswordForm.oldPw,
        newPassword: this.updatePasswordForm.newPw,
        checkedPassword: this.updatePasswordForm.newPwC,
      };
      changePassword(data).then((res) => {
        if (res.code) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.$router.push({ path: "/login", query: { zhi: 1 } });
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.myself {
  height: 100vh;
  padding: 30px;
  .myself-content {
    background: #fff;
    width: 100%;
    height: 100vh;
    padding: 30px;
    .myself-content-main {
      padding-top: 30px;
    }
  }
}
</style>
