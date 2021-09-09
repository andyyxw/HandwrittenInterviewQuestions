/**
 * 手写 节流
 * @param {Function} func 目标函数
 * @param {Number} delay 控制时间
 * @param {Object} options 其他选项
 */
// function throttle (func, delay = 1000, options = {}) {
//   let { immediate = true } = options
//   let flag = true
//   let timer

//   return function () {
//     const run = () => func.apply(this, arguments)
//     if (immediate) {
//       immediate = false
//       run()
//     }

//     if (!flag) return
//     flag = false
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       run()
//       flag = true
//     }, delay)
//   }
// }
function throttle (func, delay = 1000, options = {}) {
  let { immediate = true } = options
  let timer

  return function () {
    if (timer) return

    const run = () => func.apply(this, arguments)
    if (immediate) {
      immediate = false
      run()
    }
    timer = setTimeout(() => {
      timer = null
      run()
    }, delay)
  }
}

export default throttle
