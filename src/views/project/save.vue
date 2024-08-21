<template>
  <div class="app-container">
    <div class="saveform">
      <div style="margin-bottom: 13px">项目信息</div>
      <div>
        <el-form
          :inline="true"
          label-width="90px"
          label-position="left"
          :model="ItemForm"
          class="demo-form-inline"
        >
          <el-row>
            <el-col span="8">
              <el-form-item label="项目名称">
                <el-input
                  v-model="ItemForm.name"
                  placeholder="项目名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="项目时间">
                <el-date-picker
                  v-model="ItemForm.startdate"
                  type="date"
                  placeholder="开始日期"
                >
                </el-date-picker>

                <el-date-picker
                  v-model="ItemForm.enddate"
                  type="date"
                  placeholder="结束日期"
                  style="margin-left: 16px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="项目状态">
                <template>
                  <el-radio-group v-model="ItemForm.state">
                    <el-radio :label="1">立项中</el-radio>
                    <el-radio :label="2">规划中</el-radio>
                    <el-radio :label="3">进行中</el-radio>
                    <el-radio :label="4">已完成</el-radio>
                    <el-radio :label="5">挂起</el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="8">
              <el-form-item label="项目负责人">
                <UserSelect v-model="ItemForm.userid"></UserSelect>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div
          style="display: flex; justify-content: flex-end; margin-right: 30px"
        >
          <el-button type="primary" @click="saveItemFun()">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserSelect from "@/components/UserSelect"
import { saveItem } from "@/api/project"
export default {
  components: {
    UserSelect
  },
  data() {
    return {
      ItemForm: {
        name: "",
        startdate: null,
        enddate: null,
        state: 1,
        userid: null,
      },
    };
  },
  methods: {
    saveItemFun(){
      const data = {
        name: this.ItemForm.name,
        startdate: this.ItemForm.startdate,
        enddate: this.ItemForm.enddate,
        state: this.ItemForm.state,
        userid: this.ItemForm.userid,
      }
        saveItem(data).then(res=>{
            if(res.code){
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                this.$router.push({ name: "project"});
            }
            else{
               this.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        })
    }

  },
};
</script>
<style lang="scss" scoped>
.saveform {
  padding: 16px 16px;
  background-color: #f5f7f9;
  border-radius: 5px;
}
</style>
