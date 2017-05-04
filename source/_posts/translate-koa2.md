---
title: translate-koa2
date: 2017-04-03 14:54:21
tags:
  - javascript
  - node
  - koa2
---

边学英语边学koa

<!--more-->

## KOA

### koa
基于node.js的下一代web框架

### Introduction
koa是由Express开发团队设计的新型Web框架，旨在为Web应用和Apis提供更小，更具表现力和更强大基础。通过组合利用generators，可以避免回调嵌套并大大提高处理错误的能力。koa不在核心中捆绑任何中间件，仅仅提供了一套轻量优雅的方法库，使得编写服务更加便捷。

### 安装
koa需要 node >= ^7.6.0版本来支持ES2015和async。
你可以安装node版本控制器来升级到需求版本。
```
npm install n -g
n 7.6.0
npm install koa
node my-koa-app.js
```

### Async与Babel
要想在node低于^7.6.0的环境，koa中使用Async函数，我们推荐使用[babel's require hook](https://babeljs.io/docs/usage/babel-register/)
```
require('babel-core/register');
// require the rest of the app that needs to be transpiled after the hook
const app = require('./app');
```
为了解析和转换Async函数， 你至少应该有[transform-async-to-generator](http://babeljs.io/docs/plugins/transform-async-to-generator/)或[transform-async-to-module-method](http://babeljs.io/docs/plugins/transform-async-to-module-method/)插件。
举个例，在你的`.babelrc`文件中，你应该有如下配置:
```
{
  "plugins": ["transform-async-to-generator"]
}
```
你当然也可以使用[Stage 3 preset](http://babeljs.io/docs/plugins/preset-stage-3/)代替
> 讲道理干嘛这么麻烦。。不如用node^7.6.0

### Application
koa应用是一个包含一系列中间件的对象，这些中间件函数根据request请求按照类似堆栈的方式构成依次执行。Koa类似于其他您可能使用过的中间件系统（如Ruby‘s Rack，Connect等）。然而Koa的核心设计思路是为其他低等级的中间件层提供高级语法糖，以提高其可操作性和稳定性，并使编写中间件变得更便捷。

Koa包含了像content-negotiation(内容协商)、cache freshness（缓存刷新）、proxy support（代理支持）和 redirection（重定向）等常用任务方法。尽管有相当大数量的函数支持，Koa仅仅包含很小一部分，因为Koa没有中间件捆绑。

编写一个 hello world 应用：
```
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

### Cascading—级联
Koa中间件以更传统的方式级联，像你习惯使用的一些类似工具——在过去这使得用户很难友好的使用node频繁回调。然而通过使用Async函数，我们能"真正"实现中间件。Connect的实现是简单地通过一系列的函数传递控制权，直到一个函数返回。而Koa则是通调用下一个中间件，然后将控制权逐级返还到上级中间件。

下面的例子将返回 `Hello World`，然而当请求开始时，将先经过x-response-time和logging中间件，记录中间件执行起始时间，然后继续通过response中间件得到控制权。当一个中间件调用 next() 时，该函数暂停并将控制权传递给定义的下一个中间件。当没有更多的下级中间件执行，堆栈将释放，并且将逆序执行每个中间件的代码。

> 原文并未使用箭头函数

  ```
 const Koa = require('koa');
 const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
 });

 // logger

 app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
 });

// response

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

### Settings
应用配置是实例app的属性，目前支持以下配置：
  - app.env 默认为NODE_DEV或development
  - app.proxy 如果为true，则header域将被信任
  - app.subdomainOffset 默认为2 表示.subdomains所忽略的字符偏移量

### app.listen(...)
 Koa应用并不是一个HTTP服务器的单一映射表现方式。一个或多个Koa应用可以被一起挂载，形成一个具有单一HTTP服务器的较大型的应用。

 创建并返回一个HTTP服务器，将给定的参数传递给Server#listen()。[(参数配置参考)](https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback)
 以下为创建一个绑定3000端口的简单Koa应用：

  ```
 const Koa = require('koa');
const app = new Koa();
app.listen(3000);
```

app.listen(...)实际上以下代码的语法糖：

```
const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback().listen(3000));
```

这意味这你可以同时启动HTTP和HTTPS或多个地址相同的引用程序：

```
const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback().listen(3000));
http.createServer(app.callback().listen(3000));
```

### app.callback()
返回一个适用于http。createServer()方法的回调函数来处理请求。你也可以使用这个回调函数将你的Koa应用挂载到 Connect/Express 应用上。

