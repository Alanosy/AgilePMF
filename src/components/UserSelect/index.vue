<template>
  <el-select
    v-model="selectedUserIds"
    :multiple="isMultiple"
    :remote-method="fetchUsers"
    filterable
    remote
    reserve-keyword
    clearable
    automatic-dropdown
    placeholder="选择或搜索用户"
    class="user-selector"
    @change="handleUserChange"
  >
    <el-option
      v-for="user in userList"
      :key="user.id"
      :label="user.name"
      :value="user.id"
    />
  </el-select>
</template>

<script>
import { fetchUsers } from '@/api/user' // 假设这是获取用户列表的API

export default {
  name: 'UserSelect',
  props: {
    isMultiple: {
      type: Boolean,
      default: false
    },
    value: [String, Array],
    excludes: Array // 如果有需要排除的用户ID，可以传入此参数
  },
  data() {
    return {
      userList: [], // 存储用户列表
      selectedUserIds: [] // 当前选中的用户ID
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.selectedUserIds = newValue
      },
      immediate: true // 确保在组件创建时立即设置初始值
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers(query = '') {
      // 使用query参数进行过滤，如果需要可以根据props.excludes进一步过滤
      fetchUsers({ pageNum: 1, pageSize: 1000, name: query }).then((response) => {
        this.userList = response.data || [] // 假设API响应包含一个records字段
      })
    },
    handleUserChange(selectedIds) {
      // 确保selectedIds始终是一个数组，即使是单选情况下传入的是单个值
      const idsArray = Array.isArray(selectedIds) ? selectedIds : [selectedIds]

      // 根据需要处理选中用户的逻辑，比如查找选中用户的详细信息
      const selectedUsers = this.userList.filter((user) => idsArray.includes(user.id))

      // 发送选中的用户对象数组到父组件，即使是单选，也以数组形式发送，数组中只有一个元素
      this.$emit('change', selectedUsers)

      // 更新v-model绑定的值，如果是单选，父组件应该期望接收到的是单个值，但这里仍按照多选逻辑发送数组
      // 父组件可以通过判断数组长度来区分是单选还是多选

      this.$emit('input', selectedIds)
    }
  }
}
</script>

<style scoped>
.user-selector {
  width: 100%;
}
</style>
