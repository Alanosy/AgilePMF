<template>
  <el-dialog :title="title" :visible.sync="visible" width="1200px" >
    <slot name="dialogContent"></slot>
      <el-form
        label-width="70px"
        label-position="left"
        :inline="true"
        :model="taskform"
        class="demo-form-inline"
      >
        <el-row>
          <el-col span="12">
            <el-form-item label="任务标题">
              <el-input
                v-model="taskform.name"
                placeholder="任务标题"
                style="width: 450px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="指派给">
              <UserSelect v-model="taskform.userid" style="width: 450px"></UserSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="6">
            <el-form-item label="工时评估">
              <el-input
                v-model="taskform.user"
                placeholder="工时评估"
                style="width: 150px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="任务类型">
              <el-select
                v-model="taskform.type"
                placeholder="任务类型"
                style="width: 150px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="计划时间">
              <el-select
                v-model="taskform.region"
                placeholder="计划时间"
                style="width: 450px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="任务状态">
              <el-input
                v-model="taskform.state"
                placeholder="审批人"
                style="width: 450px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="关联问题">
              <el-select
                v-model="taskform.region"
                placeholder="活动区域"
                style="width: 450px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="任务需求" style="width: 1130px">
            <template>
              <div style="border: 1px solid #ccc; width: 1035px">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editor"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                />
                <Editor
                  style="height: 200px; overflow-y: hidden"
                  v-model="taskform.content"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="onCreated"
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
export default {
components: {
    Editor,
    Toolbar,
    UserSelect
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
  },
  data() {
    return {
      visible: this.value,
      taskform: {
        content: "",
        name: "",
        userid: 1,
        priority: 1,
        type: 1,
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
      saveTaskFun() {
      const data = {
        content: this.taskform.content,
        name: this.taskform.name,
        userid: this.taskform.userid,
        priority: this.taskform.priority,
        type: this.taskform.type,
      };
      saveTask(data).then((res) => {
        if (res.code) {
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