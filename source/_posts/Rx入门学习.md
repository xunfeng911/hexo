---
title: Rx入门学习
date: 2017-08-12 14:08:28
tags:
---
## RXjs

### Functional Programming
 - Expression, no Statement
 - Pure Function
 - 利用参数保存状态


### 建立Observable
统一订阅
```js
observable.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
});
```
- `create`
```js
/**
@param: `callback function`
*/
var observable = Rx.Observable
  .create(function(observer) {
    observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
    observer.next('Anna');
  })
```

- `of`
多个传递值
```js
var observable = Rx.Observable.of('Jerry', 'Anna');
```

- `from`
数组，字符串，promise对象
```js
var params = ['Jerry', 'Anna']  // 数组
var params = 'Jerry' // 字符串
var params = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hi')
    }, 300)
})                  // promise对象
var observable = Rx.Observable.from(params)
```

- `fromEvent`
为DOM元素添加监听事件
param1: DOM对象，param2: 监听事件
```js
var observable = Rx.Observable.fromEvent($DOM, $event);
```

- `fromEventPattern`
同时具有注册移除监听的类事件使用
```js
class Producer {
	constructor() {
		this.listeners = [];
	}
	addListener(listener) {
		if(typeof listener === 'function') {
			this.listeners.push(listener)
		} else {
			throw new Error('listener 必須是 function')
		}
	}
	removeListener(listener) {
		this.listeners.splice(this.listeners.indexOf(listener), 1)
	}
	notify(message) {
		this.listeners.forEach(listener => {
			listener(message);
		})
	}
}
var egghead = new Producer(); 
var source = Rx.Observable
    .fromEventPattern(
        (handler) => egghead.addListener(handler), 
        (handler) => egghead.removeListener(handler)
    ); 
source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
})
egghead.notify('Hello! Can you hear me?');
// Hello! Can you hear me?
```


- `empty`
给出一个空的Observable，如果订阅这个Observable则会立即push出complete
```js
var source = Rx.Observable.empty()
```

- `never`
给出一个无穷的Observable，订阅后将什么都不发生，但存在
```js
var source = Rx.Observable.never()
```

- `throw`
给出一个错误的Observable，订阅后将直接抛出错误
```js
var source = Rx.Observable.throw()
```

- `interval`
每隔一段时间推送出一个从零开始递增的整数
```js
var source = Rx.Observable.interval(666)
```

- `timer`
`param_one`: 发出第一个值的等待时间(number)/等待到的日期(Date)
`param_two`: 第一个值发出之后发送每个值的间隔时间
如果只有一个参数，发出第一个值之后触发complete
```js
var source = Rx.Observable.timer(5000, 1000)
```


### Subscription
订阅Observable后会回传一个subscription对象，这个对象含有释放资源的`unsubscribe`方法，可以停止订阅
```js
var source = Rx.Observable.timer(1000, 1000);
// 取得 subscription
var subscription = source.subscribe({
	next: function(value) {
		console.log(value)
	},
	complete: function() {
		console.log('complete!');
	},
	error: function(error) {
    console.log('Throw Error: ' + error)
	}
});
setTimeout(() => {
    subscription.unsubscribe()
}, 5000)
// 输出: 0,1,2,3,4
```

### Operator
`Operators`是一个个被附加到`Observable`上的方法，经过这些方法传递出一个新的`observable`

#### Transformation Operators
- `map`: 对 `Observable` 对象发出的每个值，使用指定的 `project` 函数，进行映射处理
```js
var source = Rx.Observable.interval(1000);
var newest = source.map(x => x + 2); 
newest.subscribe(console.log);
```
```
source: -----0-----1-----2-----3--...
            map(x => x + 2)
newest: -----2-----3-----4-----5--...
```
- `mapTo`: 对 `Observable` 对象发出的每个值，映射成固定的值
```js
var source = Rx.Observable.interval(1000);
var newest = source.mapTo(2); 
newest.subscribe(console.log);
```
```
source: -----0-----1-----2-----3--...
                mapTo(2)
newest: -----2-----2-----2-----2--...
```
- `scan`: 对 `Observable` 发出值，执行 `accumulator` 指定的运算，类似于 `reduce` 
```js
var source = Rx.Observable.interval(1000)
var newest = source.scan( count => count + 5, '2')
newest.subscribe(console.log);
```
```
source: -----0------1------2------3--...
        scan( x => x + 5, 0)
newest: -----5-----10-----15-----20--...
```

