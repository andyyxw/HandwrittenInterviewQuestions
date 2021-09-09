/**
 * node 中回调函数的机制（发布订阅模式）
 */

/**
 * @param {*} callback
 * @param {*} once 是否只是触发一次
 */
function wrapCallback (callback, once = false) {
  return { callback, once }
}

class EventEmitter {
  constructor () {
    this.events = new Map()
  }

  addListener (type, fn, once) {
    const handler = this.events.get(type)
    const cb = wrapCallback(fn, once)
    if (handler) {
      if (Array.isArray(handler)) handler.push(cb)
      else this.events.set(type, [handler, cb])
    } else {
      this.events.set(type, cb)
    }
  }

  removeListener (type, listener) {
    console.log('remove')
    const handler = this.events.get(type)
    if (!handler) return
    if (Array.isArray(handler)) {
      const newHandler = handler.filter((item) => item.callback !== listener.callback)
      if (newHandler.length === 1) this.events.set(type, newHandler[0])
      else this.events.set(type, newHandler)
    } else {
      if (handler.callback === listener.callback) this.events.delete(type)
    }
  }

  once (type, fn) {
    this.addListener(type, fn, true)
  }

  emit (type) {
    const handler = this.events.get(type)
    if (!handler) return
    console.log('emit:', handler)
    if (Array.isArray(handler)) {
      handler.forEach((item) => {
        item.callback()
        if (item.once) this.removeListener(type, item)
      })
    } else {
      handler.callback()
    }
  }

  removeAllListener (type) {
    if (!this.events.get(type)) return
    this.events.delete(type)
  }
}

const e = new EventEmitter()
// e.addListener('type', () => {
//   console.log('type事件触发！')
// })
// e.addListener('type', () => {
//   console.log('WOW!type事件又触发了！')
// })

function f () {
  console.log('type事件我只触发一次')
}
e.once('type', f)
e.emit('type')
e.emit('type')
// e.removeAllListener('type')
// e.emit('type')

// type事件触发！
// WOW!type事件又触发了！
// type事件我只触发一次
// type事件触发！
// WOW!type事件又触发了！

export default EventEmitter
