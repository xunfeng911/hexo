---
title: Vuex与Redux与Mobx
date: 2017-05-25 22:11:12
tags:
  - Redux
  - Vuex
  - MobX
---

分析理解一下
<!-- more -->


## 三种状态管理方案


### MobX
任何源自应用状态的东西都应该自动地获得。
在 React + MobX 组合中，MobX 提供 机制来存储更新应用状态。
React 将应用状态渲染。
#### 核心概念
- 可观测状态 （Observable state）
  通过 `@observable`装饰器，为类属性添加注解。

```js
// es.next
class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}

// es5
function Todo() {
    this.id = Math.random()
    extendObservable(this, {
        title: "",
        finished: false
    })
}
```

- 计算值 （Computed values）
  通过`@computed`装饰器在相关数据发生变化时自动更新
  产生一个二次加工的新值。

```js
class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
      return this.todos.filter(todo => !todo.finished).length;
    }
}
```

- 反应 （Reactions）
  类似于Computed，产生与计算无关的动作，例如打印日志，网络请求，更新界面等

```jsx
 import React from 'react';
 import React from 'react-dom';
 import {observer} from 'mobx-react';

 @observer
 // 监听
 class TodoListView extends React.Component {
   render () {
     rerurn {
       <div>
        <ul>
          {this.props.todoList.todos.map(todo =>
            <TodoView todo={todo} key={todo.id} />
          )}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
     }
   }
 }

 // 注册store
 const TodoView = observer(({todo}) => {
   <li>
        <input
        type="checkbox"
        checked={todo.finished}
        onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
 })
 const store = new TodoList();

ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('mount'));
```

 - 动作（Actions）
 更新状态的方式

```js
store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
);
store.todos[0].finished = true;
```
- 原则
单项数据流
Action -> State -> Views
所有衍生值都会自动同步更新。


#### 使用方法

```jsx
import React from 'react';
import React from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

// 定义状态数据结构
var appState = ovservable({
  timer: 0
})
// 定义动作
appState.TimerAdd = action(()=> {
  appState.timer += 1;
})

// 创建视图响应状态变化
@observer
class TimerView extends React.Component {
  onReset()
  render() {
    timerAdd() {
      this.props.appState.TimerAdd();
    }
    return (
      <div>
      <!--获取状态-->
      {this.props.appState.timer}
      <button onClick="timerAdd">+</button>
    )
  }
}
ReactDOM.render(<TimerView appState={appState} />, document.body);
```

| MobX自始至终只有一份数据引用，没有额外的复制对象的开销，但没有中间件机制，适用于数据流简单的项目。


### Vuex
 Vue专用的状态管理模式。
 Vuex将所有组件共享的状态数据抽取出来，作为一个全局的单例模式管理。这就构建了一个巨大的”视图“树，因此不论视图组件在树的哪个位置，都可以获取状态或触发行为。

 #### 核心概念

 - State 单一状态树
 每个应用仅仅包含一个store实例。