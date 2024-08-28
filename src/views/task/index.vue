<template>
  <div class="app-container">
    <!-- 查询栏 -->
    <el-form :inline="true" :model="taskForm" class="demo-form-inline">
      <el-form-item label="项目名称">
        <ProjectSelect v-model="taskForm.itemId"></ProjectSelect>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchTask">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="taskVisible = true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 标签页 -->
    <el-tabs v-model="tabData" @tab-click="handleClick">
      <el-tab-pane label="全部需求" name="0"></el-tab-pane>
      <el-tab-pane label="我负责的" name="1"></el-tab-pane>
      <el-tab-pane label="我提交的" name="2"></el-tab-pane>
      <el-tab-pane label="我延期的" name="3"></el-tab-pane>
    </el-tabs>
    <!-- 表格 -->

    <el-table
      :data="data.records"
      @row-click="handleRowClick"
      :header-cell-style="{
        background: '#f2f3f4',
        color: '#555',
        'font-weight': 'bold',
        'line-height': '32px',
      }"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column prop="state" label="状态" align="center">
        <template #default="{ row }">
          <span :style="{ color: getStateColor(row.state) }">{{
            getRowState(row.state)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="taskName" label="任务标题" align="center" />
      <el-table-column prop="principalName" label="负责人" align="center" />
      <el-table-column prop="endtime" label="计划完成" align="center">
        <template v-slot="{ row }">
          {{ formatDate(row.endtime) }}
        </template>
      </el-table-column>
      <el-table-column prop="finishtime" label="实际完成" align="center">
        <template v-slot="{ row }">
          {{ formatDate(row.finishtime) }}
        </template>
      </el-table-column>

      <el-table-column prop="updatetime" label="最后更新时间" align="center">
        <template v-slot="{ row }">
          {{ formatDate(row.updatetime) }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        :current-page="data.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--新增弹窗-->
    <task-dialog
      v-model="taskVisible"
      title="添加任务"
      :refreshData="getTaskFun"
  
    >
    </task-dialog>
    <TaskDetails  v-model="taskDialogVisible" :selectedRow="this.selectedRow"></TaskDetails>
  
  </div>
</template>

<script>
import UserSelect from "@/components/UserSelect";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import TaskDialog from "@/components/TaskDialog/TaskDialog.vue";
import { getTask } from "@/api/task";
import ProjectSelect from "@/components/ItemSelect";
import TaskDetails from "@/components/TaskDetails";
export default {
  components: {
    Editor,
    Toolbar,
    UserSelect,
    TaskDialog,
    TaskDetails,
    ProjectSelect,
  },
  data() {
    return {
      options:[],
      tabData:"0",
      pageNum: 1,
      pageSize: 10,
      data: {},
      taskForm: {
        itemId:null,
      },
      taskVisible: false,
      selectedRow: {},
      taskDialogVisible: false,
    };
  },

  created() {
    this.getTaskFun();
  },
  methods: {
    // 标签触发函数
    handleClick(tab, event) {
      this.getTaskFun(this.pageNum, this.pageSize, null, tab.index);
    },
    // 表格触发函数
    handleRowClick(row) {
      console.log(1111);
      this.selectedRow = Object.assign({}, row); // 使用 Object.assign 深拷贝数据
      this.taskDialogVisible = true;
    },
    // 日期格式化
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    // 分页查询
    async getTaskFun(pageNum, pageSize, itemId = null, type = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, itemId: itemId, type: type };
      const res = await getTask(params);
      this.data = res.data;
    },
    // 获取优先级颜色
    getStateColor(priority) {
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
    getRowState(priority) {
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
    // 搜索触发函数
    searchTask() {
      this.getTaskFun(this.pageNum, this.pageSize, this.taskForm.itemId, null);
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getTaskFun(this.pageNum, val, null, null);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getTaskFun(val, this.pageSize, null, null);
    },
  },
};
</script>

<style>
.el-table--border,
.el-table--group {
  border: 1px solid #b3b3b3;
}

.bj {
  margin-top: 40px;
  margin-left: 30px;
}
.reqRowDialog {
  display: flex;
  .reqRowDialog-r {
    width: 50%;
  }
  .reqRowDialog-l {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #d2d2d2;
    padding-right: 16px;
    margin-right: 16px;

    .title-row {
      margin: 0;
      justify-content: flex-start;
      font-size: 14px;
    }
    .main-content {
      height: 500px !important;
      overflow-y: hidden !important;
    }
    .bottom-part {
      width: 100%;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      .bottom-left-part {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
