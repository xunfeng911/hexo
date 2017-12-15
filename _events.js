var EventEmitter = (function () {
    function EventEmitter() {
        // this.init = this.init.bind(this);
        this._events = undefined;
        this._Events = new Map();
        this._eventsCount = 0;
        this._maxListeners = undefined;
    }
    ;
    EventEmitter.prototype.setMaxListeners = function (n) {
        this._maxListeners = n;
        return this;
    };
    ;
    EventEmitter.prototype.getMaxListeners = function () {
        if (this._maxListeners === undefined) {
            return EventEmitter.defaultMaxListeners;
        }
    };
    ;
    EventEmitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var events = this._events;
        var Events = this._Events;
        var handler = events[eventName];
        if (handler === undefined)
            return false;
        for (var _a = 0, handler_1 = handler; _a < handler_1.length; _a++) {
            var fn = handler_1[_a];
            // Reflect.apply(fn, this, args);
            fn.apply(void 0, args);
        }
        return true;
    };
    ;
    EventEmitter.prototype._addListener = function (eventName, listener, prepend) {
        var m, existing;
        var events = this._events;
        var Events = this._Events;
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
        }
        else {
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
        }
        else {
            if (prepend) {
                existing.unshift(listener);
            }
            else {
                existing.push(listener);
            }
            // 超过限制监听函数
            if (!existing.warned) {
                m = this.getMaxListeners();
                if (m && m > 0 && existing.length > m) {
                    existing.warned = true;
                    var err = new Error(eventName + "'s listeners should be small than " + m + " ");
                    console.warn(err);
                }
            }
        }
        return this;
    };
    ;
    EventEmitter.prototype.addListener = function (eventName, listener) {
        return this._addListener(eventName, listener, false);
    };
    ;
    EventEmitter.prototype.on = function (eventName, listener) {
        return this._addListener(eventName, listener, false);
    };
    ;
    EventEmitter.prototype.perpendListener = function (eventName, listener) {
        return this._addListener(eventName, listener, true);
    };
    ;
    EventEmitter.prototype.removeListener = function (eventName, listener) {
        // info 1 删除一个， 2 删除整个event，0 没有该函数
        var list, events, info = 0;
        events = this._events;
        if (events === undefined)
            return this;
        list = events[eventName];
        if (list === undefined)
            return this;
        if (list.length > 1) {
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i] === listener) {
                    list.splice(i, 1);
                    info = 1;
                    break;
                }
            }
        }
        else {
            delete this._events[eventName];
            --this._eventsCount;
            info = 2;
        }
        switch (info) {
            case 0:
                console.warn(eventName + " don't have " + listener);
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
    ;
    EventEmitter.prototype.removeAllListeners = function (eventName) {
        var list, events = this._events;
        if (events === undefined)
            return this;
        // 没有 removeListener事件
        if (events.removeListener === undefined) {
            if (arguments.length === 0) {
                this._events = Object.create(null);
                this._eventsCount = 0;
            }
            else if (events[eventName] !== undefined) {
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
            var keys = Object.keys(events);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key === 'removeListener')
                    continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
        }
        list = events[eventName];
        for (var i = list.length - 1; i >= 0; i--) {
            this.removeListener(eventName, list[i]);
        }
        return this;
    };
    ;
    EventEmitter.prototype._onceWrapper = function (state) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!state.fired) {
            this.removeListener(state.eventName, state.wrapFn);
            state.fired = true;
            Reflect.apply(state.listener, this, args);
        }
    };
    ;
    EventEmitter.prototype._onceWrap = function (eventName, listener) {
        var state = {
            fired: false,
            wrapFn: undefined,
            eventName: eventName,
            listener: listener
        };
        var wrapped = this._onceWrapper.bind(this, state);
        wrapped.listener = listener;
        return wrapped;
    };
    ;
    EventEmitter.prototype.once = function (eventName, listener) {
        this.on(eventName, this._onceWrap(eventName, listener));
        return this;
    };
    ;
    EventEmitter.prototype.prependOnceListener = function (eventName, listener) {
        this.perpendListener(eventName, this._onceWrap(eventName, listener));
        return this;
    };
    ;
    EventEmitter.prototype.listeners = function (eventName) {
        var events = this._events;
        if (events === undefined)
            return [];
        var list = events[eventName];
        if (list === undefined)
            return [];
        return list;
    };
    ;
    EventEmitter.prototype.listenerCount = function (eventName) {
        var events = this._events;
        if (events[eventName]) {
            return events[eventName].length;
        }
        else {
            return 0;
        }
    };
    ;
    EventEmitter.prototype.eventNames = function () {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
    ;
    EventEmitter.defaultMaxListeners = 10;
    return EventEmitter;
}());
;
var test = new EventEmitter();
function aa(a, b, c) {
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
