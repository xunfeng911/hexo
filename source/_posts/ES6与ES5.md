---
title: ES6的学习（一）
date: 2017-02-18 22:03:07
tags:
  - javascript
  - ES6
  - ES5
---

关于ES6的学习
<!--more-->

### ES5 => ES6
---
##### 箭头函数
- 与函数表达式相比，箭头函数有更短的语法。

```js
	function (i) { return i * 2} //ES5
	(i) => i * 2	//ES6
```
复杂时需要`{}`包裹
```js
	function (i, j) {
		i++
		j++
		return i + j
	}  // ES5
	(i, j) => {i++, j++, return i + j} // ES6
```
- 箭头函数没有自身的this，从外层继承this。
- 箭头函数通常是匿名的。


 ##### 块级作用域
 - ES5中只有全局作用域与函数作用域,因此内层变量将会覆盖外层变量
 - let 提供块级作用域,let命名的变量只在当前块内起作用
 - const 声明的是常量，不可更改

```js
  var a = 1
  var b = 2
  var c = 3
  if (true) {
    var a = 10  // 函数作用域
    let b = 20  // if块内的作用域
        c = 30  // es5解决方法
    console.log('a:' + a)
    console.log('b:' + b)
    console.log('c:' + c)
  }
  console.log('a:' + a)
  console.log('b:' + b)
  console.log('c:' + c)
```
var声明的变量在循环时新值会覆盖旧值，导致输出的变量都为最终值
```js
var a = []
for (var i = 0; i < 9; i++) {
  a[i] = function () {
		console.log(i)
	}
}
a[2](); // 9
```
ES5中利用闭包解决这一问题
```js
function test (index) {
		var testback = function () {
			console.log(index)
		}
		return testback
}
var a = []
for (var i = 0; i < 9; i++) {
  a[i] = test(i)
}
a[2]()
```
ES6中仅仅使用let即可解决
```js
var a = []
for (let i = 0; i < 9; i++) {
  a[i] = function () {
		console.log(i)
	}
}
a[2](); // 2
```
const声明常量
```js
const a = 1
a = 10
console.log(a)
```

##### 模版字符串
- ES5中，当需要插入大量html文档时需要引用template插件或是用大量‘+’连接
- 模版字符串可直接用'``'标识起始
- 模板字符串可以包含嵌入式表达式,对象字面量,甚至是函数

```js
var myName = 'xunfeng'
console.log(`your name is ${myName}`) // your name is xunfeng

var people = {
  name: 'xunfeng',
  age: 20
}
console.log(`your name is ${people.name}, your age is ${people.age}`)
// your name is xunfeng, your age is 20

function fn () {
  return 'function'
}
console.log(`可以嵌套函数：${fn()}`)
```
- 模板字符串可以在表达式内进行数学运算

```js
var a = 10
var b = 20
console.log(`a+b=${a+b}`) //a+b=30
```
- 模板字符串内保留空格，不需要换行符即可换行

```js
console.log(`第一行
第二行`)
// 第一行
// 第二行
```

#####  数值扩展 Numeric Literals
- 支持二进制(0b)和八进制(0o)新写法

```js
0b111110111 === 503 // true
0o767 === 503 // true

将二进制或八进制转换成十进制
Number('0b111')  // 7
Number('0o10')  // 8
```
- 新的方法

```js
Number.isFinite() // 检查一个数值是否为有限
Number.isNaN()  // 检查一个数值是否为NaN
Number.isInteger()  // 检查一个数值是否为整数
Number.EPSILON  // 极小的常量，设定的误差范围
```
- Math对象的扩展

```js
Math.trunc()  // 去除一个数的小数部分，返回整数部分
Math.sign() // 判断一个数到底是正数、负数、还是零
Math.cbrt() // 用于计算一个数的立方根
Math.hypot() // 返回所有参数的平方和的平方根
Math.expm1() // Math.expm1(x)返回ex - 1，即Math.exp(x) - 1
Math.log1p() // Math.log1p(x)方法返回1 + x的自然对数
Math.log10() // Math.log10(x)返回以10为底的x的对数
Math.log2() // Math.log2(x)返回以2为底的x的对数
Math.sinh(x) // 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x) // 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x) // 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x) // 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x) // 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x) // 返回x的反双曲正切（inverse hyperbolic tangent）
```
- 指数运算符 **

```js
console.log(2 ** 3) // 8
```

##### 对象部分扩展
- 变量和函数可直接作为对象的属性和方法

