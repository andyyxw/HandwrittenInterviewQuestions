/**
 * 手写 instanceof
 * @param {*} target 实例对象
 * @param {*} Cons 构造函数
 */
function myInstanceof (target, Cons) {
  // 去除掉基本类型
  if ((typeof target !== 'object' && typeof target !== 'function') || !Cons) {
    return false
  }

  let proto = Object.getPrototypeOf(target)
  while (true) {
    if (proto === null) return false
    if (proto === Cons.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

export default myInstanceof
