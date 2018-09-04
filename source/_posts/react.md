---
title: react
date: 2018-08-20 14:20:49
tags:
---
<!-- more-->

## React

### 高阶组件
组件作为函数的参数与返回值

```js
class Home extends Component {
  render() {
    return (
    	// <div>home</div>
    )
  }
}

const setTitle = title => WrappedComponent => {
	// 设置高阶组件名称
	static displayName = `HOC(${getDisplayName(WrappedComponent)})`
	return class HOC extends Component {
		componentDidmount() {
			document.title = title;  
		}
		render() {
			return (
				<WrappedComponent />
			)
		}
	}
};

// 函数调用
const HomePage = setTitle('home')(Home);
// 装饰器
@setTitle('home')
class Home extends Component {
  render() {
    return (
    	// <div>home</div>
    )
  }
}
```

- 属性代理
	在HOC中自定义一些属性，传递到被包裹组件的props当中
- 反向继承
	让HOC直接继承被包裹组件，！要调用super.render()