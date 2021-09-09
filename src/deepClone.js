/**
 * 深拷贝
 * @param {*} target 目标
 * @param {*} cache
 */
import getType from './getType.js'

function deepClone (target, cache = new WeakSet()) {
  let result
  const type = getType(target)
  if (type === 'object') {
    result = {}
  } else if (type === 'array') {
    result = []
  } else {
    return target
  }

  if (cache.has(target)) return target

  cache.add(target)

  for (const [key, value] of Object.entries(target)) {
    if (['object', 'array'].includes(getType(value))) {
      result[key] = deepClone(value, cache)
    } else {
      result[key] = value
    }
  }
  return result
}

export default deepClone
