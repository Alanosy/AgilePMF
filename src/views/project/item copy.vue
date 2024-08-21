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
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="ID" width="180"> </el-table-column>
            <el-table-column prop="name" label="需求名称" width="180"> </el-table-column>
            <el-table-column prop="address" label="需求状态"> </el-table-column>
            <el-table-column prop="address" label="优先级"> </el-table-column>
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
          <!-- <template  >
        <div style="border: 1px solid #ccc; width: 1035px;">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height:300px; overflow-y: hidden"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div>
      </template> -->
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
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="ID" width="180"> </el-table-column>
            <el-table-column prop="name" label="类型" width="180"> </el-table-column>
            <el-table-column prop="address" label="问题标题"> </el-table-column>
            <el-table-column prop="address" label="状态"> </el-table-column>
            <el-table-column prop="address" label="指派给"> </el-table-column>
            <el-table-column prop="address" label="优先级"> </el-table-column>
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
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="ID" width="180"> </el-table-column>
            <el-table-column prop="name" label="状态" width="180"> </el-table-column>
            <el-table-column prop="address" label="任务标题"> </el-table-column>
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
        <div class="module-content" >
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
    <req-dialog
      v-model="requirementVisible"
      title="自定义标题"
      @confirm="handleConfirm"
      @close="handleClose"
    >
    
    </req-dialog>
    <!-- 需求对话框 -->
    <!-- <el-dialog
      title="添加需求"
      :visible.sync="requirementVisible"
      width="1200px"
      :before-close="handleClose"
    >
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
                <el-radio-group v-model="reqform.priority">
                  <el-radio :label="1">P3低</el-radio>
                  <el-radio :label="2">P2中</el-radio>
                  <el-radio :label="3">P1高</el-radio>
                  <el-radio :label="4">P0紧急</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="计划时间">
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
              <el-select
                v-model="reqform.region"
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
              <el-select
                v-model="reqform.region"
                placeholder="需求方"
                style="width: 300px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
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
        <el-button @click="requirementVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveReqFun">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 添加问题 -->
    <issue-dialog
      v-model="issueVisible"
      title="自定义标题"
      @confirm="handleConfirm"
      @close="handleClose"
    >
    
    </issue-dialog>
    <!-- <el-dialog
      title="添加问题"
      :visible.sync="issueVisible"
      width="1200px"
      :before-close="handleClose"
    >
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
                <el-radio-group v-model="issueform.priority">
                  <el-radio :label="1">P3低</el-radio>
                  <el-radio :label="2">P2中</el-radio>
                  <el-radio :label="3">P1高</el-radio>
                  <el-radio :label="4">P0紧急</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="计划时间">
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
        <el-button @click="issueVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveIssueFun">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 添加任务 -->
        <task-dialog
      v-model="taskVisible"
      title="自定义标题"
      @confirm="handleConfirm"
      @close="handleClose"
    >
    
    </task-dialog>
    <!-- <el-dialog
      title="添加任务"
      :visible.sync="taskVisible"
      width="1200px"
      :before-close="handleClose"
    >
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
        <el-button @click="taskVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTaskFun">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import UserSelect from "@/components/UserSelect";
import { saveReq } from "@/api/requirement";
import { saveIssue } from "@/api/issue";
import { saveTask } from "@/api/task";
import ReqDialog from '@/components/ReqDialog/ReqDialog.vue';
import TaskDialog from '@/components/TaskDialog/TaskDialog.vue';
import IssueDialog from '@/components/IssueDialog/IssueDialog.vue';
export default {
  components: {
    UserSelect,
    Editor,
    Toolbar,
    ReqDialog,
    TaskDialog,
    IssueDialog
  },
  data() {
    return {
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
    data() {
      return this.$route.params.data;
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
  methods: {
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
.item-2{
  display:flex;
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
