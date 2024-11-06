<template>
  <el-dialog :title="title" :visible.sync="visible" width="1200px">
    <div class="reqRowDialog">
      <div class="reqRowDialog-l">
        <div class="title-row"></div>
        <div class="main-content">
          <el-tabs v-model="tabsc" @tab-click="handleClick">
            <el-tab-pane label="项目文档" name="0">
              <div v-html="selectedRow.content"></div
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="bottom-part">
          <div class="bottom-left-part">
            <div style="margin-right: 16px">创建人:{{ selectedRow.createName }}</div>

            <div>创建时间: {{ formatDate(selectedRow.createtime) }}</div>
          </div>
          <div>
            <el-button size="mini" type="danger" plain @click="delTaskFun()"
              >删除</el-button
            >
          </div>
        </div>
      </div>
      <div class="reqRowDialog-r">
        <el-form>
          <el-row>
            <el-form-item label="状态">
              <el-select
                v-model="selectedRow.state"
                placeholder="请选择"
                @change="updateTaskFun(selectedRow)"
              >
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="指派给">
              <UserSelect
                v-model="selectedRow.principalid"
                style="width: 200px"
              ></UserSelect>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { saveReq } from "@/api/requirement";
import UserSelect from "@/components/UserSelect";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import ProjectSelect from "@/components/ItemSelect";
import { delTask, updateTask } from "@/api/task";
export default {
  components: {
    Editor,
    Toolbar,
    UserSelect,
    ProjectSelect,
  },
  name: "TaskDetails",
  props: {
    title: {
      type: String,
      default: "任务详情",
    },
    value: {
      type: Boolean,
      default: false,
    },
    refreshData: {
      type: Function,
      default: () => {},
    },
    selectedRow: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: this.value,

      stateOptions: [
        {
          label: "待办",
          value: "0",
        },
        {
          label: "已开始",
          value: "1",
        },
        {
          label: "已完成",
          value: "2",
        },
      ],
      tabsc: "0",
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
    // 日期格式化
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    updateTaskFun(row) {
      const data = {
        state: row.state,
      };
      updateTask(row.id, data).then((res) => {
        this.$message({
          type: "success",
          message: "修改状态成功!",
        });
        this.refreshData();
      });
    },

    delTaskFun() {
      delTask(this.selectedRow.id).then((res) => {
        if (res.code) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.refreshData();
          this.visible = false;
        } else {
          this.$message.error("删除失败，请重试。");
        }
      });
    },
  },
};
</script>
<style scoped>
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
