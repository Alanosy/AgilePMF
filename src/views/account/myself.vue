
<template>
 <div class="myself">
  <div class="myself-content">
    <div class="myself-title" style="font-size:18px;">
    个人账号
    </div>
    <div class="myself-content-main">
      <div class="main-left">
        <div>账号：{{data.userName}}</div>
        <div>用户名：{{data.realName}}</div>
        <div>当前团队名：{{data.teamName}}</div>
      </div>
      <div class="main-right">
       <el-avatar :size="130" :src="data.avater"></el-avatar>
      
      </div>
    </div>
    </div>
  </div>
 
 </div>
</template>

<script>
import { getInfo, userAddClass, uploadAvatar } from '@/api/user'
import {getMyselfData} from '@/api/user'
import {  getTokenInfo } from '@/utils/jwtUtils'
export default {
  data() {
    return {
      imageUrl: '',
      fileDialogVisible: false,
      fileList: [],
      data: {},
      form: {
        code: ''
      },
      isAdmin: true,
      addClassDialogVisible: false
    }
  },
  created() {
    // if(localStorage.getItem('roles') == "admin" || localStorage.getItem('roles') == "teacher")
    // {
    //   this.isAdmin = false
    // }
    this.getMyselfDataFun()
// getMyselfData
  },
  methods: {
    async getMyselfDataFun() {
      const res = await getMyselfData();
      this.data = res.data;
    },
    async getInfoFun(){
      const res = await getInfo()
      if (res.code) {
        this.data = res.data
      }else{
        this.$message.error('获取个人信息失败')
      }
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList // 收集文件信息
    },
    // 移除文件处理方法
    handleRemove(file, fileList) {
      if (fileList.length == 0) {
        this.hasFiles = false
      }
    },
    // 上传文件逻辑
    importAvatar() {
      if (this.fileList.length > 0) {
        const formData = new FormData() // 创建FormData对象
        formData.append('file', this.fileList[0].raw) // 添加文件到formData
        uploadAvatar(formData).then((res) => {
           if(res.code){
              const userInfo = getTokenInfo()
              trackPresence({ userId: userInfo.id }).then(response => {
                if (response.code) {
                  setToken(response.data)
                }
              })
                .catch(error => {
                  console.error('心跳发送失败:', error)
                })
            this.getInfoFun()
            this.$message.success('文件上传成功！')
            this.fileDialogVisible = false // 关闭对话框
            // 可以在这里处理成功后的逻辑，如刷新数据等
           }
          })
          .catch((error) => {
            console.error('文件上传失败：', error)
            this.$message.error('文件上传失败！')
          })
      } else {
        this.$message.warning('请选择文件后再上传！')
      }
    },

    addClassBt() {
      this.addClassDialogVisible = true
    },
    addClass() {
      const params = { code: this.form.code }
      userAddClass(params).then((res) => {
        if (res.code) {
          this.addClassDialogVisible = false
          this.getInfoFun()
          this.$message({
            type: 'success',
            message: '加入成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style>
.myself{
  height:100vh;
  padding: 30px;
  .myself-content{
    background: #fff;
    width:100%;
    height:100vh;
    padding: 30px;
     .myself-content-main{
       padding-top:30px;
      display:flex;
      .main-left{

        line-height: 70px;
      }
      .main-right{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 200px;
        .el-avatar{
          
        }
      }
     }
  }
}
</style>
