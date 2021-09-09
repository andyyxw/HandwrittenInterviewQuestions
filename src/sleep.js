/**
 * @param {Number} duration 延时
 */
function sleep (duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export default sleep