```js
<!-- ES6 -->
var object = {
  value: 42,
  toString() {
    return this.value
  }
}
console.log(object.toString() === 42) // true

<!-- ES5 -->
var object = {
  value: 42,
  toString: function toString() {
    return this.value
  }
}

console.log(object.toString() === 42) // true
```
- 计算属性名可以用变量当做对象的属性名

```js
var computed = 'calc'
var comFn = {
  [computed + 'xun']: 'hi',
  [computed + 'feng']: 'hello'
}
console.log(comFn['calcxun']) // hi
console.log(comFn['calcfeng']) // hello
```

##### 解构
- 允许从数组或对象中提取数据并对变量赋值

```js
var a = 1
var b = 2
var c = {a, b}
console.log(c) // {a: 1, b: 2}

var c = {a: 1, b: 2}
var {a, b} = c
console.log(a, b) // 1 2
```

##### 默认参数 default
- ES6可以指定默认参数在arguments中

```js
function myFn(mes = 'hello') {
  console.log(mes)
}
myFn(); // hello
myFn('hi'); // hi
```

##### 其他参数 rest
- 允许将部分参数作为一个单独的数组

```js
function myFn(a, ...b) {
  var result = a
   for(let i = 0; i<b.length; i++) {
     result += b[i]
   }
   return result
}
console.log(myFn(1,2,3,4)) // 10
```

##### 迭代器 iterators && for of
- 可以直接遍历容器的内容

```js
var a=['x', 'y', 'z']
for (let i of a){
  console.log(i)  // x y z
}
```

##### 类 classes
- constructor(构造方法)
创建实例对象时设定的属性
- extends(继承)
class之间可以通过extends相互继承，相比于原形链更简洁易懂
- super
  在子类constructor中调用父类的constructor
- getter && setter
在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
- static 静态方法
不会被实例对象继承，只能通过类或类继承来调用

```js
class student {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName () {
    console.log(this.name)
  }
  get myAge() {
    return this.age
  }
  set myAge(value) {
    this._age = value
  }
  static bar() {
    console.log('static')
  }
}
// 创建实例对象
var xun = new student('xun', 20)
xun.getName() // xun
xun.bar() // TypeError: xun.bar is not a function. (In 'xun.bar()', 'xun.bar' is undefined)
student.bar() // static
// 继承
class Tom extends student {
  constructor(name, age, sex) {
    super(name, age)
    this.sex = sex
  }
}
var tom = new Tom('tom', 20, 'man')
console.log(tom)  // 实例对象属性
tom.myAge = 22
console.log(tom._age) // 22
console.log(tom.myAge) // 20
```

##### 模块 modules
- export 暴露对外接口
- import 导入其他模块接口

```js
<!-- export.js -->
//命名导出
export var foo = ...
export let bar = ...
export const MY_CONST = ...

export function myFunc() {
   ...
}
export function* myGeneratorFunc() {
   ...
}
export class MyClass {
   ...
}
// default 导出
export default 123
export default function (x) {
   return x
}
export default x => x;
export default class {
   constructor(x, y) {
       this.x = x
       this.y = y
   }
};
//也可以自己列出所有导出内容
const MY_CONST = ...
function myFunc() {
   ...
}

export { MY_CONST, myFunc }
//或者在导出的时候给他们改个名字
export { MY_CONST as THE_CONST, myFunc as theFunc }

//还可以导出从其他地方导入的模块
export * from 'src/other_module'
export { foo, bar } from 'src/other_module'
export { foo as myFoo, bar } from 'src/other_module'

<!-- import.js -->

// Default exports and named exports
import theDefault, { named1, named2 } from 'src/mylib'
import theDefault from 'src/mylib'
import { named1, named2 } from 'src/mylib'

// Renaming: import named1 as myNamed1
import { named1 as myNamed1, named2 } from 'src/mylib'

// Importing the module as an object
// (with one property per named export)
import * as mylib from 'src/mylib'

// Only load the module, don’t import anything
import 'src/mylib'
```

##### 参考链接
[30分钟掌握ES6/ES2015核心内容](http://www.jianshu.com/p/ebfeb687eb70)
[ECMAScript 6 入门](http://es6.ruanyifeng.com/?search=Spread&x=0&y=0)
[ ECMAScript 6 equivalents in ES5](https://github.com/addyosmani/es6-equivalents-in-es5/blob/master/README.md#classes)
