import { baseDel, baseJudge, post } from '@/api/api.js'
import { baseEdit, baseList } from '@/api/api'

const baseUrl = '/firm'

/**
 * 用户登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login (data) {
  return post(baseUrl + '/login', data)
}

/**
 * 获取用户信息
 * @returns {AxiosPromise}
 */
export function getInfo () {
  return post(baseUrl + '/getInfo')
}

export function get (data) {
  return post(baseUrl + '/get', data)
}

export function getAddress (data) {
  return post(baseUrl + '/getAddress', data)
}

/**
 * 用户登出
 * @returns {AxiosPromise}
 */
export function logout () {
  return post(baseUrl + '/logout')
}

export function updateUserPassword (id, password, newPassword) {
  return post(baseUrl + '/updateUserPassword', { id, password, newPassword })
}

/**
 * 获取用户列表
 * @param data
 * @returns {AxiosPromise}
 */
export function listUser (data) {
  return baseList(baseUrl, data)
}

/**
 * 通过角色获取对应的用户
 * @param data
 * @returns {AxiosPromise}
 */
export function listUserByRole (data) {
  return post(baseUrl + '/listByRole', data)
}

/**
 * 获取所有用户信息
 * @param excludeId
 * @returns {AxiosPromise}
 */
export function listAllUser (excludeId = 0) {
  return post(baseUrl + '/listAll', { excludeId: excludeId })
}

export function getUserInfo (id) {
  return post(baseUrl + '/getUserInfo', { id })
}

/**
 * 编辑用户
 * @param data
 * @returns {AxiosPromise}
 */
export function editUser (data) {
  return baseEdit(baseUrl, data)
}

/**
 * 判断指定的用户信息是否存在
 * @param id
 * @param field
 * @param value
 * @returns {AxiosPromise}
 */
export function judgeUser (id, field, value) {
  return post(baseUrl + '/judge', { id, field, value })
}

/**
 * 删除用户
 * @param id
 * @returns {AxiosPromise}
 */
export function delUser (id) {
  return post(baseUrl + '/delete', { id })
}

/**
 * 设置用户对应的角色
 * @param id
 * @param roleIds
 * @returns {AxiosPromise}
 */
export function setRole (id, roleIds) {
  return post(baseUrl + '/setRole', { id: id, roleIds: roleIds })
}

/**
 * 更改用户状态
 * @param id
 * @param status
 * @returns {AxiosPromise}
 */
export function changeUserStatus (id, status) {
  return post(baseUrl + '/changeStatus', { id, status })
}

/** ***********用户访问IP管理***************/
const accessIpUrl = '/access/ip'
export function listAccessIp (data) {
  return baseList(accessIpUrl, data)
}

export function judgeAccessIp (id, userId, ip) {
  return baseJudge(accessIpUrl, { id, userId, ip })
}

export function editAccessIp (data) {
  return baseEdit(accessIpUrl, data)
}

export function delAccessIp (userId, ids) {
  return post(accessIpUrl + '/delete', { userId, ids })
}
/** ***********用户访问IP管理***************/

/** ***********部门相关API接口***************/
const departmentUrlPrefix = '/department'

export function listAllDepartment () {
  return post(departmentUrlPrefix + '/listAll')
}

export function getDepartmentTree (parentId, name) {
  return post(departmentUrlPrefix + '/tree', { parentId, name })
}

export function judgeDepartment (id, parentId, name) {
  return baseJudge(departmentUrlPrefix, { id, parentId, name })
}

export function editDepartment (data) {
  return baseEdit(departmentUrlPrefix, data)
}

export function delDepartment (ids) {
  return baseDel(departmentUrlPrefix, ids)
}

export function getAllDepartmentTree () {
  return post(departmentUrlPrefix + '/listTree')
}
/** ***********部门相关API接口***************/
