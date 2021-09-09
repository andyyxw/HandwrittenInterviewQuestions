/**
 * leftpad
 * @param {string} str 目标字符串
 * @param {number} length 目标长度
 * @param {*} ch
 */
function leftpad (str, length, ch) {
  let len = Math.max(0, length - str.length)
  let total = ''
  while (len) {
    if (len & 1) { // len % 2 !== 0
      total += ch
    }
    if (len === 1) {
      return total + str
    }
    ch += ch
    len = len >> 1 // len = Math.floor(len / 2)
  }
}

export default leftpad
