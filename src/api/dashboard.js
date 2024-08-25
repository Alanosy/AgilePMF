import request from '@/utils/request'


// 保存问题
export function getDashBoardCount(data) {
  return request({
    url: 'dshboard/count',
    method: 'get',
    data
  })
}