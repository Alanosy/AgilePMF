<template>
  <el-select
    v-model="selectedProjectIds"
    :multiple="isMultiple"
    :remote-method="fetchProjects"
    filterable
    remote
    reserve-keyword
    clearable
    automatic-dropdown
    placeholder="选择或搜索项目"
    class="project-selector"
    @change="handleProjectChange"
  >
    <el-option
      v-for="project in projectList"
      :key="project.id"
      :label="project.name"
      :value="project.id"
    />
  </el-select>
</template>

<script>
import { fetchProjects } from '@/api/project' // 假设这是获取项目列表的API

export default {
  name: 'ProjectSelect',
  props: {
    isMultiple: {
      type: Boolean,
      default: false
    },
    value: [String, Array],
    excludes: Array // 如果有需要排除的项目ID，可以传入此参数
  },
  data() {
    return {
      projectList: [], // 存储项目列表
      selectedProjectIds: [] // 当前选中的项目ID
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.selectedProjectIds = newValue
      },
      immediate: true // 确保在组件创建时立即设置初始值
    }
  },
  created() {
    this.fetchProjects()
  },
  methods: {
    fetchProjects(query = '') {
      // 使用query参数进行过滤，如果需要可以根据props.excludes进一步过滤
      fetchProjects({ pageNum: 1, pageSize: 1000, name: query }).then((response) => {
        this.projectList = response.data || [] // 假设API响应包含一个data字段
      })
    },
    handleProjectChange(selectedIds) {
      // 确保selectedIds始终是一个数组，即使是单选情况下传入的是单个值
      const idsArray = Array.isArray(selectedIds) ? selectedIds : [selectedIds]

      // 根据需要处理选中项目的逻辑，比如查找选中项目的详细信息
      const selectedProjects = this.projectList.filter((project) => idsArray.includes(project.id))

      // 发送选中的项目对象数组到父组件，即使是单选，也以数组形式发送，数组中只有一个元素
      this.$emit('change', selectedProjects)

      // 更新v-model绑定的值，如果是单选，父组件应该期望接收到的是单个值，但这里仍按照多选逻辑发送数组
      // 父组件可以通过判断数组长度来区分是单选还是多选

      this.$emit('input', selectedIds)
    }
  }
}
</script>

<style scoped>
.project-selector {
  width: 100%;
}
</style>