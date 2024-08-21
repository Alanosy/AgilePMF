<template>
  <el-dialog :title="title" :visible.sync="visible" width="1200px" >
    <slot name="dialogContent"></slot>
        <el-form
        label-width="70px"
        label-position="left"
        :inline="true"
        :model="issueform"
        class="demo-form-inline"
      >
        <el-row>
          <el-col span="16">
            <el-form-item label="需求名称">
              <el-input
                v-model="issueform.name"
                placeholder="需求名称"
                style="width: 690px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="指派给">
              <UserSelect v-model="issueform.userid"></UserSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="优先级">
              <template>
                <el-radio-group v-model="issueform.priority" class="radio-cl">
                  <el-radio :label="1">P3低</el-radio>
                  <el-radio :label="2">P2中</el-radio>
                  <el-radio :label="3">P1高</el-radio>
                  <el-radio :label="4">P0紧急</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="计划时间" class="picker-cl">
              <el-date-picker
                v-model="issueform.startdate"
                type="date"
                placeholder="开始日期"
              >
              </el-date-picker>

              <el-date-picker
                v-model="issueform.enddate"
                type="date"
                placeholder="结束日期"
                style="margin-left: 16px"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="执行计划">
              <el-select v-model="issueform.region" placeholder="执行计划">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="需求方">
              <el-select
                v-model="issueform.region"
                placeholder="需求方"
                style="width: 300px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="关联产品">
             <ProjectSelect v-model="issueform.itemId"></ProjectSelect>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="关联PRD">
              <UserSelect></UserSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="任务需求" style="width: 1050px">
            <template>
              <div style="border: 1px solid #ccc; width: 975px">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editor"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
                />
                <Editor
                  style="height: 200px; overflow-y: hidden"
                  v-model="issueform.content"
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
      <el-button type="primary" @click="saveIssueFun()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import UserSelect from "@/components/UserSelect";
import {saveIssue} from "@/api/issue"
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
  },
  data() {
    return {
      visible: this.value,
      issueform: {
          name: "",
          type: 1,
          userid: null,
          itemId:null,
          content: "",
          priority: 1,
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
    saveIssueFun() {
      const data = {
        name: this.issueform.name,
        type: this.issueform.type,
        userid: this.issueform.userid,
        content: this.issueform.content,
        priority: this.issueform.priority,
      };
      saveIssue(data).then((res) => {
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
  }

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