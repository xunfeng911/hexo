---
title: less-study
date: 2018-01-23 12:18:13
tags:
---


<!--more-->

## Less

### Variables (变量)
变量将同类重复的值提取出来，让我们更方便的控制更改这些值，使代码更易于维护。

####  用于属性
```less
@variable: #bbb;
#test {
  color: @variable;
}
// 编译后
#test {
  color: #bbb;
}
```

####  用于选择器
```less
@selector: xunfeng;
.@{selector} {  };
// 编译后
.xunfeng { };
```

#### URLs
```less
@image: "../img";

.xunfeng {
  background: url("@{image}/img.png")
}
```

#### Import 模块引入
```less
 @themes: "../../scr/themes";
 
 @import "@{themes}/default.less";
```

#### Property 属性名变量
```less
@property: color;

.xunfeng {
  @{property}: #bbb;
  background-@{property}: #666;
}
```
#### 变量名指针？
```less
@test："m m m m m";
@var: "test";
content: @@var;
// 编译后
content: "m m m m m";
```

#### Lazy Loading（我理解意思就是变量提升？）
```less
// 方法1
.lazy-eval-scope {
  width: @var;
}

@var: @a;
@a: 9%;
// 方法2
.lazy-eval-scope {
  width: @var;
  @a: 9%;
}

@var: @a;
@a: 100%;
//都会编译为
.lazy-eval-scope {
  width: 9%;
}
```
### Extend (继承)

```less
ul {
  &:extend(.class);
  color: red;
}
.calss {
  font-size: 16px;
}
// 编译后
ul {
  font-size:16px;
  color: red;
}
.class {
  color: red;
}

// 一致效果
.a:extend(.b) { }
.a { &:extend(.b); }
.c:extend(.d all) {
  // 继承所有与.d有关的属性  例如： .d .f、 .f .d
}
// 一次继承多个
.d:extend(.f, .g) { }
.d:extend(.f):extend(.g) { }
```
- 可以继承嵌套选择器中的属性
```less
.bucket {
  tr { 
    color: blue;
  }
}
.some-class:extend(.bucket tr) {}
// 编译后
.bucket tr,
.some-class {
  color: blue;
}

.bucket {
  tr & { 
    color: blue;
  }
}
.some-class:extend(tr .bucket) {}
// 编译后
tr .bucket,
.some-class {
  color: blue;
}
```
- 必须要精确匹配
- 通配符*对继承也有影响
- 选择器顺序也需要一致
- `1n`与`n`在继承中不被匹配
- 引用类 `[title=test]`, `[title='test']`, `[title="test"]` 表现一致
- `all` 匹配全部
- `@media`控制范围
- 简化写法
```less
.easyclass() {
  display: inline-block;
  font-size: 14px;
}
.easy {
  .easyclass;
}
// output
.easy {
  display: inline-block;
  font-size: 14px;
}
```

### Mixins (混合)
将现有的样式混合加入到新样式类中
```less
.a { color: red;}
.b { background: blue;}
.mixin {
  .a(); // 二者方式皆可用
  .b;
}
// ouput 
.a { color: red;}
.b { background: blue;}
.mixin {
  color: red;
  background: blue;
}
```

不产出用于混合的样式类
```less
.mixin() {
  background: red;
}
.class {
  .mixin;
}
// output 
.class {
  background: red;
}
```

- 在`mixin()`类后添加`!important`会给所有`mixin()`中的属性添加`!important`

- 带参数的`Mixins`
```less 
.params-mixins(@color: red) { // 默认参数
  background: @color;
  color: @color;
}
.header {
  .params-mixins(#bbb);
}
.footer {
  .params-mixins;
}
// output
.header {
  background: #bbb;
  color: #bbb;
}
.footer {
  background: red;
  color: red;
}

// 多参数
mixins(@color: red; @size: 16px) {
  color: @color;
  font-size: @size;
}
```
- `@arguments` 指代所有参数

### Mixins as Function
可继承mixin中的变量
```less
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // "call" the mixin
  padding: @average;    // use its "return" value
}
// output
div {
  padding: 33px;
}
```

- mixin嵌套做返回值
```less
.unlock(@value) { // outer mixin
  .doSomething() { // nested mixin
    declaration: @value;
  }
}

#namespace {
  .unlock(5); // unlock doSomething mixin
  .doSomething(); //nested mixin was copied here and is usable
}
// output
#namespace {
  declaration: 5;
}
```

### 内置函数
- color("#aaa");
将一个字符串转化为颜色

- image-size("file.png")
- image-width(file)
- image-height(file)
返回传入的图片尺寸(px)

- convert(9s, ms)
单位换算

- data-uri(file)
将图片转化为base64格式

- default()

- unit(5em, px) => 5px
单位转换
- get-unit(5px) => px
获取单位

- svg-gradient(方位, 渐变色)
创建渐变svg

