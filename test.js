// let usrState = {
//   name: 'xun',
//   age: 18
// };

// const createStore = (state, stateChanger) => {
//   const listeners = [];
//   const subscribe = (listener) => listeners.push(listener);
//   const getState = () => state;
//   const dispatch = (action) => {
//     state = stateChanger(state, action); // 覆盖原对象
//     listeners.forEach((listener) => listener());
//   };
//   return {getState, dispatch, subscribe};
// };

// const renderApp = (newAppState, oldAppState = {}) => { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
//   if (newAppState === oldAppState) 
//     return; // 数据没有变化就不渲染了
//   console.log('render app...');
//   renderName(newAppState.name, oldAppState.name);
//   renderAge(newAppState.age, oldAppState.age);
// };

// const renderName = (newName, oldName = {}) => {
//   if (newName === oldName) 
//     return; // 数据没有变化就不渲染了
//   console.log('render name...');
//   const nameDom = document.getElementById('name');
//   nameDom.innerHTML = newName.name;
// };
// const renderAge = (newAge, oldAge = {}) => {
//   if (newAge === oldAge) 
//     return; // 数据没有变化就不渲染了
//   console.log('render age...');
//   const ageDom = document.getElementById('age');
//   ageDom.innerHTML = newAge.age;
// };

// const stateChanger = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_USER_NAME':
//       return {
//         ...state,
//         name: action.name
//       };
//       break;
//     case 'UPDATE_USER_AGE':
//       return {
//         ...state,
//         age: action.age
//       };
//       break;
//     default:
//       return state;
//   };
// };

// const store = createStore(usrState, stateChanger);
// let oldState = store.getState(); // 缓存oldState

// store.subscribe(() => {
//   const newState = store.getState(); // 数据可能变化，获取新的 state
//   renderApp(newState, oldState); // 把新旧的 state 传进去渲染
//   oldState = newState; // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
// });

// renderApp(store.getState()); // 首次渲染页面

// const params = {
//   type: 'UPDATE_USER_NAME',
//   name: 'name'
// };
// store.dispatch(params);

// rednerApp(store.getState()); // 渲染新数据
