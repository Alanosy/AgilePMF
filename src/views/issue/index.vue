<template>
  <div class="app-container">
    <!-- form -->
    <el-form :inline="true" :model="IssueForm" class="demo-form-inline">
      <el-form-item label="项目">
        <ProjectSelect v-model="IssueForm.itemId"></ProjectSelect>
      </el-form-item>
      <el-form-item label="问题类型">
        <el-select v-model="IssueForm.type" clearable placeholder="请选择">
          <el-option
            v-for="item in IssueType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchIssue">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="issueVisible = true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- table -->
    <el-tabs v-model="tabData" @tab-click="handleClick">
      <el-tab-pane label="全部问题" name="0"></el-tab-pane>
      <el-tab-pane label="指派给我的" name="1"></el-tab-pane>
      <el-tab-pane label="我提交的" name="2"></el-tab-pane>
    </el-tabs>
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
      <!-- <el-table-column label="序号" align="center" width="80px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column prop="type" label="问题类型" align="center">
        <template #default="{ row }">
          <el-tag :key="row.type" :type="getRowType(row.type)" effect="dark">
            {{ getIssueType(row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="issueName" label="问题标题" align="center" />
      <el-table-column prop="priority" label="优先级" align="center">
        <template #default="{ row }">
          <span :style="{ color: getPriorityColor(row.priority) }">{{
            getRowPriority(row.priority)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template v-slot="{ row }">
          <el-select v-model="row.state" placeholder="请选择" @change="updateStatus(row)">
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
      <el-table-column prop="principalName" label="负责人" align="center" />
      <el-table-column prop="createtime" label="创建时间" align="center">
        <template v-slot="{ row }">
          {{ formatDate(row.createtime) }}
        </template>
      </el-table-column>
      <el-table-column prop="itemName" label="关联项目" align="center" />
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
    <issue-dialog
      v-model="issueVisible"
      title="添加问题"
       :refreshData="getIssueFun"
    >
    </issue-dialog>
    <IssueDetails v-model="isssueDialogVisible":selectedRow="this.selectedRow"></IssueDetails>
    
  </div>
</template>

<script>
import UserSelect from "@/components/UserSelect";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import IssueDialog from "@/components/IssueDialog/IssueDialog.vue";
import { getIssue, updateStatusAPI ,delIssue} from "@/api/issue";
import ProjectSelect from "@/components/ItemSelect";
import IssueDetails from "@/components/IssueDetails"
export default {
  components: {
    Editor,
    Toolbar,
    UserSelect,
    IssueDialog,
    IssueDetails,
    ProjectSelect,
  },
  data() {
    return {
      tabData:"0",
      pageNum: 1,
      pageSize: 10,
      data: {},
      issueVisible: false,
      IssueForm: {
        itemId: null,
      },
      IssueType: [
        {
          label: "Bug",
          value: "0",
        },
        {
          label: "优化",
          value: "1",
        },
        {
          label: "故障",
          value: "2",
        },
        {
          label: "工单",
          value: "3",
        },
        {
          label: "变更",
          value: "4",
        },
      ],
      options: [
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
      isssueDialogVisible: false,
      selectedRow: {},
    };
  },

  created() {
    this.getIssueFun();
  },
  methods: {
    delIssueFun(issueId){
      delIssue(issueId).then((res) => {
        if (res.code) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.isssueDialogVisible=false
        } else {
          this.$message.error("删除失败，请重试。");
        }
      });
    },
    updateStatus(row) {
      this.updateStatusInDB(row);
    },
    async updateStatusInDB(row) {
      console.log("abcd", row);
      try {
        const response = await updateStatusAPI({ id: row.id, state: row.state });

        if (response.code) {
          this.$message({
            type: "success",
            message: "状态更新成功!",
          });
        } else {
          this.$message.error("状态更新失败，请重试。");
        }
      } catch (error) {
        console.error("Error updating status:", error);
        this.$message.error("发生错误，请稍后再试。");
      }
    },
    // 分页查询
    async getIssueFun(pageNum, pageSize, itemId = null, issueType = null, type = null) {
      const params = {
        pageNum: pageNum,
        pageSize: pageSize,
        itemId: itemId,
        issueType: issueType,
        type: type,
      };
      const res = await getIssue(params);
      this.data = res.data;
    },
    handleRowClick(row) {
      console.log(1111);
      // 当点击表格行时，设置 dialogVisible 为 true 并将行数据保存到 selectedRow
      this.selectedRow = Object.assign({}, row); // 使用 Object.assign 深拷贝数据
      this.isssueDialogVisible = true;
    },
    // 日期格式化
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // 标签页
    handleClick(tab, event) {
      this.getIssueFun(this.pageNum, this.pageSize, null, null, tab.index);
    },
    // 获取类型颜色
    getRowType(type) {
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
    getIssueType(type) {
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
    getRowPriority(priority) {
      switch (priority) {
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
    // 搜索方法
    searchIssue() {
      this.getIssueFun(
        this.pageNum,
        this.pageSize,
        this.IssueForm.itemId,
        this.IssueForm.type,
        null
      );
    },
    // 每页多少
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getIssueFun(this.pageNum, val, null, null, null);
    },
    // 当前页
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getIssueFun(val, this.pageSize, null, null, null);
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
.radio-cl {
  .el-radio {
    margin-right: 10px;
  }
}
.picker-cl {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 140px;
  }
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
      .bottom-left-part{
        display: flex;
        align-items: center;
      }
    }

  }
}
</style>
