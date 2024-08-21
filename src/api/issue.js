import request from '@/utils/request'


// 保存问题
export function saveIssue(data) {
  return request({
    url: 'issues',
    method: 'post',
    data
  })
}

// 获取问题
export function getIssue(params) {
  return request({
    url: 'issues',
    method: 'get',
    params
  })
}



export function updateStatusAPI(data) {
  return request({
    url: 'issues/updatestate',
    method: 'put',
    data
  })
}
