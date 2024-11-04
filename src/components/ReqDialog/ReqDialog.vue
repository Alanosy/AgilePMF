<template>
  <el-dialog :title="title" :visible.sync="visible" width="1200px">
    <slot name="dialogContent"></slot>
    <el-form
      label-width="70px"
      label-position="left"
      :inline="true"
      :model="reqForm"
      class="demo-form-inline"
    >
      <el-row>
        <el-col span="16">
          <el-form-item label="需求名称">
            <el-input
              v-model="reqForm.name"
              placeholder="需求名称"
              style="width: 690px"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-form-item label="指派给">
          <UserSelect v-model="reqForm.principalId"></UserSelect>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="优先级">
            <template>
              <el-radio-group v-model="reqForm.priority" class="radio-cl">
                <el-radio :label="0">P3低</el-radio>
                <el-radio :label="1">P2中</el-radio>
                <el-radio :label="2">P1高</el-radio>
                <el-radio :label="3">P0紧急</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="计划时间" class="picker-cl">
            <el-date-picker
              v-model="reqForm.startDate"
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker>

            <el-date-picker
              v-model="reqForm.endDate"
              type="date"
              placeholder="结束日期"
              style="margin-left: 16px"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
         <el-form-item label="关联项目">
          <ProjectSelect v-model="reqForm.itemId"></ProjectSelect>
          </el-form-item>

      </el-row>
      <el-row>
         
        </el-col>
        <el-col span="8">
          <el-form-item label="状态">
             <el-select v-model="reqForm.state" placeholder="请选择">
              <el-option
                v-for="item in reqOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="8">
         
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="需求文档" style="width: 1050px">
          <template>
            <div style="border: 1px solid #ccc; width: 975px">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
              />
              <Editor
                style="height: 200px; overflow-y: hidden"
                v-model="reqForm.content"
              />
            </div>
          </template>
        </el-form-item>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="saveReqFun()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveReq } from "@/api/requirement";
import UserSelect from "@/components/UserSelect";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import ProjectSelect from "@/components/ItemSelect";
export default {
  components: {
    Editor,
    Toolbar,
    UserSelect,
    ProjectSelect
  },
  props: {
    title: {
      type: String,
      default: "提示",
    },
    value: {
      type: Boolean,
      default: false,
    },
    refreshData: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      reqOptions:[
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
      visible: this.value,
      reqForm: {
        name: "",
        state: "0",
        itemId: null,
        principalId: null,
        priority: 0,
        content: "",
        startDate: null,
        endDate: null,
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
    },
  },
  methods: {
      formatDateToISOString(date) {
      // 确保输入是一个Date对象
      if (!(date instanceof Date)) {
        throw new TypeError('Expected a Date object')
      }

      // 格式化为ISO 8601格式，注意这里的时区会自动调整为UTC
      let isoString = date.toISOString()

      // 截取并重新组合字符串，去除毫秒部分并替换T为大写
      // 这一步是根据你的需求调整，通常ISO 8601格式包含毫秒且T是小写
      isoString = isoString.split('.')[0].replace('T', 'T')

      return isoString
    },
    saveReqFun() {
      const data = {
        name: this.reqForm.name,
        state: this.reqForm.state,
        principalId: this.reqForm.principalId,
        priority: this.reqForm.priority,
        itemId: this.reqForm.itemId,
        content: this.reqForm.content,
        startDate: this.reqForm.startDate ? this.formatDateToISOString(this.reqForm.startDate) : null,
        endDate: this.reqForm.endDate ? this.formatDateToISOString(this.reqForm.endDate) : null,
      };

      saveReq(data).then((res) => {
        if (res.code) {
          this.refreshData();
          this.visible = false;
        } else {
          this.$message({
            type: "",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.radio-cl {
  .el-radio {
    margin-right: 10px;
  }
}
.picker-cl {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 143px;
  }
}
</style>
