import { post } from '@/api/api'

const baseUrl = '/firm'

/**
 * 查看待审核商品
 * @param data
 * @returns {AxiosPromise}
 */
export function getAuditGoods (data) {
  return post(baseUrl + '/getGoods', data)
}

export function upshelf (data) {
  return post(baseUrl + '/upshelf', data)
}

export function downshelf (data) {
  return post(baseUrl + '/downshelf', data)
}

export function getAllCategory () {
  return post(baseUrl + '/getAllCategory')
}

export function getAllBrand () {
  return post(baseUrl + '/getAllBrand')
}

export function addGoods (data) {
  return post(baseUrl + '/addGoods', data)
}

export function upload () {
  return post('/file/upload')
}

export function updateGoods (data) {
  return post(baseUrl + '/updateGoods', data)
}

export function addStock (data) {
  return post(baseUrl + '/addStock', data)
}
