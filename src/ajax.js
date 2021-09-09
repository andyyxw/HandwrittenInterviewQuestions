/**
 * 手写 ajax
 * @param {string} url 请求地址
 * @param {object} options 其他参数
 */
function request (url, options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return

      try {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          reject(new Error(xhr.statusText))
        }
      } catch (e) {
        reject(e)
      }
    }

    xhr.open(options.method, url)
    xhr.send()
  })
}

export default request
