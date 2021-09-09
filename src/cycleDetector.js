/**
 * 检查一个对象是否存在"环"
 */
import getType from './getType.js'

function cycleDetector (target) {
  let circle = false
  const caches = []

  ;(function test (obj) {
    for (const value of Object.values(target)) {
      if (getType(target) === 'object') {
        if (caches.includes(value)) {
          circle = true
          break
        } else {
          caches.push(value)
          test(value)
          caches.pop()
        }
      }
    }
  })(target)

  return circle
}

export default cycleDetector
