interface OnceState {
  fired: boolean;
  wrapFn: Function;
  eventName: string;
  listener: Function;
}

class EventEmitter {
  _events: object | undefined;
  _Events: Map<string, Object>;
  _eventsCount: number;
  _maxListeners: number | undefined;
  static defaultMaxListeners = 10
  constructor() {
    // this.init = this.init.bind(this);
    this._events = undefined;
    this._Events = new Map();
    this._eventsCount = 0;
    this._maxListeners = undefined;
  };

  setMaxListeners(n:number) {
    this._maxListeners = n;
    return this;
  };

  getMaxListeners(): number {
    if (this._maxListeners === undefined) {
      return EventEmitter.defaultMaxListeners;
    }
  };

  emit(eventName: string, ...args) {
    const events = this._events;
    const Events = this._Events;
    const handler = events[eventName];
    if (handler === undefined) return false;
      for (const fn of handler) {
        // Reflect.apply(fn, this, args);
        fn(...args)
      }
    return true;
  };

  private _addListener( eventName: string, listener: Function, prepend: boolean) {
    let m, existing;
    let events = this._events;
    let Events = this._Events;

    if (Events.get('newListener') !== undefined) {
      this.emit('newListener', eventName, listener);
    }
    existing = Events.get(eventName);
    if (existing === undefined) {
      existing = Events.set(eventName, [listener]).get(eventName);
    }
    
    // evnents 为空
    if (events === undefined) {
      events = this._events = Object.create(null);
      this._eventsCount = 0;
    } else {
      if (events.newListener !== undefined) {
        this.emit('newListener', eventName, listener);
        events = this._events;
      }
      existing = events[eventName];
    }
    // 添加监听事件
    if (existing === undefined) {
      existing = events[eventName] = [listener];
      ++this._eventsCount;
    } else {
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
      // 超过限制监听函数
      if (!existing.warned) {
        m = this.getMaxListeners();
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          const err = new Error(
            `${eventName}'s listeners should be small than ${m} `
          )
          console.warn(err);
        }
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
  
  removeListener(eventName: string, listener: Function) {
    // info 1 删除一个， 2 删除整个event，0 没有该函数
    let list, events, info = 0;

    events = this._events;
    if (events === undefined) return this;
    list = events[eventName];
    if (list === undefined) return this;

    if (list.length > 1) {
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener) {
          list.splice(i, 1);
          info = 1;
          break;
        }
      }
    } else {
      delete this._events[eventName];
      --this._eventsCount;
      info = 2;
    }

    switch (info) {
      case 0:
        console.warn(`${eventName} don't have ${listener}`);
        break;
      case 1:
        if (events.removeListener)
          this.emit('removeListener', eventName, listener);
        break;
      case 2:
        if (events.removeListener)
          this.emit('removeListener', eventName, listener);
        break;
      default:
        break;
    }
  };
  
  removeAllListeners(eventName?: string) {
    let list, events = this._events;
    if (events === undefined) return this;

    // 没有 removeListener事件
    if (events.removeListener === undefined) {
      if (arguments.length === 0) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      } else if (events[eventName] !== undefined) {
        if (--this._eventsCount === 0) {
          this._events = Object.create(null);
        }
        else {
          delete events[eventName];
        }
      }
      return this;
    }
    // emit removelistener before remove all events
    if (arguments.length === 0) {
      const keys = Object.keys(events);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }

    list = events[eventName];
    for (let i = list.length - 1; i >= 0; i--) {
      this.removeListener(eventName, list[i]);
    }
    return this;
  };
  
  private _onceWrapper(state: OnceState, ...args) {
    if (!state.fired) {
      this.removeListener(state.eventName, state.wrapFn);
      state.fired = true;
      Reflect.apply(state.listener, this, args);
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


  listeners(eventName: string) {
    const events = this._events;
    if (events === undefined) return [];
    const list = events[eventName];
    if (list === undefined) return [];

    return list;
  };

  listenerCount(eventName: string) {
    const events = this._events;
    if (events[eventName]) {
      return events[eventName].length;
    } else {
      return 0;
    }
  };

  eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };
};

const test = new EventEmitter();
function aa(a,b,c) {
  console.log(a, b, c);
}
// test.addListener('newListener', () => console.log('c'))
// test.addListener('test', aa);
// test.emit('test', 'a', 'n', 'y');
// test.eventNames();
// console.log('listeners', test.listeners('test'));
// console.log('listCount', test.listenerCount('test'));
// test.removeAllListeners();
test.once('test', aa);
console.log(test);
test.emit('test', 'x', 'y', 'z');
console.log(test);