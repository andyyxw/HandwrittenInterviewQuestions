/**
 * @description: 用于将数字金额，处理成千分位格式
 * @param {Number} number 需要处理的数字
 * @param {String} separator 用于分隔的字符
 * @return:{String} 千分位格式的金额
 */
function formateNumbers (number, separator = ',') {
  if (!number || number === 0) return ''
  // 将数字根据小数点'.'分割成数组
  const arrNumber = number.toString().split('.')
  arrNumber[0] = arrNumber[0].replace(/\B(?=(\d{3})+\b)/g, separator)
  // 将数组处理为字符串返回
  return arrNumber.join('.')
}

export default formateNumbers
