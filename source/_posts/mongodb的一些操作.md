---
title: mongodb的一些操作
date: 2017-03-30 10:50:52
tags:
---

我要学习！！
<!--more-->

### Collection集合中的基本操作
1.查看帮助
```
db.test.help()
```
2.查询当前集合的数据条数
```
db.test.count()
```
3.查看数据空间大小
```
db.test.dataSize()
```
4.得到当前聚合所在的db
```
db.test.getDB()
```
5.得到当前聚合的状态
```
db.test.stats()
```
6.聚合集合总大小
```
db.test.totalSize()
```
7.聚合集合存储空间大小
```
db.test.storageSize()
```
8.shard版本信息
```
db.test.getShardVersion()
```
9.聚合集合重命名
```
db.test.renameCollection('newName')
```
10.删除当前聚集集合
```
db.test.drop()
```


### 聚集集合查询
1.查询所有记录
```
db.test.find()
// 默认每页显示20条记录，可用 it 迭代查询下一页数据
// 可以用 DBquery.shellBatchSize = 50 更改每页数据
```
2.查询过滤指定键中含有的重复数据
```
db.test.distinct("name")
```
3.查询 title = 指定值的数据
```
db.test.find({title:"xuncs"})
```
4.查询 age > 18 的数据
```
db.test.find({age:{$gt:18}})
```
5.查询 age < 18 的数据
```
db.test.find({age:{$lt:18}})
```
6.查询 age >= 18 的数据
```
db.test.find({age:{$gte:18}})
```
7.查询 age <= 18 的数据
```
db.test.find({age:{$lte:18}})
```
8.查询 age > 18&& age < 24
```
db.test.find({age:{$gt:18,$lt:24}})
```
9.查询 title中包含 xun 的数据
```
db.xuncs.find({title:/xun/})
```
10.查询 title 中以 xun 开头的数据
```
db.xuncs.find({title:/^xun/})
```
11.查询指定列, title，date数据
```
db.xuncs.find({},{title: 1,date: 1})
```
12.查询指定列 且有要求查询
```
db.xuncs.find({age:{$gt: 15}}, {age: 1})
```
13.排序
```
db.xuncs.find().sort({age: 1})  // 升序
db.xuncs.find().sort({age: -1}) // 降序
```
14.查询指定数据
```
db.xuncs.find()({title: 'xuncs'}) // 查询title = 'xuncs' 的data
```
15.查询前n条数据
```
db.xuncs.find().limit(n)
```
16.查询n条之后的数据
```
db.xuncs.find().skip(n)
```
17.查询n-m之间的数据
```
db.xuncs.find().limit(m).skip(n)
```
18.or与查询
```
db.xuncs.find({$or:[{age: 18},{age: 28}]})  // 查询 age = 18 || age = 28
```
19.查询第一条数据
```
db.xuncs.findOne()
```
20.查询某个结果集的记录条数
```
db.xuncs.find({age: {$gte:18}}).count()
```
21.查询某列含有该键值的数据
```
db.xuncs.find({title: {$exists: true}})
```


### 索引
1.创建索引
```
db.xuncs.ensureIndex({title: 1})
db.xuncs.ensureIndex({title: 1, ts: -1})
```
2.查询当前聚合集合所有索引
```
db.xuncs.getIdexes()
```
3.查看总索引记录大小
```
db.xuncs.totalIndexSize()
```
4.读取当前集合的所有index信息
```
db.xuncs.reIndex()
```
5.删除指定索引
```
db.xuncs.dropIndex('title_1')
```
6.删除所有索引
```
db.xuncs.dropIndexes()
```

### 增删改
1.添加
```
db.xuncs.save({title: 'xuncs', age: 18, sex: true, date: new Date()})
db.xuncs.insert({title: "insert"})
db.xuncs.batchInsert([{'title': 'batch1'},{'title': 'batch2'}])  // 批量添加
```
2.修改
```
db.xuncs.update({title: 'xuncs'}, {$set: {age: 20}})
// 修改数据中第一条title = 'xuncs'的age为20
db.xuncs.update({title: 'xuncs'}, {$set: {age: 22}}, false, true)
// 修改数据中所有条目title = 'xuncs'的age为22
db.xuncs.update({title: 'xuncs'}, {$inc: {age: 50}})
// $inc 增加
```
3.删除
```
db.xuncs.remove // 删除xuncs集合中所有文档
db.xuncs.remove({age: 18})
```
4.查询修改删除
```
db.xuncs.findAndModify({
  query: {age: {$gte:18}},
  sort: {age: -1},
  update: {$set: {name: 'aaa'}, $inc: {age:2}}
})
db.runCommand({ findandmodify: "xuncs",
  query: {age: {$gte:18}},
  sort: {age: -1},
  /*update: {$set: {name: 'aaa'}, $inc: {age:2}}*/
  remove: true
})
// update与remove中有一个必须参数，其他参数可选
```
