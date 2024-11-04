<template>
  <div class="task-board-card">
    <!-- 123123123 -->
    <div class="task-title-name"><span class="word-wrap cursor-pointer">{{title}}</span></div>
    <div title="测试" class="task-desc">项目：{{itemName}}</div>
    <div class="task-desc">
          <el-tag size="mini" :key="isLeaveOver" :type="getTaskType(isLeaveOver)" effect="dark">
            {{ getTask(isLeaveOver) }}
          </el-tag>
    </div>
    
    <div class="divider"></div>
  </div>
</template>
<script>
export default {
  name: "TaskPart",
  props: {
    title: {
      type: String,
      default: "",
    },
    itemName: {
      type: String,
      default: "",
    },
    isLeaveOver: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
  

    };
  },
computed:{


},
  mounted() {},
  methods: {
      getTaskType(isLeaveOver) {
      switch (isLeaveOver) {
        case "0": // Emergency
          return "success";
        case "1": // High
          return "Danger";
        case "2": // Medium
          return "Warning";
        case "3": // Medium
          return "success";
        default:
          return "black"; // 默认颜色
      }
    },
    getTask(isLeaveOver) {
      switch (isLeaveOver) {
        case "0": // Emergency
          return "待办";
        case "1": // Emergency
          return "遗留";
        case "2": // High
          return "超时";
        case "3": // High
          return "已完成";
        default:
          return "";
      }
    }
  },
};
</script>
<style>
.task-board-card {
  padding: 8px 10px;
  width: 100%;
  background: #fff;
  position: relative;
  margin-bottom: 1px;
  .divider {
    width: 100%;
    margin: 0 auto;
    border-bottom: 1px dashed #999;
    -webkit-transform: translateY(9px);
    transform: translateY(9px);
  }
  .task-desc {
    color: #999;
    line-height: 1.5;
    text-align: start;
    padding-left: 2px;
    padding-bottom: 2px;
    font-size: 12px;
    padding-top: 4px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
