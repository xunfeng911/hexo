---
title: Currying in JavaScript
date: 2017-12-20 14:26:08
tags:
  - JavaScript
---
<!--more-->

## Curring in JavaScript
柯里化是一个转换过程：把接受多个参数的函数转换成接受单一参数的函数
如果其他参数也是必要的，则返回接受余下的参数且返回结果的新函数
是一个使函数理解并处理部分应用的过程
原理：预先将某些参数传入，得到一个简单的函数。而这些预先传入的参数保存在闭包中。

现在我们有这样一个函数，接受三个参数
```js
function add (num1, num2, num3) {
  return num1 + num2 + num3;
}
```

### 把函数`add`柯里化
```js
var curryAdd = curry(add);
  // return function(num1, num2, num3)
var curryAddOne = curryAdd(1);
  // return function(num2, num3)
var curryAddTwo = curryAddOne(2);
  // return function(num3)
var curryAddThree = curryAddTwo(3);
  // return 6
```

### 手动柯里化
手动柯里化只需要我们在当前的函数中`return`新的函数

```js
function add (num1) {
  return function (num2) {
    return function (num3) {
      // doing somethings with num1, num2, num3
      return  num1 + num2 + num3;
    }
  }
}
```

### 辅助用的curry函数

```js
function curry (fn) {
  var slice = Array.proptype.slice,
      stored_args = slice.call(arguments, 1);
  return function () {
    var new_args = slice.call(arguments),
        args = stored_args.concat(new_args);
    return fn.apply(null, args);
  }
}

function curry(fn) {
  var  _argLen = fn.length

  function wrap() {
    var _args = [].slice.call(arguments)
    function act() {
      _args = _args.concat([].slice.call(arguments))
      if(_args.length === _argLen) {
        return fn.apply(null, _args)
      }
      return arguments.callee
      }
    if(_args.length === _argLen) {
      return fn.apply(null, _args)
    }

    act.toString = function() {
      return fn.toString()
    }
    return act
  }

  return wrap
}

```