/**
 * 十进制转其他进制
 * @param {number} number 目标数字
 * @param {number} base 转换后的进制
 */
function baseCover (number, base = 2) {
  if (base < 2 || base > 16) {
    throw new Error('base is illegal!')
  }
  let result = ''
  const digits = '0123456789ABCDEF'
  const stack = []
  while (number) {
    stack.push(number % base)
    number = Math.floor(number / base)
  }
  while (stack.length) {
    result += digits[stack.pop()]
  }
  return result
}

export default baseCover
