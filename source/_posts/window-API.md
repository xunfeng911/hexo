---
title: window API
date: 2017-11-30 15:23:29
tags:
	- 前端
---
翻阅MDN文档，打牢基础，记录一些实用的API。
<!--more-->

## Window
`Window`是一个包含DOM文档的对象。

### 窗口状态
- `cloesd`：窗口是否关闭
- `opener`： 保存打开当前窗口的另一窗口的引用，不存在返回`null`
- `fullScreen`：窗口是否处于全屏模式
- `devicePixelRatio`：当前显示设备的物理像素分辨率与CSS像素分辨率的比值
- `onresize` 窗口大小时改变触发resize事件

### 窗口视图
- `innerHegiht` 浏览器窗口的视口的高度
- `innerWidth`  浏览器窗口的视口的宽度
- `outerHeight` 浏览器外层窗口的视口的高度
- `outerWidth`  浏览器外层窗口的视口的宽度

### `document`


###  窗口框架
- `frameElement` 返回嵌入当前`window`对象的元素
- `frames` 返回一个类数组对象,返回当前窗口的所有子框架元素
- `parent` 返回当前窗口的父窗口
- `length` 返回该窗口中包含的框架(`frame&iframe`)的数量

### history
提供操作浏览器会话历史的接口
- `history.back()`： 后退
- `history.forward()`： 前进
- `history.go(num)`：移动num个页面
- `history.pushState(state, title, url)`  创建新的历史记录条目，更新state，title，url，但不会加载新url
	- `state`  状态对象
	- `title`  标题
	- `URL`    新的历史URL记录
- `history.replaceState(state, title, url)` 修改当前历史记录，更新state，title，url，但不会加载新url
- `window.onpopstate` 当处于激活状态的历史记录条目变化时触发，event包含state属性的拷贝
- `history.state`：获取当前历史记录的state

### location
包含有关文档当前位置的信息
- `assign(url)` 加载新url
- `reload()` 从服务器重新加载当前页面
- `replace()` 重加载
- `hash`
- `host`
- `hostname`
- `href`
- `origin`
- `pathname`
- `port`
- `protocol`
- `search`

### WebStorage
- `sessionStorage` 存在于浏览器打开时
- `localStorage` 存在于定义的生命周期中，浏览器关闭后仍然存在
- `getItem(name)`  从存储中获取键值为`name`的数数据项
- `setItem(key, value)` 创建或更新值
- `clear()` 清空域名对应的整个存储对象
- `removeItem(key)` 移除指定项
- `onstorage` 事件，当storage更新时触发
	```js
	window.addEventListener('storage', function(e) {
		console.log(e.key);
		console.log(e.oldValue);
		console.log(e.newValue);
		console.log(e.url);
		console.log(e.storageArea);
		// doing something
	})
	```

### EventHandlers
- `onload` 窗口加载事件触发时调用
- `onblur` 元素失去焦点时触发
- `onfocus`
- `onchange`
- `onclick`
- `ondblclick`  双击鼠标左键
- `oncontextmenu`  右键菜单功能是否激活
- `onerror`
	```js
	window.onerror = (message, source, lineno, colno, error) => {
		// 错误信息
		// 发生错误的url
		// 行号
		// 列号
		// 错误对象
	}
	element.onerror = (event) => {}
	```
- `oninput` `<input />`的value值由输入设备改变触发
- `onreset` 只有在用户点击表单中的reset按钮时才会被触发
- `onselect` 只有在文本框和文本域内选择文本才会触发select事件
- `onsubmit` 提交表单
- `onkeypress` 按下键盘键触发
- `onmousedown` 鼠标点击触发
- `onmousemove` 在当前元素上移动鼠标触发
- `onmouseout`  鼠标离开当前元素
- `onmouseover` 鼠标移动到当前元素上
- `onmouseup`   鼠标释放点击
- `onwheel` 相应元素上滚动滑轮触发
- `onscroll` 元素滚动时触发



























