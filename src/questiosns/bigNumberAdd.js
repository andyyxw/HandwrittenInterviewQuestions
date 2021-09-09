/**
 * 大数字相加
 * @param {String} a 数字
 * @param {String} b 数字
 */
function bigNumberAdd (a = '', b = '') {
  a = String(a)
  b = String(b)
  let i = a.length - 1
  let j = b.length - 1
  let result = ''
  let carry = 0
  while (i >= 0 || j >= 0) {
    let x = 0
    let y = 0
    let sum

    if (i >= 0) {
      x = Number(a[i])
      i--
    }
    if (j >= 0) {
      y = Number(b[j])
      j--
    }
    sum = x + y + carry
    if (sum >= 10) {
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }
    result = sum + result
  }
  return result
}

export default bigNumberAdd
