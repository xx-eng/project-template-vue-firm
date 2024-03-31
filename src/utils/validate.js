/**
 * Created by Fenghao on 21/01/31
 */

const RegexConstants = {
  // 验证手机号
  MOBILE: '^((13[0-9])|(14[5,7,9])|(15[^4])|(16[2,5,6,7])|(17[0,1,2,3,5,6,7,8])|(18[0-9])|(19[1,2,5,8,9]))\\d{8}$',
  // 邮箱
  EMAIL: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
  // 身份证号
  ID_CARD: '^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$',
  // 社会统一信用代码
  LICENSE_NUMBER: '/[^_IOZSVa-z\\W]{2}\\d{6}[^_IOZSVa-z\\W]{10}/g',
  // 超链接
  HYPERLINK: "^(https?|ftp):\\/\\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\\.)*[a-zA-Z0-9-]+\\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\\/($|[a-zA-Z0-9.,?'\\\\+&%$#=~_-]+))*$",
  // IP
  IP: '^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])$',
  // 域名
  DOMAIN: '^([a-zA-Z\\d][a-zA-Z\\d-_]+\\.)+[a-zA-Z\\d-_][^ ]*$',
  // 金额
  MONEY: '(^[1-9](\\d+)?(\\.\\d{1,2})?$)|(^(0){1}$)|(^\\d\\.\\d(\\d)?$)'
}

export default RegexConstants

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL (url) {
  return new RegExp(RegexConstants.HYPERLINK).test(url)
}

/**
 * 移动手机号码的校验
 * @param {string} mobile
 * @returns {Boolean}
 */
export function validMobile (mobile) {
  return new RegExp(RegexConstants.MOBILE).test(mobile)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail (email) {
  return new RegExp(RegexConstants.EMAIL).test(email)
}

/**
 * 校验IP地址
 * @param ip
 * @returns {boolean}
 */
export function validIp (ip) {
  return new RegExp(RegexConstants.IP).test(ip)
}

/**
 * 校验身份证号
 * @param idCard
 * @returns {boolean}
 */
export function validIdCard (idCard) {
  return new RegExp(RegexConstants.ID_CARD).test(idCard)
}

/**
 * 校验社会统一身份代码
 * @param licenseNumber
 * @returns {boolean}
 */
export function validLicenseNumber (licenseNumber) {
  return new RegExp(RegexConstants.LICENSE_NUMBER).test(licenseNumber)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString (str) {
  return typeof str === 'string' || str instanceof String
}

/**
 * 判断字符串是否为json字符串
 * @param {String} str
 */
export function isJson (str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
