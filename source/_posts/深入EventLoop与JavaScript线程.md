---
title: 深入EventLoop与JavaScript线程
date: 2018-01-22 11:09:24
tags: 
  - JavaScript
  - EventLoop
---

## 栈，队列，堆
![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)
### 栈
函数的调用会形成一个栈帧
```js
function foo(a) {
  return a+1;
}
function bar(b) {
  return foo(b+2);
}
console.log(bar(8));
```
1.当调用函数`bar`时创建了第一个帧, `bar帧`中含有`bar`函数的参数和变量  [bar帧] 
2.当在函数`bar`中调用函数`foo`时，会在当前栈中压入新的`foo帧`         [bar帧， foo帧]
3.当函数`foo`执行完毕后，当前栈会自动弹出`foo帧`                     [bar帧]
4.当函数`bar`执行完毕后，当前栈会自动弹出`bar帧`，此时函数执行完毕      [ ]

### 堆
对象被分配在一个堆中，即用以表示一个大部分非结构化的内存区域

### 队列
一个 `JavaScript` 运行时包含了一个待处理的消息队列
每一个`消息`都与一个`函数`相关联
当栈拥有足够内存时，从队列中取出一个`消息`进行处理
这个处理过程包含了调用与这个消息相关联的函数（以及因而创建了一个初始堆栈帧)
当栈再次为空的时候，也就意味着消息处理结束

## 异步
1. 主线程发起一个异步请求，相应的工作线程接收请求并开始执行。
2. 此时主线程可以继续执行后面的代码，工作线程执行异步任务。
3. 工作线程完成异步任务后，通知主线程并返回相应结果。
4. 主线程收到通知后，执行异步请求的回调函数。

## 事件循环

### JavaScript的单线程
H5中的`webWorker`标准中，允许`JavaScript`创建多个完全受主线程控制的子线程，且子线程不能操控`DOM`。
主线程：负责解释和执行JavaScript代码
工作线程：处理AJAX请求的线程、处理DOM事件的线程、定时器线程、读写文件的线程



- MacroTasks: setTimeout, setInterval, setImmediate, I/O, UI渲染， 用户产生的事件(点击/滚动)
- MicroTasks: Promise, process.nextTick, Object.observe, MutationObserver


> 浏览器中， 一个事件循环(EventLoop)中会有一个正在执行的任务(Task)，而这个任务就是从 `MacroTask` 队列中来的
> 当这个 `MacroTask` 执行结束后所有可用的 `MicroTask` 将会在同一个事件循环中执行
> 当这些 `MicroTask` 执行结束后还能继续添加 `MicroTask` 一直到整个 `MicroTask` 队列执行结束

> node中， V8引擎解析JavaScript脚本
> 解析后的代码，调用Node API
> libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎
> V8引擎再将结果返回给用户


简单地说, `MicroTasks`会在当前循环中完成，而`MacroTasks`会在下一个循环开始完成。


### SetTimeout
指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行
它在任务队列的尾部添加一个`MacroTask`事件，因此要等到同步任务和任务队列现有的事件都处理完，才会得到执行
也就是在下一个循环开始之前完成。
```js
console.log(0);
setTimeout(function() {
  console.log(1);
}, 0);
... // 执行大量同步代码
```
此时, `setTimeout`会在大量同步代码执行完毕后执行。而这个等待时间是不确定的。

### process.nextTick
在当前的执行栈中添加一个`MicroTask`事件(下一个循环开始之前)
也就是说，`process.nextTick`总发生在所有异步事件之前
并且不论`process.nextTick`嵌套多少层，都会发生在异步之前

### setImmediate
在当前任务队列的尾部添加事件，也就是在下一次循环执行时执行

> 然而？？？ setImmediate 和 setTimeout 的执行顺序是不确定的，有待商榷...
