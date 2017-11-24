---
title: angular4 directive入场动画
date: 2017-11-24 08:39:38
tags:
  - JavaScript
  - Angular4
---
<!--more -->

## 通过Directive实现入场动画

### 创建指令并引入所需

```ts
import { Directive, ElementRef, HostListener, HostBinding  } from '@angular/core';

@Directive({
  selector: '[VisualIn]'
})
export class VisualInDirective {
  finished: boolean;
  constructor(
    private el: ElementRef,
  ) {
    this.finished = false;
  }
```
### 使用`HostListener`为宿主元素添加`window`监听

```ts
// scroll 监听
@HostListener('window: scroll') elementShowIn() {}
// load 监听
@HostListener('window: load') elementLoadIn() {}
```

### 使用`HostBinding`为宿主元素绑定动画类名
```ts
  @HostBinding('class.bounceInRight') isAnimate: boolean;
```
```css
@keyframes bounceInRight {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }

  75% {
    transform: translate3d(10px, 0, 0);
  }

  90% {
    transform: translate3d(-5px, 0, 0);
  }

  to {
    transform: none;
  }
}

.bounceInRight {
  animation-duration: .5s;
  animation-fill-mode: both;
  animation-name: bounceInRight;
}
```
### 获取元素相对于`body`标签的高度
`documentElement.offsetTop`会获取标签到`offsetParent`的相对偏移高度
默认的`offsetParent`返回一个指向最近的包含该元素的定位元素
如果没有定位元素则返回最近的`table, table sell`或根元素
因此我们需要遍历父级元素，从基元素获取所有父级定位元素，并累加相对偏移高度
```ts
private getOffsetBodyTop(el) {
    let offsetBodyTop = 0;
    function _getOffsetBodyTop(el) {
      offsetBodyTop += el.offsetTop;
      if (el.offsetParent.tagName != 'BODY') {
        return _getOffsetBodyTop(el.offsetParent);
      } else if (el.offsetParent.tagName == 'BODY') {
        return false;
      }
    }
    _getOffsetBodyTop(el);
    return offsetBodyTop;
  }
```

### 定位元素进入窗口的高度，并执行动画
当 元素相对根元素的偏移高度 - 当前滚动高度 - 窗口高度 < 0 时，元素开始进入页面
此时执行动画
```ts
private showAnimate(): Promise<any> {
    return new Promise((resolve, reject) => {
    const offsetBodyTop = this.getOffsetBodyTop(this.el.nativeElement); // 元素距离顶部高度
    let _dst: number;   // 滚动高度
    if (this.myPhone() === 'iPhone') {
      _dst = document.body.scrollTop;
    } else {
      _dst = document.documentElement.scrollTop;
    }
    const _wsh = window.innerHeight;   // 屏幕高度
    if (offsetBodyTop - _dst - _wsh < -30) {
      if (this.finished) {
        resolve('isFinished');
      } else {
        this.isAnimate = true;
        this.finished = true;
        resolve('show');
      }
    } else {
      resolve('noShow');
    }
  });
}

private myPhone() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('iPhone') > -1) {
    return 'iPhone';
  }
```

### 修改HostListener
```ts
 @HostListener('window:scroll') elementShowIn() {
    this.showAnimate().then(res => {});
  }
  @HostListener('window:load') elementLoadIn() {
    this.showAnimate().then(res => {});
  }
```

### 添加指令
在你需要的元素标签上添加
```html
<div  VisualIn></div>
```
[This is demo](http://blog.xuncs.cn)

