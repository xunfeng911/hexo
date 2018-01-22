---
title: cssWorld
date: 2017-12-30 23:18:47
tags:
---
<!--more-->

## CSS World

### content计数器
使用CSS代码实现随着元素数目增多，数值也跟着改变的效果。
- `counter-reset` 计数器重置
```css
counter-reset: counter 1; // 初始值为1，名为counter
counter-reset: inherit; // 继承累加
```
作用：起名并且设置初始值。
- `counter-increment` 计数器递增
作用：修改递增规则
```css
counter-increment: counter 2; // counter递增规则为2
```
- `counter()/counters()`
作用：显示计数，并可选设置计数类型。后者可嵌套计数。
```css
content: counter(name, style);  // style为list-style-type的类型
list-style-type: dis | circle | square ...
content: counters(name ,string, style); // string是连接符
```

- demo
```css
.reset {
  counter-reset: feng;
}
.counter::before {
  content: counters(feng, '-');
  counter-increment: feng;
}
```
```html
<div class="reset">
  <div class="counter">我是王小二
    <div class="reset">
      <div class="counter">我是王小二的大儿子</div>
        <div class="counter">我是王小二的二儿子
          <div class="reset">
            <div class="counter">我是王小二的二儿子的大孙子</div>
            <div class="counter">我是王小二的二儿子的二孙子</div>
            <div class="counter">我是王小二的二儿子的小孙子</div>
          </div>
        </div>
      <div class="counter">我是王小二的三儿子</div>
    </div>
</div>
<div class="counter">我是王小三</div>
<div class="counter">我是王小四
    <div class="reset">
      <div class="counter">我是王小四的大儿子</div>
    </div>
  </div>
</div>
```