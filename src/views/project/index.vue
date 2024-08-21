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
          :title="diaTitle"
          type="primary"
          @click="openItem(null,'itemsave')"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="data.records"
      border
      fit
      highlight-current-row
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
      <el-table-column prop="name" label="项目名称" align="center" />
      <el-table-column prop="state" label="状态" align="center" />
      <el-table-column prop="reqcount" label="需求" align="center" />
      <el-table-column prop="issuecount" label="问题" align="center" />
      <el-table-column prop="taskcount" label="任务" align="center" />
      <el-table-column prop="username" label="负责人" align="center" />
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            style="font-size: 14px"
            @click="openItem(row,'item')"
            >管理项目</el-button
          >
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
import { getItemPage } from "@/api/project"
export default {
  components: {
  },
  data() {
    return {
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
    // 分页查询
    async getItemPageFun(pageNum, pageSize, itemName = null) {
      const params = { "pageNum": pageNum, "pageSize": pageSize, "itemName": itemName };
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
        this.itemFrom.searchTitle
      );
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getItemPageFun(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getItemPageFun(val, this.pageSize);
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
