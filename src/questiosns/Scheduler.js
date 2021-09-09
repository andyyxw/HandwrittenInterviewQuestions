/**
 * JS实现异步调度器（头条面试编程题）
 * 要求：
 * JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有 2 个
 * 完善下面代码中的 Scheduler 类，使程序能正确输出
 */

// class Scheduler {
//   add (promiseCreator) {
//     // ...
//   }
//   // ...
// }
// const timeout = (time) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, time)
//   })
// }
// const scheduler = new Scheduler()
// const addTack = (time, order) => {
//   return scheduler
//     .add(() => timeout(time))
//     .then(() => console.log(order))
// }
// addTack(1000, '1')
// addTack(500, '2')
// addTack(300, '3')
// addTack(400, '4')

// 输出：2 3 1 4
// 一开始，1、2 两个任务进入队列
// 500ms 时，完成 2，输出 2，任务 3 进队
// 800ms 时，完成 3，输出 3，任务 4 进队
// 1000ms 时，完成 1，输出 1，没有下一个进队的
// 1200ms 时，完成 4，输出 4，没有下一个进队的
// 进队完成，输出 2 3 1 4

class Scheduler {
  constructor (maxTaskCount) {
    this.count = 0
    this.maxTaskCount = maxTaskCount
    this.taskQueue = []
  }

  async add (promiseCreator) {
    if (this.count >= this.maxTaskCount) {
      await new Promise(resolve => {
        this.taskQueue.push(resolve)
      })
    }

    this.count++
    const result = await promiseCreator()
    this.count--

    if (this.taskQueue.length) {
      this.taskQueue.shift()()
    }

    return result
  }
}

export default Scheduler
