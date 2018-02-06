---
title: css布局
date: 2017-01-25 21:58:24
tags:
---
开始复习复习

<!--more-->

#### css盒子模型
原理：padding,border,margin三者构成一个盒子。

![图片来自网络](https://sfault-image.b0.upaiyun.com/291/448/2914489531-57d7e11741de5_articlex)

Margin(外边距) - 清除边框外的区域，外边距是透明的。
Border(边框) - 围绕在内边距和内容外的边框。
Padding(内边距) - 清除内容周围的区域，内边距是透明的。
Content(内容) - 盒子的内容，显示文本和图像。

 w3c标准：总宽度 = margin-left + border-left + padding-left + width + padding-right + border-right + margin-right
  ？
 IE标准：总宽度 = margin-left + width + margin-right

#### css定位机制

##### 普通流
  - 元素的位置由元素在HTML文档中的位置决定，从左到右，自上而下。
  
  - 块级框从上到下一个接一个地排列，框之间的垂直距离是由框的垂直外边距计算出来。
  
  - 行内框在一行中水平布置。可以使用水平内边距、边框和外边距调整它们的间距。但是，垂直内边距、边框和外边距不影响行内框的高度。由一行形成的水平框称为行框（Line Box），行框的高度总是足以容纳它包含的所有行内框。不过，设置行高可以增加这个框的高度。
  
##### 定位
- 相对定位（reletive）
	
	元素保持其形状及其所占空间，相对于普通流中其他元素的偏移。

- 绝对定位（absloute）

	相对于已定位的祖先元素，如果没有已定位的祖先元素则相对于最初的包含块。
	脱离普通流，覆盖在普通流定位之上
	
- 固定定位（fixed）

	相对于浏览器窗口的绝对定位
	
##### 浮动
- 不在普通流中占据空间，但会对之后的浮动元素产生空间占位影响


	
#### 布局

##### 常见布局

- 单列水平居中布局, 一列定宽一列自适应布局, 两列定宽一列自适应布局, 两侧定宽中间自适应三列布局。

- 圣杯与双飞翼是常见的三列布局，左右两列宽度固定，中列自适应。

##### 圣杯布局

- 为了给两边侧栏空出位置，给container元素设置padding

- 左右两个div用相对定位并分配left，right属性，用负边距消除占位

- main div设置100%宽度


```html
<div class="container">
	<div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>
</div>
```

```css
body {
	padding: 0;
	margin: 0;
    min-width: 600px; /* 2*left + right */
}
.container {
    padding-left: 200px;
    padding-right: 200px;
}
.main {
    float: left;
    width: 100%;
    height: 300px;
    background-color: red;
}
.left {
    position: relative;
    left: -200px;
    float: left;
    width: 190px;
    height: 300px;
    margin-left: -100%;
    background-color: blue;
}
.right {
    position: relative;
    right: -210px;
    float: left;
    width: 190px;
    height: 300px;
    margin-left: -200px;
    background-color: green;
}
```

##### 双飞翼布局

- 三列左浮动
- 为了不让main内容被遮挡，给其设置padding
- 用负边距给左右两列定位，消除占位

```html
<div class="main-con">
	<div class="main"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```

```css
.main-con {
	float: left;
	width: 100%;
}

.main {
	height: 300px;
	margin-left: 210px;
	margin-right: 210px;
	background-color: red;
}

.left {
	float: left;
	width: 200px;
	height: 300px;
	margin-left: -100%;
	background-color: blue;
}

.right {
	float: left;
	width: 200px;
	height: 300px;
	margin-left: -200px;
	background-color: green;
}
```

##### 两者异同

- 两者都把主栏放在文档流最前面，优先加载。
 
- 两者都是三列浮动，然后通过负边距定位消除占位形成三列布局

- 中列main处理不同：圣杯布局是利用父容器的左、右内边距定位；双飞翼布局是把主栏嵌套在div后利用主列的左、右外边距定位。