---
title: node events
date: 2017-12-13 21:17:02
tags:
  - TypeScript
  - Node
---
自己用ts写一个events模块试试看...
<!--more-->
<img src="http://xuncs.cn:5001/event.jpeg">
## Events
`Events`模块是基于发布/订阅模式设计的，node中所有能触发事件的对象都是`EventEmitter`类的实例, `EventEmitter`的核心就是事件触发与事件监听器功能的封装。

### Constructor
通过分析`EventEmitter`的源码发现构造函数内含有
- 存储`key-value`的`_events`对象
- 记录事件数量的`_eventsCount`
- 记录事件最大订阅函数数目的`_maxListeners`

使用ES6的`Map`代替`object`，`Map.prototyps.size`属性代替了`_eventsCount`，同时不需要自己计数了~

```ts
class EventEmitter {
  _Events: Map<string, Array<Function>>;
  _maxListeners: number | undefined;
  static defaultMaxListeners = 10
  constructor() {
    this._Events = new Map();
    this._maxListeners = undefined;
  };
}
```
### MaxListeners
`MaxListeners`用来设置事件的最大订阅函数数量，当超过这个数目时会打印警告，并不会报错
```ts
class EventEmitter {
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
}
```

### newListener&&removeListener
`newListener`和`removeListener`作为内置事件，默认是`undefined`
前者在事件订阅新函数时发布
后者在移除事件的订阅函数时发布

### AddListener
`AddListener`承担着订阅功能，通过`Map.set(key, value)`将需要监听的事件函数添加到事件列表里。
```ts
class EventEmitter {
  /**
   * 
   * @param eventName 事件名
   * @param listener  事件函数
   * @param prepend   是否添加到队列首部
   */
  private _addListener(eventName: string, listener: Function, prepend: boolean) {
    let existing: Array<Function>;
    let Events = this._Events;

    // 判断是否有newListener事件
    if (Events.get('newListener') !== undefined) {
      this.emit('newListener', eventName, listener);
    }

    existing = Events.get(eventName);
    if (existing === undefined) {
      existing = Events.set(eventName, [listener]).get(eventName);
    } else {
      if (prepend) existing.unshift(listener);
      else existing.push(listener);
      // 超过限制监听函数则打印警告
      let m = this.getMaxListeners();
      if (m && m > 0 && existing.length > m) {
        const err = new Error(
          `${eventName}'s listeners should be small than ${m} `
        )
        console.warn(err);
      }
    }

    return this;
  };
  // 对外暴露的高阶函数
  addListener(eventName: string, listener: Function) {
    return this._addListener(eventName, listener, false);
  };
  on(eventName: string, listener: Function) {
    return this._addListener(eventName, listener, false);
  };
  perpendListener(eventName: string, listener: Function) {
    return this._addListener(eventName, listener, true);
  };
}
```

### emit
按参数的顺序执行每个订阅函数，如果事件有订阅函数返回 true，否则返回 false
```ts
class EventEmitter {
  /**
   * @description 用来发布事件，依次执行该事件上订阅的所有函数
   * @param {string} eventName 
   * @param {any} args 
   */
  emit(eventName: string, ...args) {
    const Events = this._Events;
    const listeners = Events.get(eventName);
    if (listeners === undefined) return false;
      for (const fn of listeners) {
        fn(...args)
      }
    return true;
  };
}
```

### removeListener
```ts
class EventEmitter {
  /**
   * @description 删除事件上的某个订阅函数
   * 如果事件上没有订阅函数了则移除订阅函数
   * @param {string} eventName 
   * @param {Function} listener 
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
        console.warn(`${eventName} don't have ${listener}`);
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
  };

  /**
   * @description 移除所有事件，如果指定事件则移除指定事件
   * @param {string} [eventName] 
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
}
```

### once
为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器
```ts
interface OnceState {
  fired: boolean;
  wrapFn: Function;
  eventName: string;
  listener: Function;
}
class EventEmitter {
  private _onceWrapper(state: OnceState, ...args) {
    if (!state.fired) {
      this.removeListener(state.eventName, state.wrapFn);
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
}
```

### others

```ts
class EventEmitter {
  /**
   * @description 返回事件的所有订阅函数
   * @param {string} eventName 
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
   * @param {string} eventName 
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
   */
  eventNames() {
    return this._Events.keys();
  };
}
```