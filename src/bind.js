/**
 * 手写 bind
 * @param {*} context
 * @param  {...any} args
 */
function myBind (context = window, ...args) {
  const Callee = this
  return function (...args2) {
    if (new.target) {
      return new Callee(...args, ...args2)
    } else {
      return Callee.call(context, ...args, ...args2)
    }
  }
}

Function.prototype.myBind = myBind
