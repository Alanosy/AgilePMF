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
            @click="dialogTableVisible = true"
      >新增</el-button>
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
        <el-table-column prop="gradeName" label="项目名称" align="center" />
        <el-table-column prop="gradeCount" label="状态" align="center" />
        <el-table-column prop="code" label="需求" align="center" />
        <el-table-column prop="userName" label="问题" align="center" />
        <el-table-column prop="userName" label="任务" align="center" />
        <el-table-column prop="userName" label="负责人" align="center" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              style="font-size: 14px"
              @click="updateRow(row)"
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
      <el-dialog title="新增项目" :visible.sync="dialogTableVisible">
        <el-row>
          <el-form :model="addForm">
            <el-form-item label="班级名称" label-width="110px">
              <el-input v-model="addForm.gradeName" autocomplete="off" />
            </el-form-item>
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClass">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        data: {},
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
      this.getClassPage();
    },
    methods: {
      // 分页查询
      async getClassPage(pageNum, pageSize, title = null) {
        const params = { pageNum: pageNum, pageSize: pageSize, gradeName: title };
        const res = await classPaging(params);
        this.data = res.data;
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
  