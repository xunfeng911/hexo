---
title: JavaScript实例应用
date: 2017-04-07 09:20:36
tags:
  - JavaScript
---

记笔记！记笔记！记笔记！
<!--more-->


### JavaScript实例应用

#### JavaScript基本模块

##### 从字符串中总提取一个列表
```
var test = `This is a list of items: right, left, top, bottom.`
var start = test.indexOf(':')
var end = test.indexOf('.', start+1)
var testStr = test.substring(start+1, end).split(',')
```
