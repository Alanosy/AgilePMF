
import request from '@/utils/request'

export function saveTeam(data) {
  return request({
    url: 'teams',
    method: 'post',
    data
  })
}

export function addTeam(data) {
    return request({
      url: 'teams/addTeam',
      method: 'post',
      data
    })
}
  
export function getTeam(params) {
    return request({
        url: 'teams',
        method: 'get',
        params
    })
}

export function getTeamUser(params) {
    return request({
        url: 'teams/user',
        method: 'get',
        params
    })
}


export function cutTeam(data) {
    return request({
        url: 'teams/cut',
        method: 'put',
        data
    })
}

