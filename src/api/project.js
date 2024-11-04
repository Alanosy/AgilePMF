import request from '@/utils/request'

export function getItemPage(params) {
  return request({
    url: 'projects',
    method: 'get',
    params
  })
}

export function updateItem(data) {
  return request({
    url: 'projects',
    method: 'put',
    data
  })
}

export function saveItem(data) {
  return request({
    url: 'projects',
    method: 'post',
    data
  })
}

export function fetchProjects() {
  return request({
    url: 'projects/fetchProjects',
    method: 'get',
  })
}
// overview
export function getOverviewItem(params) {
  return request({
    url: 'projects/overview',
    method: 'get',
    params
  })
}
export function getItemContent(params) {
  return request({
    url: 'projects/itemContent',
    method: 'get',
    params
  })
}
export function updateItemContent(data) {
  return request({
    url: 'projects/itemContent',
    method: 'put',
    data
  })
}
// saveRemark
export function saveRemark(data) {
  return request({
    url: 'projects/remark',
    method: 'post',
    data
  })
}
export function getRemark(params) {
  return request({
    url: 'projects/remark',
    method: 'get',
    params
  })
}
export function uploadFile(data) {
  return request({
    url: 'projects/uploadFile',
    method: 'post',
    data
  })
}
export function getFileList(params) {
  return request({
    url: 'projects/file-list',
    method: 'get',
    params
  })
}

export function closeItem(data) {
  return request({
    url: 'projects/close',
    method: 'put',
    data
  })
}