- `buffer`: 缓冲源 `Observable` 对象已发出的值，直到 `closingNotifier` 触发后，统一输出缓存的元素
```js
var source = Rx.Observable.interval(300);
var source2 = Rx.Observable.interval(1000);
var example = source.buffer(source2);
example.subscribe(...);
```
```
source : --0--1--2--3--4--5--6--7..
source2: ---------0---------1--------...
            buffer(source2)
example: ---------([0,1,2])---------([3,4,5]) 
```

- `bufferTime`: 设定源 `Observable` 对象已发出的值的缓冲时间
```js
var source = Rx.Observable.interval(300);
var example = source.bufferTime(1000);
example.subscribe(...);
```
```
source : --0--1--2--3--4--5--6--7..
            bufferTime(1000)
example: ---------([0,1,2])---------([3,4,5]) 
```

- `bufferCount`: 缓冲源 `Observable` 对象已发出的值，直到大小达到给定的最大 `bufferSize` 
```js
var source = Rx.Observable.interval(300);
var example = source.bufferCount(3);
example.subscribe(...);
```
```
source : --0--1--2--3--4--5--6--7..
            bufferCount(3)
example: ---------([0,1,2])---------([3,4,5]) 
```

- `concatMap`: 对每个 `Observable` 对象发出的值，进行映射处理，并进行合并。该操作符也会依序所有`Observable` 对象
```js
var source = Rx.Observable.fromEvent(document.body, 'click');
var example = source.concatMap(e => Rx.Observable.interval(100).take(3));
example.subscribe(...);
```
```
source : -----------c--c------------------...
        concatMap(c => Rx.Observable.interval(100).take(3))
example: -------------0-1-2-0-1-2---------...
```

- `switchMap`: 对源 `Observable` 对象发出的值，做映射处理。若有新的 `Observable` 对象出现，会在新的 `Observable` 对象发出新值后，退订前一个未处理完的 `Observable` 对象
```js
var source = Rx.Observable.fromEvent(document.body, 'click');
var example = source.switchMap(e => Rx.Observable.interval(100).take(3));
example.subscribe(...);
```
```
source : -----------c--c-----------------...
        concatMap(c => Rx.Observable.interval(100).take(3))
example: -------------0--0-1-2-----------...
```

#### Filtering Operators
- `filter`: 过滤值
```js
var source = Rx.Observable.interval(1000);
var newest = source.filter(x => x % 2 === 0); 
```
```
source: -----0-----1-----2-----3-----4-...
            filter(x => x % 2 === 0)
newest: -----0-----------2-----------4-...
```

- `take`: 获取 `Observable` 对象发出的前n项值，取完结束。
```js
var source = Rx.Observable.interval(1000);
var example = source.take(3);
```
```
source : -----0-----1-----2-----3--..
                take(3)
example: -----0-----1-----2|
```

- `first`: 获取 `Observable` 对象发出的第一个元素，取完结束。
```js
var source = Rx.Observable.interval(1000);
var example = source.first();
```
```
source : -----0-----1-----2-----3--..
                first()
example: -----0|
```

- `takeUntil`: 当 `takeUntil` 传入的 `notifier` 发出值时，源 `Observable` 对象就会直接进入完成状态
```js
var source = Rx.Observable.interval(1000);
var click = Rx.Observable.fromEvent(document.body, 'click');
var example = source.takeUntil(click);
```
```
source : -----0-----1-----2------3--
click  : ----------------------c----
                takeUntil(click)
example: -----0-----1-----2----|
```

- `skip`: 跳过 源`Observable`的前n项，并返回新的`Observable`对象
```js
var source = Rx.Observable.interval(1000);
var example = source.skip(3);
```
```
source : ----0----1----2----3----4----5--....
                    skip(3)
example: -------------------3----4----5--...
```

- `takeLast`: 获取 源`Observable`发出的后n项
```js
var source = Rx.Observable.interval(1000).take(6);
var example = source.takeLast(2);
```
```
source : ----0----1----2----3----4----5|
                takeLast(2)
example: ------------------------------(45)|
```

- `last`: 获取 源`Observable`发出的最后一项
```js
var source = Rx.Observable.interval(1000).take(6);
var example = source.last();
```
```
source : ----0----1----2----3----4----5|
                    last()
example: ------------------------------(5)|
```

- `debounceTime`: 在设定的时间跨度内，若源 `Observable` 对象没有再发出新值，则返回最近一次发出的值
```js
var source = Rx.Observable.interval(300).take(5);
var example = source.debounceTime(1000);
```
```
source : --0--1--2--3--4|
        debounceTime(1000)
example: --------------4| 
```

