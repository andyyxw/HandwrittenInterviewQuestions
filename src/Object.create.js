/**
 * 手写 Object.create
 * @param {*} proto 原型对象
 * @param {*} discriptors 属性描述符集合
 */
function create (proto, discriptors) {
  function F () {}
  F.prototype = proto
  F.prototype.constructor = F
  const result = new F()
  discriptors && Object.defineProperties(result, discriptors)
  return result
}

export default create
