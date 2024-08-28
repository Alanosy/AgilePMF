<template>
  <div class="app-container">
    <!-- 搜索 按钮 -->
    <el-form :inline="true" :model="itemFrom" class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-input v-model="itemFrom.searchTitle" placeholder="输入项目名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchItem">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="itemDialogVisible=true"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
        <el-tabs v-model="tabValue" @tab-click="handleClick">
      <el-tab-pane label="全部项目" name="0"></el-tab-pane>
      <el-tab-pane label="我负责的" name="1"></el-tab-pane>
      <el-tab-pane label="我创建的" name="2"></el-tab-pane>
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
      <el-table-column prop="name" label="项目名称" align="center" />
      <el-table-column prop="state" label="状态" align="center" >
        <template #default="{ row }">
          <span :style="{ color: getPriorityColor(row.state) }">{{
            getRowPriority(row.state)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reqcount" label="需求" align="center" />
      <el-table-column prop="issuecount" label="问题" align="center" />
      <el-table-column prop="taskcount" label="任务" align="center" />
      <el-table-column prop="username" label="负责人" align="center" />
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
    <ItemDialog v-model="itemDialogVisible" :selectedRow="this.selectedRow"></ItemDialog>
  </div>
</template>

<script>
import { getItemPage } from "@/api/project"
import ItemDialog from "@/components/ItemDialog"
export default {
  components: {
    ItemDialog
  },
  data() {
    return {
      selectedRow:{},
      itemDialogVisible:false,
      tabValue:"0",
      pageNum: 1,
      pageSize: 10,
      data: {
      },
      itemFrom: {
        searchTitle: "",
      },
    };
  },
  created() {
    this.getItemPageFun();
  },
  methods: {
     handleClick(tab, event) {
      this.getItemPageFun(this.pageNum, this.pageSize,  null,tab.index,) 
    },
    handleRowClick(row) {
      this.openItem(row,'item')
    },
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
      this.data = res.data;
    },
    // 新增
    openItem(row,name){
      this.$router.push({ name: name, query: { data: row }})
    },
    // 搜索
    searchItem() {
      this.getItemPageFun(
        this.pageNum,
        this.pageSize,
        this.itemFrom.searchTitle,
        this.tabValue
      );
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getItemPageFun(this.pageNum, val,null,null);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getItemPageFun(val, this.pageSize,null,null);
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
</style>