- `throttleTime`: 节流，从 源`Observable`对象发出的第一个值开始，忽略等待时间内发出的值
```js
var source = Rx.Observable.interval(300).take(5);
var example = source.throttleTime(1000);
```
```
source : --0--1--2--3--4|
        throttleTime(1000)
example: --0------------4|  
```

- `distinct`: 去重
```js
var source = Rx.Observable.from(['a', 'b', 'c', 'a', 'b'])
var example = source.distinct()
```
```
source : --a--b--c--a--b|
            distinct()
example: --a--b--c------|
```

- `distinctUntilChanged`: 过滤 `Observable`发出的值，若当前值与上一次值不一致，则发出该值。
```js
var source = Rx.Observable.from(['a', 'b', 'c', 'c', 'b'])
var example = source.distinctUntilChanged()
```
```
source : --a--b--c--c--b|
            distinctUntilChanged()
example: --a--b--c-----b|
```
#### `Combination Operators`

- `concat`: 合并多个`Observable`对象，并依次执行
```js
var source = Rx.Observable.interval(1000).take(3);
var source2 = Rx.Observable.of(3)
var source3 = Rx.Observable.of(4,5,6)
var example = source.concat(source2, source3);
```
```
source : ----0----1----2|
source2: (3)|
source3: (456)|
            concat()
example: ----0----1----2(3456)|
```

- `concatAll`: 合并多个`Observable`对象，并在上一个`Obs`完成订阅后订阅下一个`Obs`
```js
var obs1 = Rx.Observable.interval(1000).take(5);
var obs2 = Rx.Observable.interval(500).take(2);
var obs3 = Rx.Observable.interval(2000).take(1);
var source = Rx.Observable.of(obs1, obs2, obs3);
var example = source.concatAll();
```
```
source : (o1                 o2      o3)|
           \                  \       \
            --0--1--2--3--4|   -0-1|   ----0|               
                concatAll()        
example: --0--1--2--3--4-0-1----0|
```

- `startWith`: 在开始发出`Obs`对象的数据之前发出已经设置的参数
```js
var source = Rx.Observable.interval(1000);
var example = source.startWith(222);
```
```
source : ----0----1----2----3--...
                startWith(222)
example: (222)----0----1----2----3--...
```

- `merage`: 合并 `Obs`对象，并按给定的时序发出对应值
```js
var source = Rx.Observable.interval(500).take(3);
var source2 = Rx.Observable.interval(300).take(6);
var example = source.merge(source2);
```
```
source : ----0----1----2|
source2: --0--1--2--3--4--5|
            merge()
example: --0-01--21-3--(24)--5|
```

- `merageAll`: 将高阶`Obs`转换为一阶`Obs`，并同时处理所有`Obs`
```js
var click = Rx.Observable.fromEvent(document.body, 'click');
var source = click.map(e => Rx.Observable.interval(1000));
var example = source.mergeAll();
```
```
click  : ---------c-c------------------c--.. 
        map(e => Rx.Observable.interval(1000))
source : ---------o-o------------------o--..
                   \ \                  \----0----1--...
                    \ ----0----1----2----3----4--...
                     ----0----1----2----3----4--...
                     mergeAll()
example: ----------------00---11---22---33---(04)4--...
```

- `combineLatest`: 合并输入的`Obs`对象，当源`Obs`和其他`Obs`都发出值后，才会调用`project`函数
```js
var source = Rx.Observable.interval(500).take(3);
var newest = Rx.Observable.interval(300).take(6);
var example = source.combineLatest(newest, (x, y) => x + y);
```
```
source : ----0----1----2|
newest : --0--1--2--3--4--5|
    combineLatest(newest, (x, y) => x + y);
example: ----01--23-4--(56)--7|
```

- `zip`: 根据所有的`Obs`对象的输入顺序，产生一个新`Obs`
```js
var source = Rx.Observable.interval(500).take(3);
var newest = Rx.Observable.interval(300).take(6);
var example = source.zip(newest, (x, y) => x + y);
```
```
source : ----0----1----2|
newest : --0--1--2--3--4--5|
    zip(newest, (x, y) => x + y)
example: ----0----2----4|
```

