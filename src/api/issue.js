import request from '@/utils/request'

export function saveIssue(data) {
  return request({
    url: 'issues',
    method: 'post',
    data
  })
}
