---
title: TypeScript中的OOP
date: 2017-03-23 22:27:15
tags:
---
学习TypeScript，向一个后端迈进！

<!--more-->

#### SOLID原则
|en    |     en      |ch   |
| ------------- |:-------------:| -----:|
| SRP | The Single Responsibility Principle | 单一责任原则 |
| OCP | The Open Closed Principle | 开放封闭原则 |
| LSP | The Liskov Substitution Principle | 里氏替换原则 |
| DIP | The Dependency Inversion Principle | 依赖倒置原则 |
| ISP | The Interface Segregation Principle | 接口分离原则 |

- 单一职责原则
表明软件组件（函数，类，模块）必须专注于单一的任务，当这个类需要承当其他类型的责任的时候，就需要分解这个类。
- 开放封闭原则
表明软件设计时必须时刻考虑到（代码）可能的发展（扩展性），但是程序的发展必须最少地修改已有的代码。也就是扩展开放，修改封闭。
- 里氏替换原则
表明只要继承的是同一个接口，程序里任意一个类都可以被其他的类替换。替换后不需要其他额外的工作程序就能像原来一样运行。
- 依赖倒置原则
表明一个方法应该遵从依赖于抽象（接口）而不是一个实例（类）的概念。
高层模块不应该依赖于低层模块，二者都应该依赖于抽象
抽象不应该依赖于细节，细节应该依赖于抽象
- 接口隔离原则
不能强迫用户去依赖那些他们不使用的接口。换句话说，使用多个专门的接口比使用单一的总接口总要好。


#### 类