- `withLatestFrom`: 当源`Obs`发出新值时，根据`project`函数，合并其他`Obs`之前发出的最新值
```js
var main = Rx.Observable.from('hello').zip(Rx.Observable.interval(500), 
    (x, y) => x);
var some = Rx.Observable.from([0,1,0,0,0,1]).zip(Rx.Observable.interval(300), 
    (x, y) => x);
var example = main.withLatestFrom(some, (x, y) => {
    return y === 1 ? x.toUpperCase() : x;
});
```
```
main   : ----h----e----l----l----o|
some   : --0--1--0--0--0--1|
withLatestFrom(some, (x, y) =>  y === 1 ? x.toUpperCase() : x);
example: ----h----e----l----L----O|
```

- `switch`: 切换为最新的`Obs`数据源，并退订之前的`Obs`
```js
var click = Rx.Observable.fromEvent(document.body, 'click');
var source = click.map(e => Rx.Observable.interval(1000));
var example = source.switch();
```
```
click  : ---------c-c------------------c--.. 
        map(e => Rx.Observable.interval(1000))
source : ---------o-o------------------o--..
                   \ \                  \----0----1--...
                    \ ----0----1----2----3----4--...
                     ----0----1----2----3----4--...
                     switch()
example: -----------------0----1----2--------0----1--...
```

#### `Utility Operators`
- `delay`: 延迟源`Obs`发出的第一个元素的时间点
```js
var source = Rx.Observable.interval(300).take(5);
var example = source.delay(500);
```
```
source : --0--1--2--3--4|
        delay(500)
example: -------0--1--2--3--4|
```

- `delayWhen`: `delayWhen` 会响每个元素，调用的时候需要设置 `delayDurationSelector` 函数，该函数的返回值是 `Observable` 对象
```js
var source = Rx.Observable.interval(300).take(5);
var example = source.delayWhen( x => Rx.Observable.interval(100 * x).take(1));
```
```
source : --0--1--2--3--4|
    .delayWhen(x => Rx.Observable.interval(100 * x).take(1));
example: --0---1----2-----3------4|
```

#### `Multicasting Operators`
- `multicast`: 用于挂载`Subject`，并返回一个可链接的`Obs`对象
```js
var source = Rx.Observable.interval(1000)
             .take(3)
             .multicast(new Rx.Subject());
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
};
var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
};
source.subscribe(observerA); // subject.subscribe(observerA)
source.connect(); // source.subscribe(subject)
setTimeout(() => {
    source.subscribe(observerB); // subject.subscribe(observerA)
}, 1000);
```
- `refCount`: 使 `multicast Observalbe`可以在第一个`subscriber`到达时自动执行，并在最后一个`subscriber`离开时结束。
`refCount()`存在于`ConnectableObservable`上，并返回一个新的`Observalbe`
```js
var source = Rx.Observable.interval(1000)
             .do(x => console.log('send: ' + x))
             .multicast(new Rx.Subject())
             .refCount();
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
};
var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}
var subscriptionA = source.subscribe(observerA);
// 订阅数 0 => 1
var subscriptionB;
setTimeout(() => {
    subscriptionB = source.subscribe(observerB);
    // 订阅数 1 => 2
}, 1000);
setTimeout(() => {
    subscriptionA.unsubscribe(); // 订阅数 2 => 1
    subscriptionB.unsubscribe(); // 订阅数 1 => 0，source 停止发送元素
}, 5000);
```

- `publish`: 用于挂载 `Subject` 对象，并返回一个可链接 (connectable) 的 `Obs`, `publish` `multicast(new Rx.Subject())` 等价
```js
var source = Rx.Observable.interval(1000)
             .publish() 
             .refCount();        
var source = Rx.Observable.interval(1000)
             .multicast(new Rx.Subject()) 
             .refCount();
```
- `publishReplay`
```js
var source = Rx.Observable.interval(1000)
             .publishReplay(1) 
             .refCount();          
var source = Rx.Observable.interval(1000)
            .multicast(new Rx.ReplaySubject(1)) 
            .refCount();
```

- `publishBehavior`
```js
var source = Rx.Observable.interval(1000)
             .publishBehavior(0) 
             .refCount();           
var source = Rx.Observable.interval(1000)
             .multicast(new Rx.BehaviorSubject(0)) 
             .refCount();
```

- `publishLast`
```js
var source = Rx.Observable.interval(1000)
             .publishLast() 
             .refCount();          
var source = Rx.Observable.interval(1000)
             .multicast(new Rx.AsyncSubject(1)) 
             .refCount();
```

