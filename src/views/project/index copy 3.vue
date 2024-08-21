<template>
  <div>
    <el-button @click="showDialog = true">打开对话框</el-button>
    <custom-dialog
      v-model="showDialog"
      title="自定义标题"
      @confirm="handleConfirm"
      @close="handleClose"
    >
    </custom-dialog>
  </div>
</template>

<script>
import CustomDialog from '@/components/CustomDialog/CustomDialog.vue';

export default {
  components: {
    CustomDialog
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    handleConfirm() {
      console.log('确认操作');
      this.showDialog = false;
    },
    handleClose() {
      console.log('关闭对话框');
      this.showDialog = false;
    }
  }
};
</script>