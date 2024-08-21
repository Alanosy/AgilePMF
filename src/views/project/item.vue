<template>
  <div class="main">
    <div class="main-head">
      <div>
        {{ data.name }}
      </div>
      <div>
        <el-button type="primary">成员管理</el-button>
      </div>
    </div>
    <div class="cltop">
      <div>
        <div class="module-header">
          <div class="left-title feature-module-name">项目概览</div>
          <div class="right-tool">2222</div>
        </div>
        <div class="module-content item-2">
          <el-progress type="circle" :percentage="100" status="success"></el-progress>
          <el-progress type="circle" :percentage="100" status="success"></el-progress>
          <el-progress type="circle" :percentage="100" status="success"></el-progress>
          <el-progress type="circle" :percentage="100" status="success"></el-progress>
        </div>
      </div>
    </div>
    <div class="cltop">
      <div class="project-need-table-module">
        <div class="module-header">
          <div class="left-tool">项目需求</div>
          <div class="right-opertaion">
            <div class="ivu-dropdown">
              <div class="ivu-dropdown-rel">
                <el-button type="primary" @click="requirementVisible = true"
                  >添加需求</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="module-content">
          <el-table :data="ReqData.records" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"> </el-table-column>
            <el-table-column prop="name" label="需求名称" width="180"> </el-table-column>
            <el-table-column prop="address" label="需求状态"> </el-table-column>
            <el-table-column prop="priority" label="优先级"> </el-table-column>
            <el-table-column prop="address" label="负责人"> </el-table-column>
            <el-table-column prop="address" label="计划完成"> </el-table-column>
            <el-table-column prop="address" label="实际完成"> </el-table-column>
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="50"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="cltop" id="projectList">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">项目文档</div>
          <div class="right-opertaion"></div>
        </div>
        <div class="module-content">
          <Editor
            style="height: 200px; overflow-y: hidden"
            v-model="taskform.content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div>
      </div>
    </div>
    <div class="cltop content-layer" id="PROBLEM_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">项目问题</div>
          <div class="right-opertaion">
            <div class="ivu-dropdown">
              <div class="ivu-dropdown-rel">
                <el-button type="primary" @click="issueVisible = true"
                  >添加问题</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="module-content">
          <el-table :data="IssueData.records" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"> </el-table-column>
            <el-table-column prop="type" label="类型" width="180"> </el-table-column>
            <el-table-column prop="name" label="问题标题"> </el-table-column>
            <el-table-column prop="address" label="状态"> </el-table-column>
            <el-table-column prop="address" label="指派给"> </el-table-column>
            <el-table-column prop="priority" label="优先级"> </el-table-column>
            <el-table-column prop="address" label="最后更新"> </el-table-column>
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="50"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="cltop content-layer" id="TASK_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">项目任务</div>
          <div class="right-opertaion">
            <div class="ivu-dropdown">
              <div class="ivu-dropdown-rel">
                <el-button type="primary" @click="taskVisible = true">添加任务</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="module-content">
          <el-table :data="TaskData.records" style="width: 100%">
            <el-table-column prop="date" label="ID" width="180"> </el-table-column>
            <el-table-column prop="name" label="状态" width="180"> </el-table-column>
            <el-table-column prop="name" label="任务标题"> </el-table-column>
            <el-table-column prop="address" label="负责人"> </el-table-column>
            <el-table-column prop="address" label="计划完成"> </el-table-column>
            <el-table-column prop="address" label="实际完成"> </el-table-column>
            <el-table-column prop="address" label="最后更新"> </el-table-column>
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="50"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="cltop content-layer" id="ATTACHMENT_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">附件</div>
          <div class="right-opertaion"></div>
        </div>
        <div class="module-content" style="display: flex; justify-content: center">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="cltop content-layer" id="remark">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">备注</div>
          <div class="right-opertaion"></div>
        </div>
        <div class="module-content">
          <Editor
            style="height: 200px; overflow-y: hidden"
            v-model="taskform.content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div>
      </div>
    </div>
    <!-- 需求对话框 -->
    <req-dialog
      v-model="requirementVisible"
      title="添加需求"
      @confirm="handleConfirm"
      @close="handleClose"
    >
    </req-dialog>
    <!-- 添加问题 -->
    <issue-dialog
      v-model="issueVisible"
      title="添加问题"
      @confirm="handleConfirm"
      @close="handleClose"
    >
    </issue-dialog>

    <!-- 添加任务 -->
    <task-dialog
      v-model="taskVisible"
      title="添加任务"
      @confirm="handleConfirm"
      @close="handleClose"
    >
    </task-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import UserSelect from "@/components/UserSelect";
