/**
 * 手写 call
 * @param {*} context
 * @param  {...any} args
 */
function myCall (context = window, ...args) {
  const caller = Symbol('caller') // 使用Symbol避免覆盖内部属性
  context[caller] = this

  const result = context[caller](...args)

  delete context[caller]
  return result
}

Function.prototype.myCall = myCall
