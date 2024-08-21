<template>
  <el-dialog :title="title" :visible.sync="visible" width="1200px">
    <slot name="dialogContent"></slot>
    <el-form
      label-width="70px"
      label-position="left"
      :inline="true"
      :model="reqform"
      class="demo-form-inline"
    >
      <el-row>
        <el-col span="16">
          <el-form-item label="需求名称">
            <el-input
              v-model="reqform.name"
              placeholder="需求名称"
              style="width: 690px"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-form-item label="指派给">
          <UserSelect v-model="reqform.userid"></UserSelect>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="优先级">
            <template>
              <el-radio-group v-model="reqform.priority" class="radio-cl">
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
              v-model="reqform.startdate"
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker>

            <el-date-picker
              v-model="reqform.enddate"
              type="date"
              placeholder="结束日期"
              style="margin-left: 16px"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-form-item label="执行计划">
          <el-select v-model="reqform.region" placeholder="执行计划">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="需求方">
           <UserSelect v-model="reqform.requserid"></UserSelect>
            <!-- <el-select v-model="reqform.region" placeholder="需求方" style="width: 300px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="关联产品">
          <ProjectSelect v-model="reqform.itemId"></ProjectSelect>
            <!-- <el-select v-model="reqform.region" placeholder="需求方" style="width: 300px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>

        <el-form-item label="关联PRD">
          <UserSelect v-model="reqform.region"></UserSelect>
        </el-form-item>
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
                v-model="reqform.content"
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
      <el-button type="primary" @click="saveReqFun()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveReq } from "@/api/requirement";
import UserSelect from "@/components/UserSelect";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
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
      reqform: {
        name: "",
        state: 1,
        itemId: null,
        userid: null,
        priority: 1,
        requserid:1,
        content: "",
        startdate: null,
        enddate: null,
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
    saveReqFun() {
      const data = {
        name: this.reqform.name,
        state: this.reqform.state,
        userid: this.reqform.userid,
        priority: this.reqform.priority,
        content: this.reqform.content,
        startdate: this.reqform.startdate,
        enddate: this.reqform.enddate,
      };
      saveReq(data).then((res) => {
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
.radio-cl {
  .el-radio {
    margin-right: 10px;
  }
}
.picker-cl {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 143px;
  }
}
</style>
