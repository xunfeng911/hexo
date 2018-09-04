---
title: redux学习笔记
date: 2017-05-04 09:38:19
tags: 
  - react
  - javascript
---
愿这次笔记能记好。

<!-- more-->

#### <strong class="title">redux(一种架构模式)</strong>
不同的组件之间需要共享读写一些数据。

#### <strong class="title">dispatch</strong>
定义 dispatch 专门负责数据的修改:
``` js
function dispatch (action) {
  switch (action.type) {
    case 'UPDATE_USER_NAME':
      usrState.name = action.name;
      break;
    case 'UPDATE_USER_AGE':
      userState.age = action.age;
      break;
    default:
      break;
  };
};
```

对数据的操作必须通过dispatch函数，
`action`是一个对象，包含`type`,`data`等内容。

``` js
const params = {type: 'UPDATE_USER_NAME', name: 'name'};
dispacth(params);
// 修改了name
```

所有的全局变量数据必须先通过 dispatch, 并且必须用 action 通过 switch 确定修改什么。
因此，无需再担心共享数据状态修改的问题。


#### <strong class="title">store 构建state/dispatch 的集合</strong>

`createStore`
``` js
function createStore (state, stateChanger) {
  const getState = () => state
  const dispatch = (action) => stateChanger(state, action)
  return {getState, dispatch}
}
```
`state`：应用程序状态。
`stateChanger`:变化方法。
`getState`:获取state的数据。
`dispatch`:修改数据，接收action。

如下修改数据生成的方式
``` js
let usrState = {
  name: 'xun',
  age: 18
};

const renderApp = (user) => {
  const userDOM = document.getElementById('user');
  userDOM.innerHTML = `${user.name},age:${user.age}`;
};

const createStore = (state, stateChanger) => {
  const getState = () => state;
  const dispatch = (action) => stateChanger(state, action);
  return {getState, dispatch};
};

const stateChanger = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER_NAME':
      usrState.name = action.name;
      break;
    case 'UPDATE_USER_AGE':
      userState.age = action.age;
      break;
    default:
      break;
  };
};

const store = createStore(usrState, stateChanger);

renderApp(store.getState()); // 首次渲染页面

const params = {type: 'UPDATE_USER_NAME', name: 'name'};
store.dispatch(params);

rednerApp(store.getState()); // 渲染新数据
```
通过`store.dispatch`修改数据
通过`store.getState`获取数据

#### <strong class="title">监控数据变化</strong>
上面的代码如果不手动renderApp的话，页面数据不会更新，因此需要自动渲染数据。
修改`createStore`
``` js
const createStore = (state, stateChanger) => {
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    stateChanger(state, action);
    listeners.forEach((listener) => listener());
  };
  return {getState, dispatch, subscribe};
};
```
通过`store.subscribe(listener)`传入监听函数，并存入数组中
初始化时把`renderApp`传入数组中
``` js
const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState()) // 首次渲染页面

const params = {type: 'UPDATE_USER_NAME', name: 'name'};
store.dispatch(params);
// 自动更新数据...
```

#### <strong class="title">纯函数</strong>
- 函数的返回结果只依赖于它的参数
- 执行过程中不产生任何副作用

#### <strong class="title">共享结构的对象,优化性能</strong>
更新时，部分属性无改变，但仍旧重新渲染，耗费性能。
`解决方案`:在渲染函数执行之前判断传入的新数据和已有的数据是否相同。
``` js
const obj = { a: 1, b: 2}
const obj2 = { ...obj, b: 3, c: 4 } // => { a: 1, b: 3, c: 4 }
```
`obj2`潜复制`obj`,并能覆盖，拓展。为新旧数据对比提供支持。

``` js
let usrState = {
  name: 'xun',
  age: 18
};

const createStore = (state, stateChanger) => {
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    state = stateChanger(state, action);  // 覆盖原对象
    listeners.forEach((listener) => listener());
  };
  return {getState, dispatch, subscribe};
};

const renderApp = (newAppState, oldAppState = {}) => { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return; // 数据没有变化就不渲染了
  console.log('render app...');
  renderName(newAppState.name, oldAppState.name);
  renderAge(newAppState.age, oldAppState.age);
};

const renderName = (newName, oldName = {}) => {
  if (newName === oldName) return; // 数据没有变化就不渲染了
  console.log('render name...');
  const nameDom = document.getElementById('name');
  nameDom.innerHTML = newName.name;
};
const renderAge = (newAge, oldAge = {}) => {
  if (newAge === oldAge) return; // 数据没有变化就不渲染了
  console.log('render age...');
  const ageDom = document.getElementById('age');
  ageDom.innerHTML = newAge.age;
};

const stateChanger = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER_NAME':
      return {
        ...state,
        name: action.name
      }
      break;
    case 'UPDATE_USER_AGE':
      return {
        ...state,
        age: action.age
      }
      break;
    default:
      return state;
  };
};

const store = createStore(usrState, stateChanger);
let oldState = store.getState(); // 缓存oldState

store.subscribe(() => {
  const newState = store.getState(); // 数据可能变化，获取新的 state
  renderApp(newState, oldState); // 把新旧的 state 传进去渲染
  oldState = newState; // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
});

renderApp(store.getState()); // 首次渲染页面

const params = {type: 'UPDATE_USER_NAME', name: 'name'};
store.dispatch(params);

rednerApp(store.getState()); // 渲染新数据
```
#### <strong class="title">reducer</strong>
让`createStore`接受一个纯函数`reducer`为参数
`reducer`接受`action`&`state`两个参数
如果没有传入state，返回初始化的数据，否则根据action复制/覆盖产生新state

``` js
const createStore = (reducer) => {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}
const themeReducer (state, action) => {
  if (!state) return {
    themeName: 'Red Theme',
    themeColor: 'red'
  }
  switch (action.type) {
    case 'UPATE_THEME_NAME':
      return { ...state, themeName: action.themeName }
    case 'UPATE_THEME_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

const store = createStore(themeReducer)
```

#### <strong class="title">REDUX的套路</strong>
``` js
/ 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

// 生成 store
const store = createStore(reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

// 首次渲染页面
renderApp(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
```


#### redux-saga
- 集中处理 redux 副作用问题 (异步流)
- 被实现为 generator 
- watch/worker（监听->执行）的工作形式


### NgRx
通过 Action 触发 reducer去更改状态 更改 store
状态：一个包含action和reducer的函数的映射。
  - `Action`: 状态改变的动作。描述事件的发生
  - `ActionReducer`: 创建Reducer
  - `ActionReducerMap`: 注册一系列的Reducer
  - `MetaReducer`: 
  - `StoreModule`: 用来配置Reducer的模块
  - `createFeatureSelector`:
  - `createSelector`
  - `Store`
