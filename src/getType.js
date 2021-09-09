/**
 * 判断数据类型
 * @param {*} target 目标
 */
function getType (target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

export default getType
