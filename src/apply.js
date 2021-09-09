/**
 * 手写 apply
 * @param {*} context
 * @param  {...any} args
 */
function myApply (context = window, args) {
  const caller = Symbol('caller') // 使用Symbol避免覆盖内部属性
  context[caller] = this

  const result = context[caller](...args)

  delete context[caller]
  return result
}

Function.prototype.myApply = myApply
