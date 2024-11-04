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

export function delTask(taskId) {
  return request({
    url: `tasks/${taskId}`,
    method: 'delete',
  })
}


export function getWeekTask() {
  return request({
    url: 'tasks/weekTask',
    method: 'get',
  })
}

export function getTaskBoard() {
  return request({
    url: 'tasks/taskBoard',
    method: 'get',
  })
}

export function getLegacyTask() {
  return request({
    url: 'tasks/legacy-task',
    method: 'get',
  })
}
// /legacy-task
// burndown-chart
export function getBurndownChart(params) {
  return request({
    url: 'tasks/burndown-chart',
    method: 'get',
    params
  })
}

export function updateTask(taskId,data) {
  return request({
    url: `tasks/${taskId}`,
    method: 'put',
    data
  })
}