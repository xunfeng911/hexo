---
title: PWA-study
date: 2018-01-29 16:29:40
tags:
---


<!-- more-->


## Progresive Web App 渐进式WEB应用

### 功能
- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
- 实现离线缓存功能，即使没有网络，也能使用一些离线功能
- 实现了消息推送

### 用法
#### 通过Manifest实现添加至主屏幕
```html
<head>
  <link rel="manifest"  href="manifest.json" />
</head>  
```
manifest.json
```json
{
  "name": "Minimal PWA", // 必填 显示的插件名称
  "short_name": "PWA Demo", // 可选  在APP launcher和新的tab页显示，如果没有设置，则使用name
  "description": "The app that helps you understand PWA", //用于描述应用
  "display": "standalone | fullscreen | minimal-ui | browser", // 定义开发人员对Web应用程序的首选显示模式。standalone模式会有单独的
  "start_url": "/", // 应用启动时的url
  "theme_color": "#313131", // 桌面图标的背景色
  "background_color": "#313131", // 为web应用程序预定义的背景颜色。在启动web应用程序和加载应用程序的内容之间创建了一个平滑的过渡。
  "lang": "en-US",  // 指定name和short_name成员中的值的主要语言
  "icons": [ // 桌面图标，是一个数组
    {
      "src": "icon/lowres.webp",
      "sizes": "48x48",  // 以空格分隔的图片尺寸
      "type": "image/webp"  // 帮助userAgent快速排除不支持的类型
    },
    {
      "src": "icon/lowres",
      "sizes": "48x48"
    },
    {
      "src": "icon/hd_hi.ico",
      "sizes": "72x72 96x96 128x128 256x256"
    },
    {
      "src": "icon/hd_hi.svg",
      "sizes": "72x72"
    }
  ]
}
```

#### service worker 实现离线缓存
- 特点
  1. 在页面中注册并安装成功后，运行于浏览器后台，不受页面刷新的影响，可以监听和截拦作用域范围内所有页面的 HTTP 请求。
  2. 网站必须使用 HTTPS。除了使用本地开发环境调试时 (如域名使用 localhost)
  3. 运行于浏览器后台，可以控制打开的作用域范围下所有的页面请求
  4. 单独的作用域范围，单独的运行环境和执行线程
  5. 不能操作页面 DOM。但可以通过事件机制来处理
  6. 事件驱动型服务线程

- 生命周期
  1. 当你调用 register() 函数时， Service Worker 开始下载。
  2. 在注册过程中，浏览器会下载、解析并执行 Service Worker ()。如果在此步骤中出现任何错误，register() 返回的 promise 都会执行 reject 操作，并且 Service Worker 会被废弃。
  3. 一旦 Service Worker 成功执行了，install 事件就会激活
  4. 安装完成，Service Worker 便会激活，并控制在其范围内的一切。如果生命周期中的所有事件都成功了，Service Worker 便已准备就绪，随时可以使用了！