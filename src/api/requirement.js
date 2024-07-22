import request from '@/utils/request'

export function saveReq(data) {
  return request({
    url: 'requirements',
    method: 'post',
    data
  })
}
