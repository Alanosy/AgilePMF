<template>
  <div class="app-container">
    <div class="main-top">
      <div class="r1block">项目总数：{{ data.projectCount }}</div>
      <div class="r1block">待办任务：{{ data.taskCount }}</div>
      <div class="r1block">待处理需求：{{ data.requirementCount }}</div>
      <div class="r1block">待处理问题：{{ data.issueCount }}</div>
    </div>

    <div class="main-content">
      <div class="main-content-title">
        <div class="r20">成员</div>
        <div class="r21" v-for="(item0, index0) in weekDates" :key="index0">
          {{ item0 }}
        </div>
      </div>
      <div class="main-content-content">
        <div class="r30">{{ userInfo.realname }}</div>
        <div class="r31">
          <div class="r31c" v-for="(inta, index) in weekTaskData" :key="index">
            <div
              class="WeekTask"
              v-for="(item, index2) in weekTaskData[index]" 
              @click="handleRowClick(item)"
              :key="index2"
            >
              <TaskPart
                :title="item.taskName"
                :itemName="item.itemName"
                :isLeaveOver="item.isLeaveOver"
              ></TaskPart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-foot">
      <div class="main-foot-title">
        <div class="foot-title">遗留任务</div>
        <div
          class="foot-title-right"
          v-for="(item0, index0) in weekDates"
          :key="index0"
        ></div>
      </div>
      <div class="main-foot-content">
        <div class="r40">{{ userInfo.realname }}</div>

        <div class="r41">
          <div class="LegacyBlock" v-for="(item, index2) in LegacyTaskData" @click="handleRowClick(item)" :key="index2">
            <TaskPart
              :title="item.taskName"
              :itemName="item.itemName"
              :isLeaveOver="item.isLeaveOver"
            ></TaskPart>
          </div>
        </div>
      </div>
    </div>
    <TaskDetails v-model="taskDialogVisible" :selectedRow="this.selectedRow"></TaskDetails>
  </div>
</template>

<script>
import TaskPart from "@/components/TaskPart/index.vue";
import { getDashBoardCount } from "@/api/dashboard";
import { getWeekTask, getLegacyTask } from "@/api/task";
import { getToken } from "@/utils/auth";
import { getTokenInfo } from "@/utils/jwtUtils";
import TaskDetails from "@/components/TaskDetails";
export default {
  name: "Index",
  components: {
    TaskPart,
    TaskDetails,
  },
  data() {
    return {
      data: {},
      taskDialogVisible:false,
      weekTaskData: {},
      selectedRow:{},
      LegacyTaskData: {},
      taskList: [
        {
          title: "待办任务",
          count: 0,
          color: "#f56c6c",
          icon: "el-icon-s-order",
        },
        {
          title: "待办任务",
          count: 0,
          color: "#409EFF",
          icon: "el-icon-s-order",
        },
        {
          title: "待办任务",
        },
      ], // 存储任务列表
      weekDates: [], // 存储一周的日期
      token: null,
      userInfo: null,
    };
  },
  mounted() {
    this.calculateWeekDates();
  },
  created() {
    this.token = getToken();
    this.userInfo = getTokenInfo();
    this.getWeekTaskFun();
    this.getDashBoardFun();
  },
  methods: {
    handleRowClick(row) {
      console.log(1111);
      this.selectedRow = Object.assign({}, row); // 使用 Object.assign 深拷贝数据
      this.taskDialogVisible = true;
    },
    async getWeekTaskFun() {
      const res = await getWeekTask();
      this.weekTaskData = res.data;
      const res2 = await getLegacyTask();
      this.LegacyTaskData = res2.data;
    },
    async getDashBoardFun() {
      const res = await getDashBoardCount();
      this.data = res.data;
    },
    calculateWeekDates() {
      const today = new Date();
      const firstDayOfWeek = this.getFirstDayOfWeek(today);
      const weekDates = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek.getTime() + i * 24 * 60 * 60 * 1000);
        const formattedDate = this.formatDate(date);
        weekDates.push(formattedDate);
      }

      this.weekDates = weekDates;
    },
    getFirstDayOfWeek(date) {
      const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
      const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day of week is Sunday
      return new Date(date.setDate(diff));
    },
    formatDate(date) {
      const month = new Intl.DateTimeFormat("zh-CN", { month: "2-digit" }).format(date);
      const day = new Intl.DateTimeFormat("zh-CN", { day: "2-digit" }).format(date);
      const weekday = new Intl.DateTimeFormat("zh-CN", { weekday: "long" }).format(date);
      return `${month}${day} ${weekday}`;
    },
  },
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #fbfbfd;
}
.main-content {
  width: 100%;
  /* height: 60vh; */
  margin-top: 40px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  .main-content-title {
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    justify-content: space-between;
    .r21 {
      height: 48px;
      background: #f2f3f4;
      width: 23%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-left: 1px solid #e7e7e7;
    }
    .r20 {
      height: 48px;
      background: #f2f3f4;
      width: 15%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-left: 1px solid #e7e7e7;
    }
  }
  .main-content-content {
    display: flex;
    justify-content: space-between;
    .r31 {
      background: #fff;
      min-height: 350px;
      width: 91%;
      display: flex;
      .r31c {
        width: calc(100% / 7); /* 每个项目的宽度为容器宽度的1/7 */
        border-left: 1px solid #e7e7e7;
        .WeekTask {
        }
      }
    }
    .r30 {
      background: #f2f3f4;
      width: 9%;
      min-height: 350px;
      /* height: 100%; */
      /* padding: 30px; */
      border-left: 1px solid #e7e7e7;
      display: flex;
      justify-content: center;
      padding-top: 20px;
    }
  }
}

.main-foot {
  width: 100%;
  /* height: 60vh; */
  margin-top: 40px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  .main-content-title {
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    justify-content: space-between;
    .r21 {
      height: 48px;
      background: #f2f3f4;
      width: calc(100% / 7);
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-left: 1px solid #e7e7e7;
    }
    .r20 {
      height: 48px;
      background: #f2f3f4;
      width: 15%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-left: 1px solid #e7e7e7;
    }
  }
  .main-foot-title {
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    height: 48px;
    .foot-title-right {
      height: 48px;
      background: #fff;
      width: 23%;
      height: 48px;
      line-height: 48px;
      text-align: center;
    }
    .foot-title {
      height: 48px;
      background: #fff;
      width: 15%;
      height: 48px;
      line-height: 48px;
      text-align: center;
    }
  }
  .main-foot-content {
    display: flex;
    justify-content: space-between;
    .r41 {
      background: #fff;
      width: 91%;
      min-height: 250px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .LegacyBlock {
        flex: 0 0 auto; /* 不让项目伸缩 */
        width: calc(100% / 7); /* 每个项目的宽度为容器宽度的1/7 */
        border-left: 1px solid #e7e7e7;
      }
    }
    .r40 {
      background: #f2f3f4;
      width: 9%;
      min-height: 290px;
      /* height: 100%; */
      /* padding: 30px; */
      border-left: 1px solid #e7e7e7;
      display: flex;
      justify-content: center;
      padding-top: 20px;
    }
  }
}
.main-top {
  display: flex;
  justify-content: space-between;
  .r1block {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    width: 23%;
    height: 100px;
    line-height: 100px;
    padding-left: 30px;
  }
}
</style>
