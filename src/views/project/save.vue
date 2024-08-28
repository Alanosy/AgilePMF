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
              <el-form-item label="项目时间"   class="picker-cl ">
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
                  <el-radio-group class="radio-cl" v-model="ItemForm.state">
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
        </el-form>
        <div
          style="display: flex; justify-content: flex-end; margin-right: 100px"
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
  // computed: {
  //   data() {
  //     return this.$route.query.data;
  //   },
  // },
  created(){
      console.log(this.$route.query.data)
  },
  methods: {


  },
};
</script>
<style lang="scss" scoped>
.saveform {
  padding: 16px 16px;
  background-color: #f5f7f9;
  border-radius: 5px;
}
.radio-cl {
  .el-radio {
    margin-right: 10px;
  }
}
.picker-cl {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }
}
</style>
