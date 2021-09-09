/**
 * 无限累加函数
 * @param  {...any} args1
 */
function accumulation (...args1) {
  const fn = (...args2) => accumulation(...args1, ...args2)
  fn.toString = () => args1.reduce((a, b) => a + b, 0)
  return fn
}

export default accumulation
