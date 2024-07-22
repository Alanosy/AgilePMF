<template>
  <div class="app-container">
    <!-- form -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="项目名称">
        <el-input v-model="formInline.searchTitle" placeholder="输入项目名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchExam">查询</el-button>
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

    <!-- table -->
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
      <el-table-column label="序号" align="center" width="80px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" align="center" />
      <el-table-column prop="state" label="状态" align="center" />
      <el-table-column prop="code" label="需求" align="center" />
      <el-table-column prop="userName" label="问题" align="center" />
      <el-table-column prop="userName" label="任务" align="center" />
      <el-table-column prop="userid" label="负责人" align="center" />
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
    <!--新增弹窗-->

    <el-dialog
      title="新建项目"
      :visible.sync="dialogTableVisible"
      :before-close="handleClose"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div>
          <el-form-item label="项目名称">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="项目时间">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="优先级">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getItemPage } from "@/api/project"
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {
      },
      dialogTableVisible: false,
      addForm: {
        gradeName: "",
      },
      formInline: {
        searchTitle: "",
      },
      form: {
        gradeName: "",
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
    openItem(row,name){
      this.$router.push({ name: name, params: { data: row }})
    },
    addClass() {
      const data = { gradeName: this.addForm.gradeName };
      classAdd(data).then((res) => {
        if (res.code) {
          this.addForm.gradeName = "";
          this.getClassPage(
            this.pageNum,
            this.pageSize,
            this.formInline.searchTitle
          );
          this.dialogTableVisible = false;
          this.$message({
            type: "success",
            message: "新增成功!",
          });
        } else {
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
      });
    },
    searchExam() {
      this.getClassPage(
        this.pageNum,
        this.pageSize,
        this.formInline.searchTitle
      );
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getClassPage(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getClassPage(val, this.pageSize);
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
