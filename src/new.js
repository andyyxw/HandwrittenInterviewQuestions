/**
 * 手写 new
 * @param {*} func 构造函数
 * @param  {...any} args
 */
function myNew (func, ...args) {
  const result = Object.create(func.prototype)
  const obj = func.apply(result, args)
  // 引用类型直接返回
  return ((typeof obj === 'object' && obj !== null) || (typeof obj === 'function')) ? obj : result
}

export default myNew
