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
        
      </el-menu>
      
      
      </div>
      <div class="right">2</div>
    </div>
  </div>

</template>

<script>

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
  background: #f5f7f9;
}
</style>