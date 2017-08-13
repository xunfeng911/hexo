---
title: mongodb安全认证
date: 2017-06-07 17:29:07
tags:
  - mongodb
---
安全认证...

<!--more-->

### mongodb安全认证
MongoDB默认是不认证的，可以直接连上服务并对数据库进行操作。

#### 创建一个管理员用户
在开启验证之前必须创建一个管理员用户,管理员用户拥有userAdminAnyDatabase角色.此角色拥有管理用户的权限,注意此角色并不是最大权限的角色.

```js
> use admin
> db.createUser(
  {
    user: "admin",  
    pwd: "admin",  
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]  
  }
)
// 此时查询集合, 有了users
```

```shell
> show collections
system.users
system.version

> db.system.users.find();
{ "_id" : "admin.admin", "user" : "admin", "db" : "admin", "credentials" : { "SCRAM-SHA-1" : { "iterationCount" : 10000, "salt" : "5ERebAcl9LdKTIL516jalw==", "storedKey" : "bjKBgILU9djmwn8jibg4Uu54u9w=", "serverKey" : "iSTR/nMXjCv5pljY1hIPPOumCLU=" } }, "roles" : [ { "role" : "userAdminAnyDatabase", "db" : "admin" } ] }
>  db.system.version.find();
{ "_id" : "authSchema", "currentVersion" : 5 }
```

#### 用管理员登录
```shell
mongo  -u admin -p admin --authenticationDatabase admin
```
userAdminAnyDatabase拥有的权限
```
changeCustomData
changePassword
createRole
createUser
dropRole
dropUser
grantRole
revokeRole
viewRole
viewUser
```

#### 超级管理员
拥有在任何数据库中分配任何用户全选的能力
```
1. dbOwner
2. userAdmin
3. userAdminAnyDayabase
```

```shell
db.createUser(
  {
    user: "suq",
    pwd: "suq",
    roles: [
       { role: "dbOwner", db: "admin" },
       { role: "userAdmin", db: "admin" },
       { role: "userAdminAnyDatabase", db: "admin" }
    ]
  }
)

/// mongodb还直接提供了一个超级管理员角色root,例如我们创建一个admin用户为超级管理员
use admin
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "root",db:"admin" }]
 
  }
)
```

#### 切换用户
```sh
> db.auth("admin", "admin")
```

#### 创建角色
方法： `db.createRole()`
需求：
  在数据库有createRole()权限
  需要有授予指定权限的权限

一般来说，内建角色`userAdmin`与`userAdminAnyDatabase`满足以上要求

语法：
```sh
{
  role: "<name>",
  privileges: [
     { resource: { <resource> }, actions: [ "<action>", ... ] },
     ...
  ],
  roles: [
     { role: "<role>", db: "<database>" } | "<role>",
      ...
  ]
}
```
role 是创建role的名字
resource是你想授权所对应的对象
actions是授权的动作
roles是把某个角色授权给此角色

实例：
```sh
use admin
db.createRole(
   {
     role: "myClusterwideAdmin",
     privileges: [
       { resource: { cluster: true }, actions: [ "addShard" ] },
       { resource: { db: "config", collection: "" }, actions: [ "find", "update", "insert", "remove" ] },
       { resource: { db: "users", collection: "usersCollection" }, actions: [ "update", "insert", "remove" ] },
       { resource: { db: "", collection: "" }, actions: [ "find" ] }
     ],
     roles: [
       { role: "read", db: "admin" }
     ]
   },
   { w: "majority" , wtimeout: 5000 }
)
```

#### 查看角色权限
方法： `db.getRole()`
查看所有非内建角色: `db.getRoles()`

#### 查看用户角色
方法： `db.getUser()`
查看所有用户: `db.getUsers()`

#### 授予/收回角色权限
收回: `db.revokePrivilegesFromRole()`
授予: `db.grantPrivilegesToRole()`

#### 授予/收回用户角色
收回: `db.revokeRolesFromUser()`
授予: `db.grantRolesToUser()`

#### 修改用户密码
```sh
> db.changeUserPassword("name", "newpass")
```