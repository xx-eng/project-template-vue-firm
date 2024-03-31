import { post } from '@/api/api'

const baseUrl = '/firm'

/**
 * 查看待审核商品
 * @param data
 * @returns {AxiosPromise}
 */
export function getFirmBrand (data) {
  return post(baseUrl + '/getFirmBrand', data)
}

export function addBrand (data) {
  return post(baseUrl + '/addBrand', data)
}
