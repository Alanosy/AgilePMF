import request from '@/utils/request'

export function saveTask(data) {
  return request({
    url: 'issues',
    method: 'post',
    data
  })
}
