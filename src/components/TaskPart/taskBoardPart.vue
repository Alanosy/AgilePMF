<template>
  <div class="task-board-card">
    <div class="task-title">
      <i class="ivu-icon ivu-icon-md-move handler" style="font-size: 14px"></i
      ><strong>{{title}}</strong
      >
      <!-- <i class="iconfont myIcon-edit2 ivu-icon ivu-icon-custom"></i> -->
    </div>
    <div class="task-desc"></div>
    <div class="task-info todo">
      <div class="task-staff">{{userName}}</div>
      <div class="task-hour"></span></div>
    </div>
  </div>
</template>
<script>
export default {
    name: "TaskBoardPart",
      props: {
    title: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
      }
};
</script>
<style scoped>
.task-board-card {
    padding: 10px;
    width: 100%;
    height:102px;
    min-height: 102px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
    margin-top: 9px;
    background: #fff;
    position: relative;
}
.task-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #333;
    padding-left: 10px;
    padding-right: 20px;
}
.task-desc {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666;
    line-height: 30px;
    padding-left: 20px;
}
.task-info {
    display: flex;
    height: 38px;
    padding-left: 10px;
    align-items: center;
}
.task-staff {
    flex: 8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666;
}
.task-info .task-hour {
    flex: 2;
    text-align: right;
}
</style>