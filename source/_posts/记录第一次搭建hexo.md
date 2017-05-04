---
title: 记录第一次搭建hexo
date: 2016-11-22 14:57:37
type: "hexo"
tags:
  - 搭建hexo
  - git
---
即使扒了很多大佬的搭建教程，还是踩了很多坑，所以打算记录下来自己的搭建过程。本文主要介绍win10下hexo3.1.1搭建，并发布到GitHub上。

<!--more-->

## 环境搭建
 &ensp;安装nodejs（必须）
- 作用：用来生成静态页面的
- 方法：到[node.js](http://nodejs.cn/)官网下载并安装。我是用的是win10下v6.9.1版本。

 &ensp;安装git（必须）
- 作用：把本地的hexo内容提交到github上去。
- 方法：进入git官方下载即可，速度较慢。

 &ensp;申请GitHub账号（必须）
- 作用：是用来做博客的远程创库、域名、服务器之类的。
- 方法：到[github](https://github.com/)官网自行注册，如果想深入学习请看[pro git](http://iissnan.com/progit/)教程


## 安装并搭建hexo
 &ensp;安装hexo
- 进入git或cmd执行以下命令


```
pm install -g hexo
```

- hexo必备插件，建议一起安装

```
$ npm install hexo-generator-index --save #索引生成器
$ npm install hexo-generator-archive --save #归档生成器
$ npm install hexo-generator-category --save #分类生成器
$ npm install hexo-generator-tag --save #标签生成器
$ npm install hexo-server --save #本地服务
$ npm install hexo-deployer-git --save #hexo通过git发布（必装）
$ npm install hexo-renderer-marked@0.2.7--save #渲染器
$ npm install hexo-renderer-stylus@0.3.0 --save #渲染器
```

- 安装过程中不知道为毛我多了两个蜜汁报错，但到最后也没太大影响

```
npm WARN deprecated swig@1.4.2: This package is no longer maintained
```
```
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevent@^1.0.0(node_modules\hexo\node_modules|chokidar\node_mdules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.0.15: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
```

- 初始化
 选择本地磁盘某个位置创建本地hexo文件夹，进入后右键 git bash

```
$ hexo init
```

- 生成静态页面

```
$ hexo p
```

- 本地服务
必须安装 hexo server，否则无用

```
hexo s
```

至此本地hexo已建立成功，测试网址：[http://localhost:4000](http://localhost:4000/)

## 配置GitHub
- 建立Repository
建立与你用户名对应的仓库，仓库名必须为【your_user_name.github.io】

现在我们需要编辑_config.yml文件：
翻到最下面，改成我这样子的
```
deploy: 
      type: git  //有的版本是github也是个小坑，注意
      repo: https://github.com/xunfeng911/xunfeng911.github.com.git // 换成你本人的
      branch: master
```

然后保存后执行命令：

```
hexo d
```
注意yml格式文件冒号后面必须加一个空格
执行完毕后访问your_user_name.github.io
即可看到部署在github上的默认博客,第一次发布可能会有10分钟的延迟。

到这里，一个全新的hexo博客就建成了。



## 附录

- 常用命令：

```
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub
hexo help # 查看帮助
hexo version #查看Hexo的版本
```
- 简写

```
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy
```

## 参考资料

[卢睿韬学长的自留地](https://xdlrt.github.io/2016/02/16/2016-02-16/)
[潘柏信,搭建个人博客](http://baixin.io/2015/08/HEXO搭建个人博客/)