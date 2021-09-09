/**
 * 手写 防抖
 * @param {Function} func 目标函数
 * @param {Number} delay 控制时间
 * @param {Object} options 其他选项
 */
function debounce (func, delay = 1000, options = {}) {
  let { immediate = true } = options
  let timer

  return function () {
    clearTimeout(timer)

    const run = () => func.apply(this, arguments)
    if (immediate) {
      immediate = false
      run()
    }
    timer = setTimeout(run, delay)
  }
}

export default debounce
