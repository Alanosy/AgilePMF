<template>
  <el-dialog title="项目" :visible.sync="visible" width="1200px">
    <slot name="dialogContent"></slot>
    <el-form
      :inline="true"
      label-width="90px"
      label-position="left"
      :model="ItemForm"
      class="demo-form-inline"
    >
      <el-row>
        <el-col span="12">
          <el-form-item label="项目名称">
            <el-input
              style="width: 400px"
              v-model="ItemForm.name"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="项目时间" class="picker-cl">
            <el-date-picker
              v-model="ItemForm.startdate"
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker>

            <el-date-picker
              v-model="ItemForm.enddate"
              type="date"
              placeholder="结束日期"
              style="margin-left: 16px"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="24">
          <el-form-item label="项目状态">
            <template>
              <el-radio-group class="radio-cl" v-model="ItemForm.state">
                <el-radio :label="1">立项中</el-radio>
                <el-radio :label="2">规划中</el-radio>
                <el-radio :label="3">进行中</el-radio>
                <el-radio :label="4">已完成</el-radio>
                <el-radio :label="5">挂起</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="ItemDialogFun()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import UserSelect from "@/components/UserSelect";
import { saveTask } from "@/api/task";
import ProjectSelect from "@/components/ItemSelect";
export default {
  components: {
    Editor,
    Toolbar,
    UserSelect,
    ProjectSelect,
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
    type: {
      type: String,
      default: "提示",
    },

    refreshData: {
      type: Function,
      default: () => {},
    },
    updateItemData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: this.value,
      ItemForm: {
        name: "",
        startdate: null,
        enddate: null,
        state: 1,
      },
    };
  },
  created() {
    this.fillFormFromUpdateData(this.updateItemData);
  },
  watch: {
    value(val) {
      this.visible = val;
    },

    //   updateItemData: {
    //   handler(newVal) {
    //     this.fillFormFromUpdateData(newVal);
    //   },
    //   deep: true
    // },
    // updateItemData(val){
    //   console.log(val)

    // this.ItemForm.name = val.name
    // this.ItemForm.startdate = this.formatDateToISOString(val.startdate)
    // this.ItemForm.enddate = this.formatDateToISOString(val.enddate)
    // this.ItemForm.state = val.state
    // },
    visible(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    fillFormFromUpdateData(newVal) {
      console.log(newVal);
      if(newVal){

        this.ItemForm.name = newVal.name;
        this.ItemForm.startdate = newVal.startdate;
        this.ItemForm.enddate = newVal.enddate;
        this.ItemForm.state = new number(newVal.state);
      }
      // if (newVal) {
      //   this.ItemForm = {
      //     ...this.ItemForm,
      //     ...newVal,
      //   };
      // }
    },
    formatDateToISOString(date) {
      // 确保输入是一个Date对象
      if (!(date instanceof Date)) {
        throw new TypeError("Expected a Date object");
      }

      // 格式化为ISO 8601格式，注意这里的时区会自动调整为UTC
      let isoString = date.toISOString();

      // 截取并重新组合字符串，去除毫秒部分并替换T为大写
      // 这一步是根据你的需求调整，通常ISO 8601格式包含毫秒且T是小写
      isoString = isoString.split(".")[0].replace("T", "T");

      return isoString;
    },
    ItemDialogFun() {
      if (this.type == "save") {
        this.saveItemFun();
      } else if (type == "update") {
        this.updateItemFun();
      }
    },
    updateItemFun() {},
    saveItemFun() {
      const data = {
        name: this.ItemForm.name,
        startdate: this.ItemForm.startdate,
        enddate: this.ItemForm.enddate,
        state: this.ItemForm.state,
        userid: this.ItemForm.userid,
      };
      saveItem(data).then((res) => {
        if (res.code) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.$router.push({ name: "project" });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
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
    width: 150px;
  }
}
</style>
