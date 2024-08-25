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
      
      </div>
      <div class="right">
<component :is="currentComponent"></component>
    
        
        </div>
    </div>
  </div>

</template>
<script>
import MyTasks from './myself.vue';
import AssignedTasks from './updatemyself.vue';
import MyDemands from './updateUassword.vue';


export default {
  components: {
    MyTasks,
    AssignedTasks,
    MyDemands,
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
        { title: '个人账号', component: 'MyTasks' },
        { title: '个人资料修改', component: 'AssignedTasks' },
        { title: '密码修改', component: 'MyDemands' },
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