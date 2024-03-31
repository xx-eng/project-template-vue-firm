import { post } from '@/api/api'

const baseUrl = '/firm'

/**
 * 查看待审核商品
 * @param data
 * @returns {AxiosPromise}
 */
export function getAllOrders (data) {
  return post(baseUrl + '/getAllOrders', data)
}

export function getAllTrade (data) {
  return post(baseUrl + '/getAllTrade', data)
}

export function consignment (data) {
  return post(baseUrl + '/consignment', data)
}

export function getShippedOrders (data) {
  return post(baseUrl + '/getShippedOrders', data)
}

export function getNotReturnOrders (data) {
  return post(baseUrl + '/getNotReturnOrders', data)
}

export function getTerminalOrders (data) {
  return post(baseUrl + '/getTerminalOrders', data)
}

export function getReletOrders (data) {
  return post(baseUrl + '/getReletOrders', data)
}

export function refund (id, level) {
  return post(baseUrl + '/refund', { id, level })
}

export function refundBefore (data) {
  return post(baseUrl + '/refundBefore', data)
}