- `share`: `publish` + `refCount` 的简写
```js
var source = Rx.Observable.interval(1000)
             .share();          
var source = Rx.Observable.interval(1000)
             .publish()
             .refCount();
var source = Rx.Observable.interval(1000)
             .multicast(new Rx.Subject()) 
             .refCount();
```

#### `Error Handling Operators`
- `catch`: 捕获异常，同时返回一个 `Obs`，用于发出新的值
```js
var source = Rx.Observable.from(['a','b','c','d',2])
               .zip(Rx.Observable.interval(500), (x,y) => x);
var example = source.map(x => x.toUpperCase())
                    .catch(error => Rx.Observable.of('h'));
```
```
source : ----a----b----c----d----2|
        map(x => x.toUpperCase())
         ----a----b----c----d----X|
        catch(error => Rx.Observable.of('h'))
example: ----A----B----C----D----h|
```
- `retry`: 发生错误后，重试 `count` 次数
```js
var source = Rx.Observable.from(['a','b','c','d',2])
               .zip(Rx.Observable.interval(500), (x,y) => x);
var example = source.map(x => x.toUpperCase())
                    .retry(1);
```
```
source : ----a----b----c----d----2|
        map(x => x.toUpperCase())
         ----a----b----c----d----X|
                retry(1)
example: ----A----B----C----D--------A----B----C----D----X|
```

- `retryWhen`: 捕获异常 `Obs`, 处理后可以重新订阅源`Obs`
```js
var source = Rx.Observable.from(['a','b','c','d',2])
               .zip(Rx.Observable.interval(500), (x,y) => x);
var example = source.map(x => x.toUpperCase())
                    .retryWhen(errorObs => errorObs.delay(1000));
```
```
source : ----a----b----c----d----2|
        map(x => x.toUpperCase())
         ----a----b----c----d----X|
        retryWhen(errorObs => errorObs.delay(1000))
example: ----A----B----C----D-------------------A----B----C----D----...
```

### Subject
 - `Subject`: 继承于`Observable`的 `Observer Pattern` 的实例
`Subject` 既是 `Observable` 又是 `Observer`
`Subject` 会对內部的 `observers` 列表进行组播(multicast)

```js
var subject = new Rx.Subject();
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}
var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}
subject.subscribe(observerA);
subject.subscribe(observerB);
subject.next(1);
// "A next: 1"
// "B next: 1"
subject.next(2);
// "A next: 2"
// "B next: 2"
```
- `BehaviorSubject`: 会记住最新一次推送的元素，并把该元素当做当前值推送（建立时需给定状态）
```js
var subject = new Rx.BehaviorSubject(0); // 0 為起始值
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}
var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}
subject.subscribe(observerA);
// "A next: 0"
subject.next(1);
// "A next: 1"
subject.next(2);
// "A next: 2"
subject.next(3);
// "A next: 3"
setTimeout(() => {
    subject.subscribe(observerB); 
    // "B next: 3"
},3000)
```

- `ReplaySubject`: 在新订阅后重新发送最后几个元素
```js
var subject = new Rx.ReplaySubject(2); // 重複發送最後 2 個元素
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}
var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}
subject.subscribe(observerA);
subject.next(1);
// "A next: 1"
subject.next(2);
// "A next: 2"
subject.next(3);
// "A next: 3"
setTimeout(() => {
    subject.subscribe(observerB);
    // "B next: 2"
    // "B next: 3"
},3000)
```

- `AsyncSubject`: 在`subject`结束后送出最后一个值并结束
```js
var subject = new Rx.AsyncSubject();
var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}
var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}
subject.subscribe(observerA);
subject.next(1);
subject.next(2);
subject.next(3);
subject.complete();
// "A next: 3"
// "A complete!"
setTimeout(() => {
    subject.subscribe(observerB);
    // "B next: 3"
    // "B complete!"
},3000)
```


### Observer
 - `next`: 当Observable推送新值时调用
 - `complete`: 当Observable所有值调用完毕之后，调用后next将不再起作用
 - `error`: 报错时
```js
var observer = {
	next: function(value) {
		console.log(value);
	},
	error: function(error) {
		console.log(error)
	},
	complete: function() {
		console.log('complete')
	}
}
//  使用之前定义的观察者来订阅
observable.subscribe(observer)
// Jerry
// Anna
// complete
```


### Scheduler
- 数据结构，知道如何根据优先级或其他标准来执行并列任务
- 执行环境，知道事件何时何处执行
- 虚拟时钟，可以让事件在特定时间执行
