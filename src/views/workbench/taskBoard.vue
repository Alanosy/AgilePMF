<template>
  <div class="taskBoard">
    <div class="topStateC">
      <div class="topState">人员</div>
      <div class="topState">
        <span class="todo" style="color: rgb(82, 108, 255)">待办 ({{getTaskBoardDataInProgressLength(0)}})</span>
      </div>
      <div class="topState">
        <span class="todo" style="color: rgb(247, 165, 69)">已开始 ({{getTaskBoardDataInProgressLength(1)}})</span>
      </div>
      <div class="topState">
        <span class="todo" style="color: rgb(103, 194, 58)">已完成 ({{getTaskBoardDataInProgressLength(2)}})</span>
      </div>
    </div>
    <div class="mainContentC">
      <div class="mainContent">{{userInfo.realname}}</div>
      <div class="mainContent" v-for="(item2, index2) in taskBoardData" :key="index2">
        <div v-for="(item, index) in item2" class="mainContent1" :key="index">
          <TaskBoardPart :title="item.taskName" :userName="item.pname"></TaskBoardPart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TaskBoardPart from "@/components/TaskPart/taskBoardPart.vue";
import { getTaskBoard } from "@/api/task";
import { getToken } from "@/utils/auth";
import { getTokenInfo } from "@/utils/jwtUtils";
export default {
  components: { TaskBoardPart },
  data() {
    return {
      token:null,
      userInfo:null,
      taskBoardData: {},
      demo: ["1", "2"],
    };
  },
  created() {
     this.token = getToken();
    this.userInfo = getTokenInfo();
    this.getTaskBoardFun();
  },
  methods: {
    getTaskBoardDataInProgressLength(state) {
      return this.taskBoardData[state].length;
    },
    async getTaskBoardFun() {
      const res = await getTaskBoard();
      this.taskBoardData = res.data;
    },
  },
};
</script>
<style scoped>
.taskBoard {
  padding: 30px;
  .topStateC {
    display: flex;
    .topState {
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;

      align-items: center;
      background: #fff;
      width: 30%;
      height: 48px;

      padding-left: 16px;
      font-size: 16px;
      .todo {
        border-left: 3px solid #526cff;
        padding-left: 10px;
        line-height: 16px;
        font-weight: 600;
      }
    }
  }
  .mainContentC {
    display: flex;
    margin-top: 20px;
    .mainContent {
      display: flex;
      flex-direction: column;

      background: #fff;
      width: 30%;

      border-left: 1px solid rgba(0, 0, 0, 0.1);
      padding: 8px;
      min-height: 300px;
    }
  }
}
.mainContent1 {
  display: flex;
}
</style>
