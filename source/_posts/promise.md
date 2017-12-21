---
title: promise
date: 2017-12-03 23:06:16
tags:
---

## Promise——处理异步操作

### 介绍
- 对象的状态不受外界影响
  - `pending` 准备中
  - `fulfilled` 已成功
  - `rejected`  已失败
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果
  - `pending` => `rejected`
  - `pending` => `fulfilled`

- 缺点
  - 建立后立即执行，无法取消
  - 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
  - 当处于pending状态时，无法得知目前进展到哪一个阶段

### 使用
接收一个包含resolve与reject参数的函数作为参数
- `reslove`: `pending` => `fulfilled`
- `reject`: `pending` => `rejected`
```js
const myFirstPromise = new Promise((resolve, reject) => {
  // ?异步操作，最终调用:
  //
    resolve(someValue); // fulfilled
  // ?或
    reject("failure reason"); // rejected
});

// 用.then指定回调函数


  // 异步加载图片
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```
### Promise.prototype.then
then() 方法返回一个Promise，它最多需要有两个参数：Promise 的成功和失败情况的回调函数。
```js
p.then(value => {
  // fulfilled
},error => {
  // rejected
})
//  最后返回Promise对象
```

### Promise.prototype.catch
catch() 方法返回一个Promise，只处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。

### Promise.all
当所有给定的可迭代完成时执行resolve，或者任何promises失败时执行reject。
```js
let p1 = Promise.resolve(3);
let p2 = 1337;
let p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
}); 

Promise.all([p1, p2, p3]).then(values => { 
    console.log(values); 
    // [3, 1337, "foo"] 
});
```

### Promise.race
race函数返回一个Promise，它将与第一个传递的promise相同的完成方式被完成。它可以是完成resolves，也可以是失败rejects，这要取决于第一个完成的方式是两个中的哪个。

### Promise.reject(reason)
静态函数Promise.reject返回一个被拒绝的Promise。使用是Error实例的reason对调试和选择性错误捕捉很有帮助

### Promise.resolve(value)
静态方法 Promise.resolve返回一个promise对象，这个promise对象是被解析后（resolved）的。

## 实现原理
```js
function xPromise(fn) {
  // 安全验证
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._status = 'pending'; // 初始状态
  this._value = null;   // promise执行结果
  this._deferreds = []; // then中的回调函数

  try
}