<template>
  <el-dialog :title="title" :visible.sync="visible" width="1200px" >
    <slot name="dialogContent"></slot>
      <el-form
        label-width="70px"
        label-position="left"
        :inline="true"
        :model="taskForm"
        class="demo-form-inline"
      >
        <el-row>
          <el-col span="16">
            <el-form-item label="任务标题">
              <el-input
                v-model="taskForm.name"
                placeholder="任务标题"
               style="width: 690px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="指派给">
              <UserSelect v-model="taskForm.principalId" ></UserSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col span="6">
            <el-form-item label="工时评估">
              <el-input
                v-model="taskform.user"
                placeholder="工时评估"
                style="width: 150px"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col span="8">
            <el-form-item label="状态">
              <template>
                <el-radio-group v-model="taskForm.state" class="radio-cl">
                  <el-radio :label="0">待办</el-radio>
                  <el-radio :label="1">已开始</el-radio>
                  <el-radio :label="2">已完成</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
           <el-col span="8">
            <el-form-item label="计划时间" class="picker-cl">
              <el-date-picker
                v-model="taskForm.startDate"
                type="date"
                placeholder="开始日期"
              >
              </el-date-picker>

              <el-date-picker
                v-model="taskForm.endDate"
                type="date"
                placeholder="结束日期"
                style="margin-left: 16px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>  
            <el-form-item label="关联项目">
          <ProjectSelect v-model="taskForm.itemId"></ProjectSelect>
          </el-form-item>       
        </el-row>
       
        <el-row>
          <el-form-item label="任务需求" style="width: 1130px">
            <template>
              <div style="border: 1px solid #ccc; width: 1035px">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                />
                <Editor
                  style="height: 200px; overflow-y: hidden"
                  v-model="taskForm.content"
                />
              </div>
            </template>
          </el-form-item>
        </el-row>
      </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="saveTaskFun()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import UserSelect from "@/components/UserSelect";
import {saveTask } from "@/api/task"
import ProjectSelect from "@/components/ItemSelect";
export default {
components: {
    Editor,
    Toolbar,
    UserSelect,
    ProjectSelect
  },
  props: {
    title: {
      type: String,
      default: "提示",
    },
    value: {
      type: Boolean,
      default: false,
    },
     refreshData: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      visible: this.value,
      taskForm: {
        content: "",
        name: "",
        itemId:null,
        principalId: 1,
        state: 1,
        startDate:null,
        endDate:null,
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
    },
  },
  methods: {
         formatDateToISOString(date) {
      // 确保输入是一个Date对象
      if (!(date instanceof Date)) {
        throw new TypeError('Expected a Date object')
      }

      // 格式化为ISO 8601格式，注意这里的时区会自动调整为UTC
      let isoString = date.toISOString()

      // 截取并重新组合字符串，去除毫秒部分并替换T为大写
      // 这一步是根据你的需求调整，通常ISO 8601格式包含毫秒且T是小写
      isoString = isoString.split('.')[0].replace('T', 'T')

      return isoString
    },
      saveTaskFun() {
      const data = {
        content: this.taskForm.content,
        name: this.taskForm.name,
        principalId: this.taskForm.principalId,
        priority: this.taskForm.priority,
        state: this.taskForm.state,
        startDate: this.formatDateToISOString(this.taskForm.startDate),
        endDate: this.formatDateToISOString(this.taskForm.endDate),
        itemId: this.taskForm.itemId,
      };
      saveTask(data).then((res) => {
        if (res.code) {
          this.refreshData();
          this.visible = false;

        } else {
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
.radio-cl{
  .el-radio{
    margin-right: 10px;
  }
}
.picker-cl{
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width:143px
  }
}
</style>