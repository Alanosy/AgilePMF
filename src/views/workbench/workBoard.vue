<template>

 <div class="main">
    <div class="main-head">
      <div>
        工作台
      </div>
      <div>
      </div>
    </div>
    <div class="cltop">
      <div class="project-need-table-module">
        <div class="module-header">
          <div class="left-tool">我负责的需求</div>
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
          <el-table @row-click="handleReqRowClick" :data="ReqData.records" style="width: 100%">
            <el-table-column prop="reqname" label="需求名称" width="180"> </el-table-column>
            <el-table-column prop="state" label="需求状态"> 
              <template v-slot="{ row }">
              <el-select v-model="row.state" placeholder="请选择" @change="updateStatus(row)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="priority" label="优先级"> 
            <template #default="{ row }">
           <span :style="{ color: getPriorityColor(row.priority) }">{{ getPriorityf(row.priority) }}</span>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column prop="realname" label="负责人"> </el-table-column>
            <el-table-column prop="endtime" label="计划完成">
            <template v-slot="{ row }">
            {{ formatDate(row.endtime) }}
          </template>
          </el-table-column>
       </el-table-column>
            <!-- <el-table-column prop="finishtime" label="实际完成"> 
                <template v-slot="{ row }">
                  <span v-if="row.finishtime"> {{ formatDate(row.finishtime) }}</span>
          </template>
            </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="ReqData.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
   <div class="cltop">
      <div class="project-need-table-module">
        <div class="module-header">
          <div class="left-tool">我创建的需求</div>
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
          <el-table @row-click="handleReqRowClick" :data="ReqMeData.records" style="width: 100%">
            <el-table-column prop="reqname" label="需求名称" width="180"> </el-table-column>
            <el-table-column prop="state" label="需求状态"> 
              <template v-slot="{ row }">
              <el-select v-model="row.state" placeholder="请选择" @change="updateStatus(row)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="priority" label="优先级"> 
            <template #default="{ row }">
           <span :style="{ color: getPriorityColor(row.priority) }">{{ getPriorityf(row.priority) }}</span>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column prop="realname" label="负责人"> </el-table-column>
            <el-table-column prop="endtime" label="计划完成">
            <template v-slot="{ row }">
            {{ formatDate(row.endtime) }}
          </template>
          </el-table-column>
       </el-table-column>
            <!-- <el-table-column prop="finishtime" label="实际完成"> 
                <template v-slot="{ row }">
                  <span v-if="row.finishtime"> {{ formatDate(row.finishtime) }}</span>
          </template>
            </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="ReqMeData.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="cltop content-layer" id="PROBLEM_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">我负责的问题</div>
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
          <el-table @row-click="handleIssueRowClick" :data="IssueData.records" style="width: 100%">
            <el-table-column prop="type" label="类型" width="180">
            <template #default="{ row }">
                  <el-tag
                    :key="row.type"
                    :type="getTypeType(row.type)"
                    effect="dark">
                    {{ getIssueTypef(row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
            
            </el-table-column>
            <el-table-column prop="issueName" label="问题标题"> </el-table-column>
            <el-table-column prop="state" label="状态"> 
           
              <template v-slot="{ row }">
                <el-select v-model="row.state" placeholder="请选择" @change="updateStatus(row)">
                  <el-option
                    v-for="item in issueOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="principalName" label="指派给"> </el-table-column>
            <el-table-column prop="priority" label="优先级"> 
             <template #default="{ row }">
           <span :style="{ color: getPriorityColor(row.priority) }">{{ getPriorityf(row.priority) }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="updateTime" label="最后更新">
            
              <template v-slot="{ row }">
                <span v-if="row.updateTime"> {{ formatDate(row.updateTime) }}</span>
          </template>
             </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="IssueData.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
        <div class="cltop content-layer" id="PROBLEM_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">我创建的问题</div>
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
          <el-table @row-click="handleIssueRowClick"  :data="IssueMeData.records" style="width: 100%">
            <el-table-column prop="type" label="类型" width="180">
            <template #default="{ row }">
                  <el-tag
                    :key="row.type"
                    :type="getTypeType(row.type)"
                    effect="dark">
                    {{ getIssueTypef(row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
            
            </el-table-column>
            <el-table-column prop="issueName" label="问题标题"> </el-table-column>
            <el-table-column prop="state" label="状态"> 
           
              <template v-slot="{ row }">
                <el-select v-model="row.state" placeholder="请选择" @change="updateStatus(row)">
                  <el-option
                    v-for="item in issueOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="principalName" label="指派给"> </el-table-column>
            <el-table-column prop="priority" label="优先级"> 
             <template #default="{ row }">
           <span :style="{ color: getPriorityColor(row.priority) }">{{ getPriorityf(row.priority) }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="updateTime" label="最后更新">
            
              <template v-slot="{ row }">
                <span v-if="row.updateTime">  {{ formatDate(row.updateTime) }}</span>
          </template>
             </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="IssueMeData.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="cltop content-layer" id="TASK_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">我负责的任务</div>
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
          <el-table @row-click="handleTaskRowClick"  :data="TaskData.records" style="width: 100%">
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
                <span v-if="row.finishtime"> {{ formatDate(row.finishtime) }}</span>
          </template>
            </el-table-column>
            <!-- <el-table-column prop="updatetime" label="最后更新">
               <template v-slot="{ row }">
                <span v-if="row.updateTime">  {{ formatDate(row.updatetime) }}</span>
          </template>
             </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="TaskData.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
        <div class="cltop content-layer" id="TASK_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">我创建的任务</div>
          <div class="right-opertaion">
            <div class="ivu-dropdown">
              <div class="ivu-dropdown-rel">
                <el-button type="primary" @click="taskVisible = true">添加任务</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="module-content">
         <!-- 任务表格  -->
          <el-table  @row-click="handleTaskRowClick" :data="TaskMeData.records" style="width: 100%">
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
                <span v-if="row.finishtime">  {{ formatDate(row.finishtime) }}</span>
          </template>
            </el-table-column>
            <!-- <el-table-column prop="updatetime" label="最后更新">
               <template v-slot="{ row }">
                <span v-if="row.updateTime"> {{ formatDate(row.updatetime) }}</span>
          </template>
             </el-table-column> -->
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="TaskMeData.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  
    <div class="cltop content-layer" id="TASK_TABLE">
      <div class="project-problem-table-module">
        <div class="module-header">
          <div class="left-tool">项目</div>
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

          <el-table :data="ItemData.records" style="width: 100%">
           <el-table-column prop="name" label="项目名称" align="center" />
            <el-table-column prop="state" label="状态" width="180"> 
                 <template #default="{ row }">
              <span :style="{ color: getItemColor(row.state) }">{{
                getItemf(row.state)
              }}</span>
            </template>
            </el-table-column>
              <el-table-column prop="reqcount" label="需求" align="center" />
      <el-table-column prop="issuecount" label="问题" align="center" />
      <el-table-column prop="taskcount" label="任务" align="center" />
      <el-table-column prop="username" label="负责人" align="center" />
          </el-table>
          <div class="yes-pagination-com" style="justify-content: flex-end">
            <el-pagination
              small
              background="false"
              layout="prev, pager, next"
              :total="ItemData.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
      <!-- 需求对话框 -->
      <req-dialog v-model="requirementVisible" title="添加需求" :refreshData="getReqFun"> </req-dialog>
    <!-- 添加问题 -->
    <issue-dialog v-model="issueVisible" title="添加问题" :refreshData="getIssueFun"> </issue-dialog>

    <!-- 添加任务 -->
    <task-dialog v-model="taskVisible" title="添加任务" :refreshData="getTaskFun"> </task-dialog>

    <ReqDetails v-model="reqDialogVisible" :selectedRow="this.selectedRow" :refreshData="getReqFun"></ReqDetails>
    <TaskDetails  v-model="taskDialogVisible" :selectedRow="this.selectedRow" :refreshData="getTaskFun"></TaskDetails>
     <IssueDetails v-model="issueDialogVisible":selectedRow="this.selectedRow" :refreshData="getIssueFun"></IssueDetails>
    
  
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
import {getItemPage} from "@/api/project"
import ReqDetails from "@/components/ReqDetails"
import IssueDetails from "@/components/IssueDetails"
import TaskDetails from "@/components/TaskDetails";
export default {
  name:"workBoard",
  components: {
    UserSelect,
    Editor,
    Toolbar,
    ReqDialog,
    TaskDialog,
    IssueDialog,
    ReqDetails,
    IssueDetails,
    TaskDetails,
  },
  data() {
    return {
      contentFont:"修改文稿",
      showContent:true,
      ReqData:{},
      ReqMeData:{},
      TaskData:{},
      TaskMeData:{},
      IssueData:{},
      IssueMeData:{},
      ItemData:{},
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
      issueOptions: [{
          label: '待解决',
          value: '0'
        }, {
          label: '处理中',
          value: '1'
        }, {
          label: '重开',
          value: '2'
        }, {
          label: '已解决',
          value: '3'
        }, {
          label: '挂起',
          value: '4'
        }, {
          label: '误报',
          value: '5'
        }, {
          label: '已关闭',
          value: '6'
        }],
      options: [{
          label: '需求中',
          value: '0'
        }, {
          label: '设计中',
          value: '1'
        }, {
          label: '研发中',
          value: '2'
        }, {
          label: '待测试',
          value: '3'
        }, {
          label: '待发布',
          value: '4'
        }, {
          label: '已上线',
          value: '5'
        }, {
          label: '已完成',
          value: '6'
        }, {
          label: '挂起',
          value: '7'
        }],
          reqDialogVisible:false,
      issueDialogVisible:false,
      taskDialogVisible:false,
      selectedRow:{},
    };
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
    editor.destroy();
  },
  created(){
    this.getTaskFun();
    this.getReqFun();
    this.getIssueFun();
    this.getItemPageFun();
  },
  methods: {
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
     getItemColor(priority) {
      switch (priority) {
        case "1":
          return "red";
        case "2":
          return "orange";
        case "3":
          return "green";
        default:
          return "black"; // 默认颜色
      }
    },
    // 获取优先级字典
    getItemf(priority) {
      switch (priority) {
        case "0": // Emergency
          return "进行中";
        case "1": // High
          return "已完成";
        case "2": // Medium
          return "挂起";
        default:
          return "";
      }
    },
        // 分页查询
    async getItemPageFun(pageNum, pageSize, itemName = null,type=null) {
      const params = { "pageNum": pageNum, "pageSize": pageSize, "itemName": itemName ,"type":type};
      const res = await getItemPage(params);
      this.ItemData = res.data;
    },
        // 获取需求
    async getReqFun(pageNum, pageSize, type = null,itemid=null) {
      const params = { pageNum: pageNum, pageSize: pageSize, type: 1 ,itemId:itemid};
      const res = await getReq(params);
      this.ReqData = res.data;
      const params2 = { pageNum: pageNum, pageSize: pageSize, type: 2 ,itemId:itemid};
      const res2 = await getReq(params2);
      this.ReqMeData = res2.data;
    },
        // 获取问题
    async getIssueFun(pageNum, pageSize,itemId=null,issueType=null,type=null) {
      const params = { pageNum: pageNum, pageSize: pageSize,itemId:itemId,issueType:issueType,type:1};
      const res = await getIssue(params);
      this.IssueData = res.data;
      const params2 = { pageNum: pageNum, pageSize: pageSize,itemId:itemId,issueType:issueType,type:2};
      const res2 = await getIssue(params2);
      this.IssueMeData = res2.data;
    },
      // 获取任务
    async getTaskFun(pageNum, pageSize, itemId =null,type = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, itemId: itemId, type: 1  };
      const res = await getTask(params);
      this.TaskData = res.data;
      const params2 = { pageNum: pageNum, pageSize: pageSize, itemId: itemId, type: 2  };
      const res2 = await getTask(params2);
      this.TaskMeData = res2.data;
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
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
    getTypeType(type){
      switch (type) {
        case "0": // Emergency
          return 'danger';
        case "1": // High
          return 'warning';
        case "2": // Medium
          return 'info';
        case "3": // Low
          return 'success';
        default:
          return 'black'; // 默认颜色
      }
    },
    // 获取类型字典
    getIssueTypef(type){
      switch (type) {
        case "0": // Emergency
          return 'Bug';
        case "1": // Emergency
          return '优化';
        case "2": // High
          return '故障';
        case "3": // Medium
          return '工单';
        case "4": // Low
          return '变更';
        default:
          return '';
      }
    },
    // 获取优先级颜色
    getPriorityColor(priority) {
      switch (typeof priority === 'number' ? priority.toString() : priority) {
        case '0':
          return 'red';
        case "1":
          return 'orange';
        case "2":
          return 'green';
        default:
          return 'black'; // 默认颜色
      }
    },
    // 获取优先级字典
    getPriorityf(priority) {
      switch (typeof priority === 'number' ? priority.toString() : priority) {
        case "0": // Emergency
          return 'P0紧急';
        case "1": // High
          return 'P1高';
        case "2": // Medium
          return 'P2中';
        case "3": // Low
          return 'P3低';
        default:
          return '';
      }
    },
 
  
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

  },
};
</script>
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
  align-items: center;
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
