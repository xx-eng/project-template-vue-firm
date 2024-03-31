import { post } from '@/api/api'

const baseUrl = '/monitor'

export function listAllLoginInfo (data) {
  return post(baseUrl + '/login/list', data)
}

export function listAllLogRecord (data) {
  return post(baseUrl + '/log/list', data)
}

export function listOnlineUser (data) {
  return post(baseUrl + '/online/list', data)
}

export function forceQuit (id) {
  return post(baseUrl + '/online/quit', { id: id })
}

export function listAllOnlineRecord (data) {
  return post(baseUrl + '/online/record/list', data)
}

export function getServerInfo () {
  return post(baseUrl + '/server/getInfo')
}
