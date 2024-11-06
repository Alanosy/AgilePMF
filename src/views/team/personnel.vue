<template>

  <div class="app-container">
    <!-- form -->
    <el-form :inline="true" :model="perForm" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="perForm.realName" placeholder="输入用户名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchPer">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button :title="diaTitle" type="primary" @click="issueVisible = true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- table -->
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部问题" name="first"></el-tab-pane>
      <el-tab-pane label="指派给我的" name="second"></el-tab-pane>
      <el-tab-pane label="我提交的" name="third"></el-tab-pane>
    </el-tabs> -->
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

      <el-table-column prop="role" label="成员角色" align="center" >
        <template #default="{ row }">
          <span :style="{ color: getRoleColor(row.role) }">{{
            getRole(row.role)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="realname" label="成员姓名" align="center" />
      <el-table-column prop="createtime" label="加入时间" align="center">
        <template v-slot="{ row }">
          {{ formatDate(row.createtime) }}
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

  </div>
</template>
<script>
import UserSelect from "@/components/UserSelect";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import IssueDialog from "@/components/IssueDialog/IssueDialog.vue";
import { getIssue, updateStatusAPI } from "@/api/issue";
import ProjectSelect from "@/components/ItemSelect";
import { getTeamUser } from "@/api/team";
export default {
  components: {
    Editor,
    Toolbar,
    UserSelect,
    IssueDialog,
    ProjectSelect,
  },
  data() {
    return {
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
      perForm:{

        realName:""
      },
    };
  },

  created() {
    this.getTeamUserFun();
  },
  methods: {
    async getTeamUserFun(pageNum, pageSize,realName=null) {
      const params = { pageNum: pageNum, pageSize: pageSize ,realName:realName};
      const res = await getTeamUser(params);
      this.data = res.data;
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
      getIssueFun(this.pageNum, this.pageSize, null, null, tab.index);
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
    getRoleColor(priority) {
      switch (priority) {
        case 0:
          return "#909399";
        case 1:
          return "#409EFF";
        default:
          return "black"; // 默认颜色
      }
    },
    // 获取优先级字典
    getRole(priority) {
      switch (priority) {
        case 0: // Emergency
          return "员工";
        case 1: // High
          return "管理员";

      
        default:
          return "";
      }
    },
    // 搜索方法
    searchPer() {
      this.getTeamUserFun(this.pageNum, this.pageSize,this.perForm.realName);
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
