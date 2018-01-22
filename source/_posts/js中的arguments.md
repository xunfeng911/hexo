---
title: js中的arguments
date: 2016-12-09 15:42:27
tags:
  - javascript
---
开始复习javascript的一些基础。

<!--more-->
# argument
  是当前函数的一个内置属性，在函数代码中，使用特殊对象 arguments，开发者无需明确指出参数名，就能访问它们。

- 无需明确参数即可重写函数
- 可检测调用参数的个数
- arguments对象的长度是由实参个数而不是形参个数决定的，没有调用的参数不能被获取
```js
		var arr= function(a,b,c){
			 a+=5;
			 b+=1;
			 console.log(arguments[0]);					//输出 10
			 console.log(arguments[1]);					//输出undefined	
			 console.log(arguments);					   //输出[10]				
			 console.log(arguments.length);				//输出1
		};
		arr(5);
```
- 函数重载：函数返回值不同或形参个数不同。
js的函数声明没有返回值类型
JavaScript中形参的个数严格意义上来讲只是为了方便在函数中的变量操作，实际上实参已经存储在arguments对象中了
用 arguments 对象判断传递给函数的参数个数，即可模拟函数重载
```js
		var arr= function(a,b,c){
			if(arguments.length==1){
				console.log(arguments[0]+1);
			}
			else if(arguments.length>1){
				for(var i=0;i<arguments.length;i++){
					console.log(i+":"+arguments[i]);
				}
			}
		};
		arr(5);        //输出6
		arr(5,6,7);  //输出0：5，1：6，2：7
```
- arguments.callee
返回此arguments对象所在的当前函数引用,递归中代替函数本身
```js
		var arr= function(a){
			if(a==1){
				return 1;
			}
			else {
				return  a + arguments.callee(--a);
			}
	};
		b=arr(6);
		console.log(b); //输出21
```