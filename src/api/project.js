import request from '@/utils/request'

export function getItemPage(params) {
  return request({
    url: 'projects',
    method: 'get',
    params
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