<template>
  <div class="myself">
    <div class="myself-content">
      <div class="myself-title" style="font-size:18px;">个人资料修改</div>
      <div class="myself-content-main">
        <div>
          <el-form :model="MyselfDataForm">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input
                v-model="MyselfDataForm.realName"
                autocomplete="off"
                style="width: 300px"
              />
            </el-form-item>
            <el-form-item  :label-width="formLabelWidth">
              <el-button type="primary" @click="updateMyselfData">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateMyselfData } from "@/api/user";

export default {
  data() {
    return {
      formLabelWidth: "70px",
      MyselfDataForm: {
        realName: "",
      },
    };
  },
  methods: {
    updateMyselfData() {
      const data = {
        realName: this.MyselfDataForm.realName,
      };
      updateMyselfData(data).then((res) => {
        if (res.code) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
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
