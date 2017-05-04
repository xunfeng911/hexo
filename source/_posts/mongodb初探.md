---
title: mongodb初探
date: 2017-01-24 11:56:04
tags:
---
初探mongodb

<!--more-->

# mongodb
基于分布式文件储存的数据库，支持的数据结构非常松散，类似json的bson格式，可以储存比较复杂的数据类型。

### 特点
- 面向集合存储，易存储对象类型的数据
- 支持动态查询
- 支持完全索引，包含内部对象，对任何属性都可索引
- 支持复制和故障恢复
- 使用高效的二进制数据存储，包括大型对象（如视频等）
- 自动处理碎片，以支持云计算层次的扩展性

### 应用平台
- 大数据
- 内容管理和交付
- 移动和社交基础设施
- 用户数据管理
- 数据平台

### Mac下安装mongodb
- [官网](https://www.mongodb.com) 下载最新版本，我使用的是3.4.1
- 解压后放倒/usr/local/mongodb目录下

```
cp -r mongodb-osx-x86_64-3.4.1 /usr/local/mongodb  
```
- 在该目录下建立子目录data/db存放数据，log存放日志

```
sudo mkdir data/db
sudo mkdir log
```
- 进入子目录bin创建配置文件

```
cd bin
vim mongodb.conf 
    // 编写配置文件
port=27017    // 数据库服务使用端口
dbpath=/usr/local/mongodb/data/db  // 数据存放的文件位置
logpath=/usr/local/mongodb/log/mongodb.log    // 日志文件的存放位置
fork = true    // 后台守护进程运行
```
- 启动
第一个窗口
```
./mongod -f mongodb.conf  
```
第二个窗口
```
./mongo
```

