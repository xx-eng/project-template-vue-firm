import { baseDel, baseEdit, post } from './api'

const urlPrefix = '/menu'

/**
 * 获取菜单的树状结构
 * @param parentId
 * @param name
 * @returns {AxiosPromise}
 */
export const listMenuTree = (parentId, name, status) => {
  const data = { parentId: parentId, name: name, status: status }
  return post(urlPrefix + '/tree', data)
}

/**
 * 获取所以的菜单的树状结构
 * @param parentId
 * @param name
 * @returns {AxiosPromise}
 */
export const allListMenuTree = (data) => {
  return post(urlPrefix + '/listTree', data)
}

/**
 * 编辑菜单内容
 * @param data
 * @returns {AxiosPromise}
 */
export const editMenu = (data) => {
  return baseEdit(urlPrefix, data)
}

/**
 * 删除菜单内容
 * @param ids
 * @returns {AxiosPromise}
 */
export const delMenu = (ids) => {
  return baseDel(urlPrefix, ids)
}

/**
 * 获取当前用户的所有菜单信息
 * @returns {AxiosPromise}
 */
export const listMyRouters = () => {
  return post(urlPrefix + '/listMy')
}
