---
title: three.js入门
date: 2017-03-06 23:03:49
tags:
---
非常想学习webGL和three.js，这次借着百度前端学院来学一波！

<!--more-->

## 起步
直接引用 three.js

### 三大组件
场景 (scene)，相机 (camera)，渲染器 (renderer)

#### scene
场景是所有物体的容器
```js
var scene = new THREE.Scene();
```

#### camera
相机决定了场景中那个角度的景色会显示出来,角度不同看到的景色也不同
```js
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);// 透视相机
```

#### renderer
渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制
```js
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```
渲染器renderer的domElement元素，表示渲染器中的画布，所有的渲染都是画在domElement上的

- 添加物体到场景中

```js
var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

- 渲染

```js
renderer.render(scene, camera);
```

### 画一条线

#### 定义几何体

```js
var geometry = new THREE.Geometry();
```
几何体中的变量`vertices`可以存放点

##### 定义线条的材质

```js
THREE.LineBasicMaterial(parameters)
parameters: {
  Color: '线条的颜色，用16进制来表示，默认的颜色是白色',
  Linewidth: '线条的宽度，默认为1'，
  Linecap: '线条两端的外观，默认是圆角端点',
  Linejoin: '两个线条的连接点处的外观，默认是“round”，表示圆角',
  VertexColors: '定义线条材质是否使用顶点颜色，这是一个boolean值。意思是，线条各部分的颜色会根据顶点的颜色来进行插值',
  Fog: '定义材质的颜色是否受全局雾效的影响'
}
```

```js
var material = new THREE.LineBasicMaterial( { vertexColors: true } )
```

#### 定义顶点颜色

```js
var color1 = new THREE.Color( 0x444444 );
var color2 = new THREE.Color( 0xFF0000 );
```

#### 定义顶点位置,存放到几何体geometry中

```js
var p1 = new THREE.Vector3( -100, 0, 100 );
var p2 = new THREE.Vector3( 100, 0, -100 );
geometry.vertices.push(p1);
geometry.vertices.push(p2);
```

#### 给顶点设置颜色

```js
geometry.colors.push( color1, color2 );
```

#### 定义一条线

```js
var line = new THREE.Line( geometry, material, THREE.LinePieces );
scene.add(line);
```

#### 右手坐标系
x轴正方向向右，y轴正方向向上，z轴由屏幕从里向外。

#### 线条的深入理解