import { saveReq } from "@/api/requirement";
import { saveIssue } from "@/api/issue";
import { saveTask } from "@/api/task";
import ReqDialog from "@/components/ReqDialog/ReqDialog.vue";
import TaskDialog from "@/components/TaskDialog/TaskDialog.vue";
import IssueDialog from "@/components/IssueDialog/IssueDialog.vue";
import {getIssue} from "@/api/issue"
import {getReq} from "@/api/requirement";
import {getTask} from "@/api/task"
export default {
  components: {
    UserSelect,
    Editor,
    Toolbar,
    ReqDialog,
    TaskDialog,
    IssueDialog,
  },
  data() {
    return {
      ReqData:{},
      TaskData:{},
      IssueData:{},
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      requirementform: {
        name: "",
        state: 1,
        userid: null,
      },
      formInline: {
        user: "",
        region: "",
      },
      requirementVisible: false,
      issueVisible: false,
      taskVisible: false,
      reqform: {
        name: "",
        state: 1,
        userid: null,
        priority: 1,
        content: "",
        startdate: null,
        enddate: null,
      },
      issueform: {
        name: "",
        type: 1,
        userid: null,
        content: "",
        priority: 1,
      },
      taskform: {
        content: "",
        name: "",
        userid: null,
        priority: 1,
        type: 1,
      },
    };
  },
  computed: {
    itemId(){
      return this.$route.query.data.id
    },
    data() {
      return this.$route.query.data;
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  created(){
    this.getTaskFun();
    this.getReqFun();
    this.getIssueFun();
  },
  methods: {
    // 获取任务
    async getTaskFun(pageNum, pageSize, name = null,itemId = this.itemId) {
      const params = { pageNum: pageNum, pageSize: pageSize, name: name ,itemId:itemId};
      const res = await getTask(params);
      this.TaskData = res.data;
    },
    // 获取需求
    async getReqFun(pageNum, pageSize, name = null,itemId = this.itemId) {
      const params = { pageNum: pageNum, pageSize: pageSize, name: name,itemId:itemId };
      const res = await getReq(params);
      this.ReqData = res.data;
    },
    // 获取问题

    async getIssueFun(pageNum, pageSize, name = null,itemId = this.itemId) {
      const params = { pageNum: pageNum, pageSize: pageSize, name: name,itemId:itemId };
      const res = await getIssue(params);
      this.IssueData = res.data;
    },
    saveTaskFun() {
      saveTask(this.taskform).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "error",
          });
        }
      });
    },
    saveIssueFun() {
      saveIssue(this.issueform).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "error",
          });
        }
      });
    },
    saveReqFun() {
      saveReq(this.reqform).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "error",
          });
        }
      });
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  // min-height: calc(100vh - 64px);
}

.el-radio {
  margin-right: 6px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 145px;
}
.item-2 {
  display: flex;
  justify-content: space-evenly;
}
.main-head {
  width: 100%;
  height: 60px;
  padding: 12px 30px 12px 30px;
  background-color: #f5f7f9;
  display: flex;
  justify-content: space-between;
}
.cltop {
  padding: 16px 24px;
  width: calc(100% - 64px);
  background-color: #f5f7f9;
  border-radius: 6px;
  margin-top: 16px;
}
.module-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-bottom: 16px;
}

.left-title {
  padding-left: 8px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.left-tool {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
// .project-need-table-module {
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-box-pack: justify;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   padding-bottom: 16px;
// }
.ivu-dropdown {
  display: inline-block;
}
.ivu-dropdown-rel {
  position: relative;
}
.yes-pagination-com {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-top: 20px;
}
</style>
