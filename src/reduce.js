/**
 * 手写 reduce
 */
function myReduce (cb, initial) {
  const arr = this
  let result = typeof initial === 'undefined' ? arr[0] : initial
  for (const [key, val] of arr.entries()) {
    result = cb(result, val, key, arr)
  }
  return result
}

Array.prototype.myReduce = myReduce
