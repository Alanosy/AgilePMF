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
export function delIssue(issueId) {
  return request({
    url: `issues/${issueId}`,
    method: 'delete',

  })
}




export function updateStatusAPI(data) {
  return request({
    url: 'issues/updatestate',
    method: 'put',
    data
  })
}


export function updateIssue(issueId,data) {
  return request({
    url: `issues/${issueId}`,
    method: 'put',
    data
  })
}

