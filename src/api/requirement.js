import request from '@/utils/request'

// 保存需求
export function saveReq(data) {
  return request({
    url: 'requirements',
    method: 'post',
    data
  })
}

// 获取需求
export function getReq(params) {
  return request({
    url: 'requirements',
    method: 'get',
    params
  })
}


export function updateStatusAPI(data) {
  return request({
    url: 'requirements/updatestate',
    method: 'put',
    data
  })
}

