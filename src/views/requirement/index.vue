<template>
  <div class="app-container">
    <!-- 搜索区 -->
    <el-form :inline="true" :model="reqform" class="demo-form-inline">
      <el-form-item label="项目名称">
        <ProjectSelect v-model="reqform.itemId"></ProjectSelect>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchReqFun">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="requirementVisible = true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 标签页 -->
    <el-tabs v-model="tabValue" @tab-click="handleClick">
      <el-tab-pane label="全部需求" name="0"></el-tab-pane>
      <el-tab-pane label="我负责的" name="1"></el-tab-pane>
      <el-tab-pane label="我提交的" name="2"></el-tab-pane>
      <el-tab-pane label="我延期的" name="3"></el-tab-pane>
    </el-tabs>
    <!-- 需求表格 -->
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
      <el-table-column prop="priority" label="优先级" align="center">
        <template #default="{ row }">
          <span :style="{ color: getRowType(row.priority) }">{{
            getRowPriority(row.priority)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reqname" label="需求名称" align="center" />
      <el-table-column prop="itemname" label="关联项目" align="center" />
      <el-table-column prop="state" label="状态" align="center">
        <template v-slot="{ row }">
          <el-select v-model="row.state" placeholder="请选择" @change="updateStatus(row)">
            <el-option
              v-for="item in reqOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="starttime" label="计划开始时间" align="center">
        <template v-slot="{ row }">
          {{ formatDate(row.starttime) }}
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="计划完成时间" align="center">
        <template v-slot="{ row }">
          {{ formatDate(row.endtime) }}
        </template>
      </el-table-column>
      <el-table-column prop="realname" label="负责人" align="center" />
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
    <req-dialog
      v-model="requirementVisible"
      title="添加需求"
      :refreshData="getReqFun"
    >
    </req-dialog>
    <!-- 详情弹窗 -->
    <ReqDetails v-model="reqDialogVisible" :selectedRow="this.selectedRow"></ReqDetails>
   
  </div>
</template>

<script>
import ReqDialog from "@/components/ReqDialog/ReqDialog.vue";
import UserSelect from "@/components/UserSelect";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getReq, updateStatusAPI, delReq } from "@/api/requirement";
import ProjectSelect from "@/components/ItemSelect";
import ReqDetails from "@/components/ReqDetails"
export default {
  components: {
    Editor,
    Toolbar,
    UserSelect,
    ReqDialog,
    ReqDetails,
    ProjectSelect,
  },
  data() {
    return {
      tabValue:"",
      pageNum: 1,
      pageSize: 10,
      data: {},
      reqform: {
        itemId: null,
      },
      requirementVisible: false,
      reqOptions: [
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
      value: "0",
      reqDialogVisible: false,
      selectedRow: {},
    };
  },

  created() {
    this.getReqFun();
  },
  methods: {
    updateStatus(row) {
      this.updateStatusInDB(row);
    },
    handleRowClick(row) {
      this.selectedRow = Object.assign({}, row); // 使用 Object.assign 深拷贝数据
      this.reqDialogVisible = true;
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    handleClick(tab, event) {
      this.getReqFun(this.pageNum, this.pageSize, tab.index, null);
    },
    // 分页查询
    async getReqFun(pageNum, pageSize, type = null, itemid = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, type: type, itemId: itemid };
      const res = await getReq(params);
      this.data = res.data;
    },
    getRowType(priority) {
      switch (priority) {
        case 1:
          return "red";
        case 2:
          return "orange";
        case 3:
          return "green";
        default:
          return "black"; // 默认颜色
      }
    },
    getRowPriority(priority) {
      switch (priority) {
        case 1: // Emergency
          return "P0紧急";
        case 2: // High
          return "P1高";
        case 3: // Medium
          return "P2中";
        case 4: // Low
          return "P3低";
        default:
          return "";
      }
    },

    searchReqFun() {
      this.getReqFun(this.pageNum, this.pageSize, this.tabValue, this.reqform.itemId);
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getReqFun(this.pageNum, val, null, null);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getReqFun(val, this.pageSize, null, null);
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
      .bottom-left-part {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