### app.use(function)
将给定的中间件添加到应用中[(参考Middleware)](https://github.com/koajs/koa/wiki#middleware)

### app.keys =
设置签名Cookie密钥
该密钥将会被传递给[KEyGrip](https://github.com/koajs/koa/wiki#middleware)。
你也可以传递自己生成的KEyGrip实例。如下：
```
app.keys = [ 'im a newer secret', 'i like turtle'];
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
```
在进行cookie签名时。，这些键只有在设置signed 为 true 时才会使用密钥进行加密：
```
this.cookies.set('name', 'tobi', {signed: true});
```

### app.context
app.context是从ctx中创建的原型。你可以通过编辑app.context添加额外的属性到ctx上。这对于添加属性或方法到ctx上在整个应用程序上使用非常有用，这也可能会更为有效（无中间件）并更容易（更少使用require())牺牲更多依赖在ctx上，这可以被视为反模式。

举个例，添加一个数据库引用到ctx:
```
app.context.db = db();
app.use(async (ctx) => {
  console.log(ctx.db);
});
```
---
Note：
 - ctx上的许多属性定义时使用了，getters，setters和Object.defineProperty()。你只能编辑这些属性（不推荐）通过使用Object.defineProperty app.context()。[(See more)](https://github.com/koajs/koa/issues/652)
 - 这一段有点晕。。。

### 错误处理
默认情况下，Koa会讲所有错误日志输出到stderr中，除非 app。silent = true。默认错误处理页不会在 err.status = 404 或 err.expose = true 时输出错误。想要执行自定义错误处理逻辑（例如 centralized logging），你可以添加“error”事件监听器。
```
app.on('error', err => {
  log.error('serrver error', err);
});
```

如果在 req／res 周期中出现error，并且不能够影响客户端时，Context实例也会被传递到error事件监听器的回调函数中：
```
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx);
});
```

当发生错误并且仍然可以响应客户端时，例如没有数据被写入到socker中时，Koa将返回一个 500／服务器内部错误。
无论哪种情况，Koa都会生成一个应用级别的错误，来实现日志记录。

## Context
Koa Context将node的request和response对象封装到一个单独的对象中，为编写web应用和API提供了很多有用的方法。这些操作在开发HTTP服务器中经常被使用，因此被添加在context这一层级总而不是更高层级的框架中，这将迫使中间件需要重新实现这些公共的方法。
Context 根据每个request创建，并在中间件中作为接收器（receiver ）或通过 ctx 标识符来引用
如下代码展示：
```
app.use(async (ctx, next) => {
  ctx; // is the Context
  ctx.request; // is a koa Request
  ctx.response; // is a koa Response
})
```
许多Context的访问器和方法为了方便起见，简单地委托给ctx.request和ctx.response 所对应的等价方法。
举个例子，ctx.type和ctx.length 代理了 response对象中对应的方法， ctx.path和ctx.method代理了 resquest 对象中对应的方法。

### API
Context 具体的方法和访问器。

### ctx.req
Node的request对象

### ctx.res
Node的response对象

Koa不支持直接调用底层response处理。请避免使用以下Node属性：
  - res.statusCode
  - res.writeHead()
  - res.write()
  - res.end()

### ctx.request
Koa 的 Request 对象。

### ctx.response
Koa 的 Response 对象。

### ctx.state
自定义命名空间，用于将信息从中间件传递到前端视图层
```
ctx.state.user = await User.find(id);
```

### ctx.app
应用实例引用。

### ctx.cookies.get(name, [options])
获取 cookie 中 name 的值 options为可选参数。
  - signed：对cookie请求时需要设置签名。

Koa 使用 [cookies模块](https://github.com/pillarjs/cookies),options参数只是简单地直接传递。

### ctx.cookies.set(name, value, [options])
设置 cookie 中 name值， options为可选参数。
  - maxAge: 表示 Date.now() 到期的毫米数， number.
  - signed: Cookie 签名
  - expires: Cookie有效时间
  - path: Cookie路径，默认为`/'`
  - domain: Cookie的域
  - secure: Cookie安全协议 false表示Cookie通过HTTP协议传送，true表示Cookie通过HTTPS协议传送。
  - httpOnly: 服务器可访问的Cookie 默认为true
  - overwrite: 一个布尔值，表示是否覆盖重写以前设置的同名的Cookie（默认为false）如果为true，在设置这个新Cookie时，将在同一个请求中设置所有相同名称的Cookie（不论路径或域）并从Set-Cookie头部中过滤掉。

Koa 使用 [cookies模块](https://github.com/pillarjs/cookies),options参数只是简单地直接传递。

### ctx.throw([msg], [status], [properties])
Helper方法抛出一个.status属性默认为500的错误。该方法允许Koa准确的响应处理状态。
Koa允许以下组合：
```
ctx.throw(403);
ctx.throw('name required', 400);
ctx.throw(400, 'name required');
ctx.throw('something exploded');
```
举个例子 `ctx.throw('name required', 400)`等价于：
```
const err = new Error('name required');
err.status = 400;
err.expose = true;
throw err;
```
请注意，这些是用户级错误，并会被标记为err.expose,这意味着消息会被准确描述为对客户端的响应，而并非使用在您不想泄漏失败细节的情景中。

你可以根据需要将合并后的属性对象船钓错误中去，这对于向上级中间件请求的友好的机器化错误有着很好的装饰作用
```
ctx.throw(401, 'access_denied', { user: user });
ctx.throw('access_denied', { user: user });
```
Koa 使用[http-errors](https://github.com/jshttp/http-errors)来创建错误。

### ctx.assert(value, [status], [msg], [properties])
当 !value时，Helper方法抛出类似于.throw()的错误。
相当于node中的[assert](https://nodejs.org/api/assert.html)方法
```
ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
```
Koa 使用[http-assert](https://github.com/jshttp/http-assert)判断

### ctx.respond
为了避免Koa的内置响应处理，你可以直接设置 ctx.respond = false;
如果你想使用原生的res对象代替Koa操作response，那么请使用这种方法。

请注意，Koa并不支持这种使用方式，因为这有可能破坏Koa中间件和Koa本身的一些功能。
这只能作为一种hack的方式，并只对希望在Koa的函数和中间件中使用传统的fn(req, res)的人带来便捷。

### Request aliases
以下的访问器别名与 [Request](#Request) 等价：
```
ctx.header
ctx.headers
ctx.method
ctx.method=
ctx.url
ctx.url=
ctx.originalUrl
ctx.originalUrlctx.href
ctx.path
ctx.path=
ctx.query
ctx.query=
ctx.querystring
ctx.querystring=
ctx.host
ctx.hostname
ctx.fresh
ctx.stale
ctx.socket
ctx.protocol
ctx.secure
ctx.ip
ctx.ips
ctx.subdomains
ctx.is()
ctx.accepts()
ctx.acceptsEncodings()
ctx.acceptsLanguages()
ctx.get()
```

### Response aliases
以下访问器别名与 [Response](#response)等价:
```
ctx.body
ctx.body=
ctx.status
ctx.status=
ctx.message
ctx.message=
ctx.length
ctx.length=
ctx.type
ctx.type=
ctx.headerSent
ctx.rdirect()
ctx.attachment()
ctx.set()
ctx.append()
ctx.remove()
ctx.lastModified=
ctx.etag=
```

## <span id="request">Request</span>
Koa的Request对象是对node的Request对象进一步抽象，封装。
提供了对日常HTTP服务器开发有用的一些功能函数

### API

#### request.header
请求头对象

#### request.headers
请求头对象的别名

#### request.method
请求方法

#### request.method=
设置请求方法，在实现中间件时有很大作用，例如methodOverride()

#### request.length
以数字的形式返回request的内容长度(Content-lenght),或者返回undefined

#### request.url
获取请求url地址

#### request.url=
设置请求地址，用于重写url

#### request.originalUrl
获取请求原始url

#### request.origin
获取url来源，包括protocol和host
```
ctx.request.origin
// => http://example.com
```

#### request.href
获取请求完整的URL，包括protpcol，host和url
```
ctx.request.href
// => http://example.com/foo/bar?q=1
```

#### request.path
获取请求路径名。

#### request.path=
设置请求路径名，并保存'?'后面的部分（请求参数）

#### request.querystring
获取请求的查询参数(url中?后边的部分)不包含？

#### request.querystring=
设置查询参数

#### request.search
获取请求的查询参数，包含?

#### request.search=
设置请求的查询参数。

#### request.host
获取当前host(hostname: port) 当 app.proxy = true 时, 支持X-Forwarded-Host。

#### request.hostname
获取hostname，当 app.proxy = ture 时, 支持X-Forwarded-Host.

#### request.type
获取当前请求的 Conetent-Type 不包含如`charset`这样的参数。
```
const ct = ctx.request.type
// => "image/png"
```

#### request.charset
获取当前请求的 charset 没有则返回undefined
```
ctx.request.charset
// => "utf-8"
```

#### request.query
获取解析后的查询字符串，当请求中没有查询字符串时则返回一个空对象。
请注意，这个方法不支持嵌套对象。
例如：`color=blue&size=small`
```
{
  color: 'blue',
  size: 'small'
}
```

#### request.query=
根据给定的对象设置查询字符串。
请注意，这个方法不支持嵌套对象。
```
ctx.query = {next: '/login'}
```

#### request.fresh


## <span id="response">Response</span>
