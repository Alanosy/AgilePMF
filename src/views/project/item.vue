<template>
  <div class="main">
    <div class="main-head">
      <div>
        {{ data.name || "N/A" }}
      </div>
      <div>
        <!-- <el-button type="primary">成员管理</el-button> -->
      </div>
    </div>
    <div class="cltop">
      <div>
        <div class="module-header">
          <div class="left-title feature-module-name">项目概览</div>
          <div class="right-tool">
            <span @click="itemDialogVisible = true"
              ><i class="el-icon-edit" style="font-size: 16px"> </i>编辑</span
            >
            &nbsp;
            <span @click="closeItemFun" style="color: red"
              ><i class="el-icon-delete"></i>关闭项目</span
            >
          </div>
        </div>
        <div class="module-content item-2">
          <div class="r1block">
            <div>
              <div>项目名称：{{ OverviewData.itemName }}</div>
              <div>创 建 人: {{ OverviewData.userName }}</div>
              <div>项目状态: {{ OverviewData.state }}</div>
            </div>
          </div>
          <div class="r1block">
            <div>
              <div>需求数:{{ OverviewData.reqNum }}</div>
              <div>已完成:{{ OverviewData.reqfNum }}</div>
              <div>完成进度:{{ OverviewData.reqPercent }}%</div>
            </div>
            <div>
              <el-progress
                v-if="
                  OverviewData.reqPercent !== undefined && OverviewData.reqPercent >= 0
                "
                width="90"
                type="circle"
                :percentage="OverviewData.reqPercent"
              ></el-progress>
            </div>
          </div>
          <div class="r1block">
            <div>
              <div>问题数:{{ OverviewData.issueNum }}</div>
              <div>已完成:{{ OverviewData.issuefNum }}</div>
              <div>完成进度:{{ OverviewData.issuePercent }}%</div>
            </div>
            <div>
              <el-progress
                v-if="
                  OverviewData.issuePercent !== undefined &&
                  OverviewData.issuePercent >= 0
                "
                width="90"
                type="circle"
                :percentage="OverviewData.issuePercent"
              ></el-progress>
            </div>
          </div>
          <div class="r1block">
            <div>
              <div>任务数:{{ OverviewData.taskNum }}</div>
              <div>已完成:{{ OverviewData.taskfNum }}</div>
              <div>完成进度:{{ OverviewData.taskPercent }}%</div>
            </div>
            <div>
              <el-progress
                v-if="
                  OverviewData.taskPercent !== undefined && OverviewData.taskPercent >= 0
                "
                width="90"
                type="circle"
                :percentage="OverviewData.taskPercent"
              ></el-progress>
            </div>
          </div>
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
          <!-- 需求表格 -->
          <el-table
            @row-click="handleReqRowClick"
            v-if="ReqData.records"
            :data="ReqData.records"
            style="width: 100%"
          >
            <el-table-column prop="reqname" label="需求名称" width="180">
            </el-table-column>
            <el-table-column prop="state" label="需求状态">
              <template v-slot="{ row }">
                <el-select
                  v-model="row.state"
                  placeholder="请选择"
                  @change="updateStatus(row)"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="priority" label="优先级">
              <template #default="{ row }">
                <span :style="{ color: getPriorityColor(row.priority) }">{{
                  getPriorityf(row.priority)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="realname" label="负责人"> </el-table-column>
            <el-table-column prop="endtime" label="计划完成">
              <template v-slot="{ row }">
                {{ formatDate(row.endtime) }}
              </template>
            </el-table-column>

            <!-- <el-table-column prop="finishtime" label="实际完成">
              <template v-slot="{ row }">
                <span v-if="row.finishtime"> {{ formatDate(row.finishtime) }}</span>
              </template>
            </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination small layout="prev, pager, next" :total="ReqData.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="cltop" id="projectList">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">项目文档</div>
          <div class="right-opertaion">
            <div v-if="showContent" @click="showDoc">
              <i class="el-icon-edit"></i>
              <span>修改文稿</span>
            </div>
            <div v-if="!showContent" style="disply: flex">
              <el-button plain @click="showDoc">取消</el-button>
              <el-button type="primary" plain @click="updateItemContentFun()"
                >保存</el-button
              >
            </div>
          </div>
        </div>
        <div class="module-content">
          <div v-if="showContent" v-html="ItemContentData.content"></div>
          <Editor
            v-if="!showContent"
            style="height: 200px; overflow-y: hidden"
            v-model="ItemContentData.content"
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
          <!-- 问题表格 -->
          <el-table
            @row-click="handleIssueRowClick"
            :data="IssueData.records"
            style="width: 100%"
          >
            <el-table-column prop="type" label="类型" width="180">
              <template #default="{ row }">
                <el-tag :key="row.type" :type="getTypeType(row.type)" effect="dark">
                  {{ getIssueTypef(row.type) }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="issueName" label="问题标题"> </el-table-column>
            <el-table-column prop="state" label="状态">
              <template v-slot="{ row }">
                <el-select
                  v-model="row.state"
                  placeholder="请选择"
                  @change="updateStatus(row)"
                >
                  <el-option
                    v-for="item in issueOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="principalName" label="指派给"> </el-table-column>
            <el-table-column prop="priority" label="优先级">
              <template #default="{ row }">
                <span :style="{ color: getPriorityColor(row.priority) }">{{
                  getPriorityf(row.priority)
                }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="updateTime" label="最后更新">
              <template v-slot="{ row }">
                {{ formatDate(row.updateTime) }}
              </template>
            </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination small layout="prev, pager, next" :total="IssueData.total">
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
          <!-- 任务表格 -->
          <el-table
            @row-click="handleTaskRowClick"
            :data="TaskData.records"
            style="width: 100%"
          >
            <el-table-column prop="state" label="状态" width="180">
              <template #default="{ row }">
                <span :style="{ color: getTaskColor(row.state) }">{{
                  getTaskf(row.state)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="taskName" label="任务标题"> </el-table-column>
            <el-table-column prop="principalName" label="负责人"> </el-table-column>
            <el-table-column prop="endtime" label="计划完成">
              <template v-slot="{ row }">
                {{ formatDate(row.endtime) }}
              </template>
            </el-table-column>
            <el-table-column prop="finishtime" label="实际完成">
              <template v-slot="{ row }">
                {{ formatDate(row.finishtime) }}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="updatetime" label="最后更新">
              <template v-slot="{ row }">
                {{ formatDate(row.updatetime) }}
              </template>
            </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination small layout="prev, pager, next" :total="TaskData.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="cltop content-layer" id="ATTACHMENT_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">附件</div>
          <div class="right-opertaion">
            <el-button v-if="!showFile" @click="fileDialogVisible = true" type="primary"
              >上传文件</el-button
            >
          </div>
        </div>
        <div class="module-content">
          <div
            v-if="showFile"
            class="empty-content-btn-box"
            @click="fileDialogVisible = true"
          >
            <div class="line-dashed top"></div>
            <div class="line-dashed left"></div>
            <div class="line-dashed right"></div>
            <div class="line-dashed bottom"></div>
            <div class="add-button">
              <div class="add-text">上传文件附件</div>
            </div>
          </div>
          <div v-if="!showFile" style="display: flex; flex-wrap: wrap">
            <FilePart v-for="(item, index) in [[], []]"></FilePart>
          </div>
        </div>
      </div>
    </div> -->
    <div class="cltop content-layer" id="remark">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">备注</div>
          <div class="right-opertaion"></div>
        </div>
        <div class="module-content">
          <div class="module-content-content">
            <div v-for="(item, index) in this.RemarkData" :key="index">
              <RemarkPart :data="item"></RemarkPart>
            </div>
          </div>
          <div class="module-content-foot">
            <div class="foot-left-top"></div>
            <div class="foot-left-tool">
              <div v-if="remark" @click="showRemark" class="show-editor-button" style="">
                <i class="el-icon-edit" style="font-size: 16px"> </i>添加备注
              </div>
              <div v-if="!remark" style="disply: flex">
                <el-button plain @click="showRemark">取消</el-button>
                <el-button type="primary" plain @click="saveRemarkFun">保存</el-button>
              </div>
            </div>

            <Editor
              v-if="!remark"
              style="height: 200px; width: 100%; overflow-y: hidden"
              v-model="remarkForm.content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 需求对话框 -->
    <req-dialog v-model="requirementVisible" title="添加需求" :refreshData="getReqFun">
    </req-dialog>
    <!-- 添加问题 -->
    <issue-dialog v-model="issueVisible" title="添加问题" :refreshData="getIssueFun">
    </issue-dialog>

    <!-- 添加任务 -->
    <task-dialog v-model="taskVisible" title="添加任务" :refreshData="getTaskFun">
    </task-dialog>

    <el-dialog
      title="提示"
      :visible.sync="fileDialogVisible"
      width="23%"
      :before-close="handleClose"
    >
      <div style="display: flex; align-items: center; justify-content: center">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="1"
          :auto-upload="false"
          :on-remove="handleRemove"
          :on-change="handleFileChange"
          :file-list="fileListForm.fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fileDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadFileFun()">确 定</el-button>
      </span>
    </el-dialog>
    <ReqDetails v-model="reqDialogVisible" :selectedRow="this.selectedRow"></ReqDetails>
    <TaskDetails
      v-model="taskDialogVisible"
      :selectedRow="this.selectedRow"
    ></TaskDetails>
    <IssueDetails
      v-model="issueDialogVisible"
      :selectedRow="this.selectedRow"
    ></IssueDetails>
    <ItemDialog
      v-model="itemDialogVisible"
      :updateItemData="this.data"
      type="update"
    ></ItemDialog>
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
import { getIssue } from "@/api/issue";
import { getReq } from "@/api/requirement";
import { getTask } from "@/api/task";
import RemarkPart from "@/components/RemarkPart";
import FilePart from "@/components/FilePart";
import ReqDetails from "@/components/ReqDetails";
import IssueDetails from "@/components/IssueDetails";
import TaskDetails from "@/components/TaskDetails";
import ItemDialog from "@/components/ItemDialog";
import {
  getOverviewItem,
  getItemContent,
  updateItemContent,
  saveRemark,
  getRemark,
  closeItem,
  uploadFile,
  getFileList,
} from "@/api/project";
export default {
  components: {
    ReqDetails,
    UserSelect,
    Editor,
    IssueDetails,
    Toolbar,
    ItemDialog,
    TaskDetails,
    ReqDialog,
    TaskDialog,
    IssueDialog,
    RemarkPart,
    FilePart,
  },
  data() {
    return {
      selectedRow: {},
      itemDialogVisible: false,
      fileListForm: {
        fileList: null,
      },
      fileList: null,
      showFile: true,
      fileDialogVisible: false,
      ItemContentData: {
        content: "",
      },
      OverviewData: {},
      RemarkData: {},
      remark: true,
      contentFont: "修改文稿",
      showContent: true,
      ReqData: {},
      TaskData: {},
      IssueData: {},
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      remarkForm: {
        content: "",
      },
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
      FileListData: null,
      issueOptions: [
        {
          label: "待解决",
          value: "0",
        },
        {
          label: "处理中",
          value: "1",
        },
        {
          label: "重开",
          value: "2",
        },
        {
          label: "已解决",
          value: "3",
        },
        {
          label: "挂起",
          value: "4",
        },
        {
          label: "误报",
          value: "5",
        },
        {
          label: "已关闭",
          value: "6",
        },
      ],
      options: [
        {
          label: "需求中",
          value: "0",
        },
        {
          label: "设计中",
          value: "1",
        },
        {
          label: "研发中",
          value: "2",
        },
        {
          label: "待测试",
          value: "3",
        },
        {
          label: "待发布",
          value: "4",
        },
        {
          label: "已上线",
          value: "5",
        },
        {
          label: "已完成",
          value: "6",
        },
        {
          label: "挂起",
          value: "7",
        },
      ],
      reqDialogVisible: false,
      issueDialogVisible: false,
      taskDialogVisible: false,
      selectedRow: {},
    };
  },
  computed: {
    itemId() {
      return this.$route.query.data.id;
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
  created() {
    this.getTaskFun();
    this.getReqFun();
    this.getIssueFun();
    this.getOverviewItemFun();
    this.getItemContentFun();
    this.getRemarkFun();
    this.getFileListFun();
  },
  methods: {
    closeItemFun() {
      this.$confirm("你是否确定关闭该项目，关闭后无法找回。", "关闭项目", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      })
        .then(() => {
          const data = { itemId: this.itemId };
          closeItem(data).then((res) => {
            this.$router.push({ name: "project", query: { data: this.data } });
            this.$message({
              message: "关闭成功",
              type: "success",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancelled",
          });
        });
    },
    updateItemFun() {
      this.$router.push({ name: "itemsave", query: { data: this.data } });
    },
    handleReqRowClick(row) {
      // 当点击表格行时，设置 dialogVisible 为 true 并将行数据保存到 selectedRow
      this.selectedRow = Object.assign({}, row); // 使用 Object.assign 深拷贝数据
      this.reqDialogVisible = true;
    },
    handleIssueRowClick(row) {
      // 当点击表格行时，设置 dialogVisible 为 true 并将行数据保存到 selectedRow
      this.selectedRow = Object.assign({}, row); // 使用 Object.assign 深拷贝数据
      this.issueDialogVisible = true;
    },
    handleTaskRowClick(row) {
      // 当点击表格行时，设置 dialogVisible 为 true 并将行数据保存到 selectedRow
      this.selectedRow = Object.assign({}, row); // 使用 Object.assign 深拷贝数据
      this.taskDialogVisible = true;
    },
    uploadFileFun() {
      if (this.fileList.length > 0) {
        const formData = new FormData(); // 创建FormData对象
        formData.append("file", this.fileList[0].raw); // 添加文件到formData
        const data = {
          file: formData,
          itemId: this.itemId,
        };
        uploadFile(data)
          .then((res) => {
            if (res.code) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.getFileListFun();
            }
          })
          .catch((error) => {
            console.error("文件上传失败：", error);
            this.$message.error("文件上传失败！");
          });
      } else {
        this.$message.warning("请选择文件后再上传！");
      }
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList; // 收集文件信息
    },
    // 移除文件处理方法
    handleRemove(file, fileList) {
      if (fileList.length == 0) {
        this.showFile = false;
      }
    },
    // 获取需求
    async getRemarkFun(itemid = this.itemId) {
      const params = { itemId: itemid };

      const res = await getRemark(params);
      this.RemarkData = res.data;
    },
    async getFileListFun(itemid = this.itemId) {
      const params = { itemId: itemid };

      const res = await getFileList(params);
      this.FileListData = res.data;
      if (this.FileListData.length > 0) {
        this.hasFiles = true;
      }
    },
    saveRemarkFun() {
      const data = {
        content: this.remarkForm.content,
        itemId: this.itemId,
      };
      saveRemark(data).then((res) => {
        if (res.code) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.getRemarkFun();
          this.remark = !this.remark;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    updateItemContentFun() {
      const data = {
        content: this.ItemContentData.content,
        itemId: this.itemId,
      };
      updateItemContent(data).then((res) => {
        if (res.code) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.showContent = !this.showContent;
        } else {
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
      });
    },
    // 获取需求
    async getOverviewItemFun(itemid = this.itemId) {
      const params = { itemId: itemid };
      const res = await getOverviewItem(params);
      this.OverviewData = res.data;
    },
    async getItemContentFun(itemid = this.itemId) {
      const params = { itemId: itemid };
      const res = await getItemContent(params);
      if (res.data.content != null) {
        this.ItemContentData = res.data;
      }
    },
    showRemark() {
      this.remark = !this.remark;
    },
    showDoc() {
      this.showContent = !this.showContent;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // 获取优先级颜色
    getTaskColor(priority) {
      switch (priority) {
        case "0":
          return "blue";
        case "1":
          return "orange";
        case "2":
          return "green";
        default:
          return "black";
      }
    },
    // 获取优先级字典
    getTaskf(priority) {
      switch (priority) {
        case "0": // Emergency
          return "待办";
        case "1": // High
          return "已开始";
        case "2": // Medium
          return "已完成";
        default:
          return "";
      }
    },
    getTypeType(type) {
      switch (type) {
        case "0": // Emergency
          return "danger";
        case "1": // High
          return "warning";
        case "2": // Medium
          return "info";
        case "3": // Low
          return "success";
        default:
          return "black"; // 默认颜色
      }
    },
    // 获取类型字典
    getIssueTypef(type) {
      switch (type) {
        case "0": // Emergency
          return "Bug";
        case "1": // Emergency
          return "优化";
        case "2": // High
          return "故障";
        case "3": // Medium
          return "工单";
        case "4": // Low
          return "变更";
        default:
          return "";
      }
    },
    // 获取优先级颜色
    getPriorityColor(priority) {
      switch (typeof priority === "number" ? priority.toString() : priority) {
        case "0":
          return "red";
        case "1":
          return "orange";
        case "2":
          return "green";
        default:
          return "black"; // 默认颜色
      }
    },
    // 获取优先级字典
    getPriorityf(priority) {
      switch (typeof priority === "number" ? priority.toString() : priority) {
        case "0": // Emergency
          return "P0紧急";
        case "1": // High
          return "P1高";
        case "2": // Medium
          return "P2中";
        case "3": // Low
          return "P3低";
        default:
          return "";
      }
    },

    // 获取任务
    async getTaskFun(pageNum, pageSize, itemId = this.itemId, type = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, itemId: itemId, type: type };
      const res = await getTask(params);
      this.TaskData = res.data;
    },
    // 获取需求
    async getReqFun(pageNum, pageSize, type = null, itemid = this.itemId) {
      const params = { pageNum: pageNum, pageSize: pageSize, type: type, itemId: itemid };
      const res = await getReq(params);
      this.ReqData = res.data;
    },

    // 获取问题
    async getIssueFun(
      pageNum,
      pageSize,
      itemId = this.itemId,
      issueType = null,
      type = null
    ) {
      const params = {
        pageNum: pageNum,
        pageSize: pageSize,
        itemId: itemId,
        issueType: issueType,
        type: type,
      };
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
#remark {
  margin-bottom: 20px;
}
.el-radio {
  margin-right: 6px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 145px;
}
.module-content-content {
  min-height: 100px;
}
.show-editor-button {
  padding: 12px 10px;
  background: #f5f7f9;
  border-radius: 5px;
  font-size: 14px;
  color: #666;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  width: 100px;
}
.foot-left-tool {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.foot-left-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, #ccc, #ccc 3px, transparent 0, transparent);
  background-size: 6px 100%;
}

.r1block {
  justify-content: space-between;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 23%;
  height: 120px;
  line-height: 25px;
  padding-left: 30px;
  padding-right: 30px;
}
.item-2 {
  display: flex;
  // min-height: 150px;
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
  padding: 24px 24px;
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
#projectList {
  min-height: 300px;
}
.empty-content-btn-box {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100px;
  cursor: pointer;
  .line-dashed {
    position: absolute;
  }
  .top {
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #ccc, #ccc 3px, transparent 0, transparent);
    background-size: 6px 100%;
  }
  .left {
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, #ccc, #ccc 3px, transparent 0, transparent);
    background-size: 100% 6px;
  }
  .right {
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, #ccc, #ccc 3px, transparent 0, transparent);
    background-size: 100% 6px;
  }
  .bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #ccc, #ccc 3px, transparent 0, transparent);
    background-size: 6px 100%;
  }
  .add-button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #3351ff;
  }
}
</style>
