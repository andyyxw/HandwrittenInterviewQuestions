/**
 * 手写 co
 * @param {Generator} genFunc 生成器函数
 */
function asyncToGenerator (genFunc) {
  return function () {
    const gen = genFunc.apply(this, arguments)
    return new Promise((resolve, reject) => {
      function step (key, arg) {
        let genResult
        try {
          genResult = gen[key](arg)
        } catch (e) {
          return reject(e)
        }
        const { value, done } = genResult
        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
        }
      }
      step('next')
    })
  }
}

// 测试
// const getData = () => new Promise(resolve => setTimeout(() => { resolve('data') }, 1000))
// function * testG () { // 这个就是上面的那个案例
//   const data = yield getData()
//   console.log('data1: ', data)
//   const data2 = yield getData()
//   console.log('data2: ', data2)
//   return 'success'
// }
// const gen = asyncToGenerator(testG)
// gen().then(res => console.log('res: ', res))

export default asyncToGenerator
