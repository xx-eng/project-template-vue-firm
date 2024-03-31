import { baseDel, baseEdit, baseJudge, baseList, post } from '@/api/api'

export function listSysConfig () {
  return post('/sys/list')
}

export function editSysConfig (data) {
  return post('/sys/update', data)
}

/** ***********角色相关API***************/
const urlPrefix = '/role'

export function listRole (data) {
  return baseList(urlPrefix, data)
}

export function judgeRole (id, name) {
  const data = { id: id, name: name }
  return baseJudge(urlPrefix, data)
}

export function editRole (data) {
  return baseEdit(urlPrefix, data)
}

export function delRole (ids) {
  return baseDel(urlPrefix, ids)
}

export function listRoleAsDict () {
  return post(urlPrefix + '/listAsDict')
}

export function assignRoleToUser (id, users) {
  return post(urlPrefix + '/assignUser', { id, users })
}

export function cancelAssignUser (ids) {
  return post(urlPrefix + '/cancelAssignUser', { ids })
}
/** ***********角色相关API***************/
