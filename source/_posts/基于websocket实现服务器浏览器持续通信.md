---
title: 基于websocket实现服务器浏览器持续通信
date: 2016-12-10 21:14:18
tags:
  - node
  - javascript
---

为了网络程序设计大作业，了解了http,websocket,node及其框架...
<!--more-->

### http协议
  * HTTP是超文本传输协议，是客户端浏览器或其他程序与Web服务器之间的应用层通信协议
 * HTTP使用TCP/IP建立连接
![](http://upload-images.jianshu.io/upload_images/3767061-36776499e489d972.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/3767061-25b34aab5fc17bce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 * TCP客户端和服务器通过TCP套接字接口通信

![](http://upload-images.jianshu.io/upload_images/3767061-ff829f1fafae57a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### Websocket
 - Websocket是一个持久化的协议
  http1.0的生命周期很短，一个request一个response完成后就结束
 http1.1增加了一个keep-alive，在一个http连接中可以发送多个request，接收多个response

![](http://upload-images.jianshu.io/upload_images/3767061-b512a13ed3c4cd9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/3767061-92194c7aa3f952d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这是一个 websocket的request和 response

 - websocket解决了http的部分难题
  * **被动性** 服务端可以主动推送信息给客户端，不需要客户端不断请求
  * **持久性** 只需要一次握手，整个通信建立在一次连接中，避免了中介反复解析

### 基于express和socket.io构建聊天室

 - express
  安装
  ``` sh
 npm install express -g
```
server.js引用模块
``` js
var express = require('express'),
app = express(),
server = require('http').createServer(app);  //创建服务
app.use('/', express.static(__dirname + '/www')); //调用静态文件
```

- socket.IO
  可以接受所有与服务器相连接的客户端发送的消息，也可向客户端主动发送消息。
  安装
``` sh
 npm install socket.io
```
引用
``` js
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 3000);  //监听端口
```

- connect
```js
io.sockets.on('connection', function(socket) {   //建立连接
    //新用户
    socket.on('login', function(usrName,user) {
        if (users.indexOf(usrName) > -1) {
            socket.emit('usrExisted');
        } else {
            socket.userIndex = users.length;
            socket.usrName = usrName;
            socket.users = users;
            users.push(usrName);
            date = new Date().toTimeString().substr(0, 8);
            console.log(date+"/"+usrName+'加入了聊天');
            socket.emit('loginSuccess');
            io.sockets.emit('system', usrName, users.length, 'login');
            io.sockets.emit('cuList', users);
        };
    });
    //用户离开
    socket.on('disconnect', function(user) {
        if (socket.usrName != null) {
        	socket.users = users;
            users.splice(socket.userIndex, 1);
            date = new Date().toTimeString().substr(0, 8);
            console.log(date+"/"+socket.usrName+'滚蛋了');
            socket.broadcast.emit('system', socket.usrName, users.length, 'logout');
			io.sockets.emit('cuList', users);
        }
    });
    //用户列表
	//新消息
    socket.on('postMsg', function(msg, color) {
    	date = new Date().toTimeString().substr(0, 8);
    	console.log(date+"/"+socket.usrName+'：'+msg);
        socket.broadcast.emit('newMsg', socket.usrName, msg, color);
    });
    //新图片
    socket.on('img', function(imgData, color) {
    	date = new Date().toTimeString().substr(0, 8);
    	console.log(date+"/"+socket.usrName+'：'+imgData);
        socket.broadcast.emit('newImg', socket.usrName, imgData, color);
    });
});
```
- 客户端js,html,css

```js
window.onload = function() {
    var webchat = new WebChat();
    webchat.init();
};
var WebChat = function() {
    this.socket = null;
};
WebChat.prototype = {
    init: function() {
        var that = this;
        this.socket = io.connect();
        //建立连接
        this.socket.on('connect', function() {
        	$('#info').text('大爷儿，进来玩玩');
        	$('#inModal').css('display','block');
        	$('#usrName').focus();
        });
        //昵称占用
        this.socket.on('usrExisted', function() {
            $('#info').text('昵称已被使用，请换一个试试！');
        });
        //登陆成功
        this.socket.on('loginSuccess', function() {
        	document.title ='webchat | ' + $('#usrName').val();
        	$('#loginArea').css('display','none');
        	$('#messageInput').focus();
        });
        //用户列表
        this.socket.on('cuList',function(users){
        	var cuList = $('#right');
        	var addStr = "";
        	console.log(users);
        	users.forEach(function(user){
        		addStr += user + '<br/>';
        	});
        	cuList.html('用户列表<br/>'+addStr);
        })
        //连接失败
        this.socket.on('error', function(err) {
            if ($('#loginArea').style.display == 'none') {
                $('#onlineCount').text('连接失败！');
            } else {
                $('#info').text('连接失败！');
            }
        });
        //系统通知用户加入或离开
        this.socket.on('system', function(usrName, userCount, type) {
            var msg = usrName + (type == 'login' ? '来了' : '滚了');
            that._displayNewMsg('system ', msg, 'red');
            $('#onlineCount').text(userCount + (userCount > 1 ? ' users' : ' user') + ' online');
        });
        //发送消息
        this.socket.on('newMsg', function(user, msg, color) {
            that._displayNewMsg(user, msg, color);
        });
        //发送图片
        this.socket.on('newImg', function(user, img, color) {
            that._displayImage(user, img, color);
        });
        
        //底层监听事件
        
        //登陆按钮
        $('#loginBtn').on('click tap', function() {
            var usrName = $('#usrName').val();
            if ($.trim(usrName).length != 0) {
                that.socket.emit('login', usrName);
                that.socket.emit('cuList', users);
            } else {
                $('#usrName').focus();
            };
        });
        //登陆监听enter
        $('#usrName').on('keyup', function(e) {
            if (e.keyCode == 13) {
                var usrName = $('#usrName').val();
                if ($.trim(usrName).length != 0) {
                    that.socket.emit('login', usrName);
                    that.socket.emit('cuList', users);
                };
            };
        });
        //bind发送按钮
        $('#sendBtn').on('click tap', function() {
            var messageInput = $('#messageInput'),
                msg = messageInput.val(),
                color = $('#colorStyle').val();
            messageInput.val(' ');
            messageInput.focus();
            if ($.trim(msg).length != 0) {
                that.socket.emit('postMsg', msg, color);
                that._displayNewMsg('me', msg, color);
                return;
            };
        });
        //bind发送
        $('#messageInput').on('keyup', function(e) {
            var messageInput = $('#messageInput'),
                msg = messageInput.val(),
                color = $('#colorStyle').val();
            if (e.keyCode == 13 && $.trim(msg).length != 0) {
                messageInput.val(' ');
                that.socket.emit('postMsg', msg, color);
                that._displayNewMsg('me', msg, color);
            };
        });
        //清空
        $('#clearBtn').on('click tap', function() {
            $('#winChat').html(" ");
        });
        //发送图片
        $('#imgSend').on('change', function() {
            if (this.files.length != 0) {
                var file = this.files[0],
                    reader = new FileReader(),
                    color = $('#colorStyle').val();
                if (!reader) {
                    that._displayNewMsg('system', '辣鸡浏览器不支持上传文件', 'red');
                    this.val(' ');
                    return;
                };
                //接收图片
                reader.onload = function(e) {
                    that.socket.emit('img', e.target.result, color);
                    that._displayImage('me', e.target.result, color);
                };
                reader.readAsDataURL(file);
            };
        });
        //图片包
        this._initialLxh();
        //按钮
        $('#lxh').on('click tap', function(e) {
            var lxhwrapper = $('#lxhWrapper');
            lxhwrapper.css('display','block');
            e.stopPropagation();
        });
        //二级图片栏
        $('body').on('click', function(e) {
            var lxhwrapper = $('#lxhWrapper');
            if (e.target != lxhwrapper) {
                lxhwrapper.css('display','none');
            };
        });
        $('#lxhWrapper').on('click tap', function(e) {
            var target = e.target;
            if (target.nodeName.toLowerCase() == 'img') {
                var messageInput = $('#messageInput');
                messageInput.focus();
                messageInput.val(messageInput.val() + '[lxh:' + target.title + ']');
            };
        });
    },
    	//发送图片
    _initialLxh: function() {
        var lxhContainer = $('#lxhWrapper'),
            docFragment = document.createDocumentFragment();
        for (var i = 100; i > 0; i--) {
            var lxhItem = document.createElement('img');
            lxhItem.src = '../content/lxh/' + i + '.gif';
            lxhItem.title = i;
            docFragment.appendChild(lxhItem);
        };
        lxhContainer.append(docFragment);
    },
    _displayNewMsg: function(user, msg, color) {
        var container = $('#winChat'),
            msgToDisplay = $('<p></p>'),
            date = new Date().toTimeString().substr(0, 8),
            msg = this._showLxh(msg);
        msgToDisplay.css('color',color || '#000');
        msgToDisplay.html(user + '<span class="timespan">(' + date + '): </span>' + msg);
        container.append(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    _displayImage: function(user, imgData, color) {
        var container = $('#winChat'),
            msgToDisplay = $('<p></p>'),
            date = new Date().toTimeString().substr(0, 8);
        msgToDisplay.css('color',color || '#000');
        msgToDisplay.html(user + '<span class="timespan">(' + date + '): </span> <br/>' + '<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>');
        container.append(msgToDisplay);
        container.scrollTop = container.scrollHeight;
    },
    _showLxh: function(msg) {
        var match, 
        	result = msg,
            reg = /\[lxh:\d+\]/g,
            lxhIndex,
            totalLxhNum = $('#lxhWrapper').children().length;
        while (match = reg.exec(msg)) {
            lxhIndex = match[0].slice(5, -1);
            console.log(lxhIndex);
            if (lxhIndex > totalLxhNum) {
                result = result.replace(match[0], '[X]');
            } else {
                result = result.replace(match[0], '<img class="lxh" src="../content/lxh/' + lxhIndex + '.gif" />');
            };
        };
        return result;
    }
};
```

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="webchat | a simple chat application built with node.js and websocket">
        <meta name="viewport"content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>    
       <title>webchat</title>
        <link rel="stylesheet" href="styles/main.css">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
    </head>
    <body>
        <div class="wrapper">
            <div class="banner">
                <div>WebChat</div>
                <span id="onlineCount"></span>
            </div>
            <div id="winChat">
            </div>
            <div class="controls" >
                <div class="items">
                    <input id="colorStyle" type="color" placeHolder='#000' title="font color" />
                    <input id="lxh" type="button" value="lxh" title="lxh" />
                    <label for="imgSend" class="imgLabel">
                        <input type="button" value="表情" style="width: 60px;height: 30px;border: 0;margin: 0;padding: 0;" />
                        <input id="imgSend" type="file" accept="image/gif" value="表情"  />
                    </label>
                    <input id="clearBtn" type="button" value="清空" title="clear screen" />
                </div>
                <input type="text" id="messageInput" placeHolder="enter to send"/>
                <input id="sendBtn" type="button" value="发送">
                <div id="lxhWrapper">
                </div>
            </div>
        </div>
        <div class="right" id="right"></div>
        <div id="loginArea">
            <p id="info">正在连接服务器...</p>
            <div id="inModal">
                <input type="text" placeHolder="请输入昵称" id="usrName" />
                <input type="button" value="进入" id="loginBtn" />
            </div>
        </div>
        <script src="scripts/jquery-2.1.0.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="scripts/webchat.js"></script>
    </body>
</html>
```

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="webchat | a simple chat application built with node.js and websocket">
        <meta name="viewport"content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>    
       <title>webchat</title>
        <link rel="stylesheet" href="styles/main.css">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
    </head>
    <body>
        <div class="wrapper">
            <div class="banner">
                <div>WebChat</div>
                <span id="onlineCount"></span>
            </div>
            <div id="winChat">
            </div>
            <div class="controls" >
                <div class="items">
                    <input id="colorStyle" type="color" placeHolder='#000' title="font color" />
                    <input id="lxh" type="button" value="lxh" title="lxh" />
                    <label for="imgSend" class="imgLabel">
                        <input type="button" value="表情" style="width: 60px;height: 30px;border: 0;margin: 0;padding: 0;" />
                        <input id="imgSend" type="file" accept="image/gif" value="表情"  />
                    </label>
                    <input id="clearBtn" type="button" value="清空" title="clear screen" />
                </div>
                <input type="text" id="messageInput" placeHolder="enter to send"/>
                <input id="sendBtn" type="button" value="发送">
                <div id="lxhWrapper">
                </div>
            </div>
        </div>
        <div class="right" id="right"></div>
        <div id="loginArea">
            <p id="info">正在连接服务器...</p>
            <div id="inModal">
                <input type="text" placeHolder="请输入昵称" id="usrName" />
                <input type="button" value="进入" id="loginBtn" />
            </div>
        </div>
        <script src="scripts/jquery-2.1.0.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="scripts/webchat.js"></script>
    </body>
</html>
```