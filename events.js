// function xPromise(fn) {
//   // 安全验证
//   if (typeof this !== 'object') {
//     throw new TypeError('Promises must be constructed via new');
//   }
//   if (typeof fn !== 'function') {
//     throw new TypeError('Promise constructor\'s argument is not a function');
//   }
//   this._status = 'pending'; // 初始状态
//   this._value = null;   // promise执行结果
//   this._deferreds = []; // then中的回调函数

//   try {
//     fn(function (value) {
//       resolve(this, value);
//     }, function (reason) {
//       reject(this, reason);
//     });
//   } catch (err) {
//     reject(this, err);
//   }
// }

// xPromise.prototype.then = function (onResolved, onRejected) {
//   var res = new xPromise(function () { });
//   var deferred = new Handler(onResolved, onRejected, res);

//   // pending的话订阅延时处理函数
//   if (this._status === 'pending') {
//     this._deferreds.push(deferred);
//     return;
//   }

//   handleResolved(this, deferred);
  
//   // 返回Promise对象保证链式调用
//   return res;
// }

// // 封装生成
// function Handler(onResolved, onRejected, promise) {
//   this.onResolved = typeof onResolved === 'function' ? onResolved : null;
//   this.onRejected = typeof onRejected === 'function' ? onRejected : null;
//   this.promise = promise;
// }
function curry(fn) {
  console.log('args', arguments);
  var slice = Array.prototype.slice,
      stored_args = slice.call(arguments, 1);
  return function () {
    var new_args = slice.call(arguments),
      args = stored_args.concat(new_args);
    console.log(args);
    return fn.apply(null, args);
  }
}

function add (num1, num2, num3) {
  return num1 + num2 + num3;
}

const curriedAdd = curry(add);
console.log(curriedAdd);
console.log('a');
console.log(curriedAdd(1,2,3));