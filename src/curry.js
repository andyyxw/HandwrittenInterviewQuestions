/**
 * 柯里化
 * @param {function} func 目标函数
 * @param  {...any} args
 */
function curry (func, ...args) {
  return func.length > args.length ? (...args2) => curry(func, ...args, ...args2) : func(...args)
}

export default curry
