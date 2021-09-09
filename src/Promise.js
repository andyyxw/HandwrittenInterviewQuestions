/**
 * 手写 Promise
 * 符合 Promise/A+ 规范
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
function resolvePromise (promise, x, resolve, reject) {
  // 不允许返回自己的实例，是死循环
  if (promise === x) {
    return reject(new TypeError('Chain cycle detected for promise!'))
  }
  // 根据规范，成功和失败只能调用一个，用called来防止多次调用
  // 我们的源码中已经对同时调 resolve 和 reject 的情况做了处理，所以这里主要是针对 then 里面return时调用了别家的 promise 库的情况，别家的 promise 库有可能既调 resolve 又调 reject 的情况（不符合promise/A+规范），是我们无法左右的，这里主要是把传进来不符合规范的 promise 给他变成符合的
  let called
  if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
    try {
      const { then } = x
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, e => {
          if (called) return
          called = true
          reject(e)
        })
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

class MyPromise {
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulFilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (value instanceof MyPromise) {
        return value.then(resolve, reject)
      }
      if (this.status !== PENDING) return
      this.status = FULFILLED
      this.value = value
      this.onFulFilledCallbacks.forEach((cb) => cb())
    }
    const reject = (reason) => {
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach((cb) => cb())
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then (onFulFilled, onRejected) {
    if (typeof onFulFilled !== 'function') {
      onFulFilled = (v) => v
    }
    if (typeof onRejected !== 'function') {
      onRejected = (err) => { throw err }
    }

    const promise = new MyPromise((resolve, reject) => {
      const handleFulFilled = () => {
        setTimeout(() => {
          try {
            const x = onFulFilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      const handleRejected = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.status === FULFILLED) {
        handleFulFilled()
      }

      if (this.status === REJECTED) {
        handleRejected()
      }

      if (this.status === PENDING) {
        this.onFulFilledCallbacks.push(handleFulFilled)
        this.onRejectedCallbacks.push(handleRejected)
      }
    })
    return promise
  }

  /**
   * @param {function} errorCallback
   */
  catch (errorCallback) {
    return this.then(null, errorCallback)
  }

  /**
   * @param {function} callback
   */
  finally (callback) {
    return this.then((result) => {
      return MyPromise.resolve(callback()).then(() => result)
    }, (err) => {
      return MyPromise.resolve(callback()).then(() => { throw err })
    })
  }

  static resolve (result) {
    return new MyPromise((resolve) => {
      resolve(result)
    })
  }

  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  /**
   * @param {Iterable} values
   */
  static all (values) {
    if (!values[Symbol.iterator]) {
      return new TypeError(`${values} is not iterable`)
    }

    return new Promise((resolve, reject) => {
      const results = []
      const targets = [...values]
      const handleNext = (value, index) => {
        results[index] = value
        if (results.length === targets.length) {
          resolve(results)
        }
      }
      for (const [index, value] of targets.entries()) {
        if (value && typeof value.then === 'function') {
          value.then((v) => {
            handleNext(v, index)
          }, reject)
        } else {
          handleNext(value, index)
        }
      }
    })
  }

  /**
   * @param {Iterable} values
   */
  static race (values) {
    if (!values[Symbol.iterator]) {
      return new TypeError(`${values} is not iterable`)
    }

    return new Promise((resolve, reject) => {
      for (const value of values) {
        if (value && typeof value.then === 'function') {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }
    })
  }

  static allSettled () {}
}

MyPromise.deferred = function () {
  const dfd = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = MyPromise // 测试时使用
// export default MyPromise
