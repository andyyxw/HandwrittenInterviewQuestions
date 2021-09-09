/**
 * 数组扁平化
 * @param {Array} arr 目标数组
 * @param {number} depth 处理的深度
 */
function flat (arr, depth = 1) {
  return depth > 0
    ? arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur), [])
    : [...arr]
}

export default flat
