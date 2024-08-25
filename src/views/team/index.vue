<template>
  <div> 
    <div class="main">
      <div class="left">

      <el-menu
          default-active="2"
          style="background-color: transparent; "
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item :index="index" v-for="(item, index) in items" :key="index" @click="changeContent(item)">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
       <!-- <el-menu
        default-active="2"
        style="background-color: transparent; "
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
      <el-menu-item index="1">
          <span slot="title">我的任务</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">我指派的任务</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">我的需求</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">我的任务排期</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">我提的需求</span>
        </el-menu-item>
        <el-menu-item index="6">
          <span slot="title">我的问题</span>
        </el-menu-item>
        <el-menu-item index="7">
          <span slot="title">我创建的问题</span>
        </el-menu-item>
         <el-menu-item index="8">
          <span slot="title">我的项目</span>
        </el-menu-item>
        
      </el-menu> -->
      
      
      </div>
      <div class="right">
<component :is="currentComponent"></component>
    
        
        </div>
    </div>
  </div>

</template>
<script>
import MyTasks from './team.vue';
import AssignedTasks from './personnel.vue';
// import MyDemands from './components/MyDemands.vue';
// import TaskSchedules from './components/TaskSchedules.vue';
// import MyRequests from './components/MyRequests.vue';
// import MyQuestions from './components/MyQuestions.vue';
// import CreatedQuestions from './components/CreatedQuestions.vue';
// import MyProjects from './components/MyProjects.vue';

export default {
  components: {
    MyTasks,
    AssignedTasks,
    // MyDemands,
    // TaskSchedules,
    // MyRequests,
    // MyQuestions,
    // CreatedQuestions,
    // MyProjects
  },
  data() {
    return {
      currentComponent: 'MyTasks',
      items: [
        { title: '我加入的团队', component: 'MyTasks' },
        { title: '团队人员', component: 'AssignedTasks' },
        // { title: '我的需求', component: 'MyDemands' },
        // { title: '我的任务排期', component: 'TaskSchedules' },
        // { title: '我提的需求', component: 'MyRequests' },
        // { title: '我的问题', component: 'MyQuestions' },
        // { title: '我创建的问题', component: 'CreatedQuestions' },
        // { title: '我的项目', component: 'MyProjects' }
      ]
    };
  },
  methods: {
    changeContent(item) {
      this.currentComponent = item.component;
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>

<style lang="scss" scoped>
.main{
  display: flex;
  
}
.left{
  width: 230px;
  min-height: calc(100vh - 50px);
  background-color: #fff;
}
.right{
  width: 100%;
  min-height: calc(100vh - 50px);
  background: #fbfbfd;
}
</style>