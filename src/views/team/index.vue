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
import MyTasks from './team.vue';
import AssignedTasks from './personnel.vue';
import MyDemands from './apply.vue';

export default {
  components: {
    MyTasks,
    AssignedTasks,
    MyDemands,
  },
  data() {
    return {
      currentComponent: 'MyTasks',
      items: [
        { title: '我加入的团队', component: 'MyTasks' },
        { title: '团队人员', component: 'AssignedTasks' },
        { title: '加团审核', component: 'MyDemands' },
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