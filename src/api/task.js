import request from '@/utils/request'

// 保存任务
export function saveTask(data) {
  return request({
    url: 'tasks',
    method: 'post',
    data
  })
}
// 获取任务
export function getTask(params) {
  return request({
    url: 'tasks',
    method: 'get',
    params
  })
}
