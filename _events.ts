interface OnceState {
  fired: boolean;
  wrapFn: Function;
  eventName: string;
  listener: Function;
}

class EventEmitter {
  _Events: Map<string, Array<Function>>;
  _maxListeners: number | undefined;
  static defaultMaxListeners = 10
  constructor() {
    // this.init = this.init.bind(this);
    this._Events = new Map();
    this._maxListeners = undefined;
  };
  /**
   * @description 用来设置事件的最大订阅函数数量
   * @param n 最大值
   */
  setMaxListeners(n:number) {
    this._maxListeners = n;
    return this;
  };
  /**
   * @description 返回事件的最大订阅函数数量
   */
  getMaxListeners(): number {
    if (this._maxListeners === undefined) {
      return EventEmitter.defaultMaxListeners;
    } else {
      return this._maxListeners;
    }
  };
  /**
   * @description 用来发布事件，依次执行该事件上订阅的所有函数
   * 
   * @param {string} eventName 
   * @param {any} args 
   * @returns 
   * @memberof EventEmitter
   */
  emit(eventName: string, ...args) {
    const Events = this._Events;
    const listeners = Events.get(eventName);
    console.log(listeners);
    if (listeners === undefined) return false;
    for (const fn of listeners) {
      fn(...args)
    }
    return true;
  };
/**
 * 
 * @param eventName 事件名
 * @param listener  事件函数
 * @param prepend   是否添加到队列首部
 */
  private _addListener( eventName: string, listener: Function, prepend: boolean) {
    let m, existing: Array<Function>;
    let Events = this._Events;

    if (Events.get('newListener') !== undefined) {
      this.emit('newListener', eventName, listener);
    }
    existing = Events.get(eventName);
    if (existing === undefined) {
      existing = Events.set(eventName, [listener]).get(eventName);
    } else {
      if (prepend) existing.unshift(listener);
      else existing.push(listener);
      console.log(existing);
      // 超过限制监听函数
      m = this.getMaxListeners();
      if (m && m > 0 && existing.length > m) {
        const err = new Error(
          `${eventName}'s listeners should be small than ${m} `
        )
        console.warn(err);
      }
    }
    return this;
  };

  addListener(eventName: string, listener: Function) {
    return this._addListener(eventName, listener, false);
  };

  on(eventName: string, listener: Function) {
    return this._addListener(eventName, listener, false);
  };

  perpendListener(eventName: string, listener: Function) {
    return this._addListener(eventName, listener, true);
  };
  /**
   * @description 删除事件上的某个订阅函数
   * 如果事件上没有订阅函数了则移除订阅函数
   * 
   * @param {string} eventName 
   * @param {Function} listener 
   * @returns 
   * @memberof EventEmitter
   */
  removeListener(eventName: string, listener: Function) {
    // info 1 删除一个， 2 删除整个event，0 没有该函数
    let listeners, info = 0;
    let Events = this._Events;
    if (!Events.size) return this;
    listeners = Events.get(eventName);
    if (listeners === undefined) return this;

    if (listeners.length > 1) {
      for (let i = listeners.length - 1; i >= 0; i--) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          info = 1;
          break;
        }
      }
    } else {
      Events.delete(eventName);
      info = 2;
    }

    switch (info) {
      case 0:
        console.warn(`${eventName} don't have this listener`);
        break;
      case 1:
        if (Events.get('removeListener'))
          this.emit('removeListener', eventName, listener);
        break;
      case 2:
        if (Events.get('removeListener'))
          this.emit('removeListener', eventName, listener);
        break;
      default:
        break;
    }
    return this;
  };
  /**
   * @description 移除所有事件，如果指定事件则移除事件
   * 
   * @param {string} [eventName] 
   * @returns 
   * @memberof EventEmitter
   */
  removeAllListeners(eventName?: string) {
    let Events = this._Events;
    if (!Events.size) return this;
    // 没有 removeListener事件
    if (Events.get('removeListener') === undefined) {
      if (arguments.length === 0) {
        Events.clear();
      } else if (Events.get(eventName) !== undefined) {
        if (Events.size === 1) {
          Events.clear();
        }
        else {
          Events.delete(eventName);
        }
      }
      return this;
    }
    // emit removelistener before remove all events
    if (arguments.length === 0) {
      const keys = Events.keys();
      for (let key of keys) {
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      return this;
    }

    let listeners = Events.get(eventName);
    for (let i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(eventName, listeners[i]);
    }
    return this;
  };
  
  private _onceWrapper(state: OnceState, ...args) {
    if (!state.fired) {
      // Reflect.apply(state.listener, this, args);
      setTimeout(() => {
        this.removeListener(state.eventName, state.wrapFn);
      });
      state.fired = true;
      state.listener(...args);
    }
  };

  private _onceWrap(eventName: string, listener: Function): Function {
    let state = {
      fired: false,
      wrapFn: undefined,
      eventName,
      listener
    }
    let wrapped = this._onceWrapper.bind(this, state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  };

  once(eventName: string, listener: Function) {
    this.on(eventName, this._onceWrap(eventName, listener));
    return this;
  };

  prependOnceListener(eventName: string, listener: Function) {
    this.perpendListener(eventName, this._onceWrap(eventName, listener));
    return this;
  };

  /**
   * @description 返回事件的所有订阅函数
   * 
   * @param {string} eventName 
   * @returns 
   * @memberof EventEmitter
   */
  listeners(eventName: string) {
    const Events = this._Events;
    if (Events.size === 0) return [];
    const listeners = Events.get(eventName);
    if (listeners === undefined) return [];

    return listeners;
  };
  /**
   * @description 返回事件的订阅函数的数两
   * 
   * @param {string} eventName 
   * @returns 
   * @memberof EventEmitter
   */
  listenerCount(eventName: string) {
    const Events = this._Events;
    if (Events.get(eventName)) {
      return Events.get(eventName).length;
    } else {
      return 0;
    }
  };
  /**
   * @description 返回所有事件的键值
   * 
   * @returns 
   * @memberof EventEmitter
   */
  eventNames() {
    return this._Events.keys();
  };
};

function t(a) {
  console.log('once');
  console.log(a);
}
function b(a) {
  console.log('on');
  console.log(a);
}
const test = new EventEmitter();
test.once('test', t);
test.on('test', b);
test.on('test', b);
test.emit('test', 'b');
console.log(test);