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
import MyTasks from './workBoard.vue';
import AssignedTasks from './taskBoard.vue';
import agileChart from './agileChart.vue';

export default {
  components: {
    MyTasks,
    AssignedTasks,
    agileChart
  },
  data() {
    return {
      currentComponent: 'MyTasks',
      items: [
        { title: '我的工作台', component: 'MyTasks' },
        { title: '任务看板', component: 'AssignedTasks' },
        { title: '敏捷图表', component: 'agileChart' },

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