---
title: softwareEngineering
date: 2017-11-29 15:02:47
tags:
---

<!--more-->

#### 软件的含义
- 提供功能与性能的指令 / 计算机程序  的集合
- 处理信息的数据逻辑
- 按照商业逻辑处理
- 产品文档

#### 软件的特点
- 表现形式： 逻辑性产品，复杂，无磨损，开发环境受限，成本高
- 生产方式： 脑力，手工开发
- 要求： 受计算机系统限制，涉及社会等因素

#### 软件危机

##### 表现
- 开发成本/进度预估不准
- 用户不满意
- 质量差
- 不可维护
- 缺少文档
- 成本过高
- 开发速度过慢

##### 原因
- 客观：逻辑复杂，规模庞大
- 主管：开发方式不正确，忽视需求分析/维护/写文档

##### 解决途径
- 按工程化的原则和方法组织软件开发工作

#### 软件工程基本原理
- 阶段性生命周期
- 阶段评审
- 产品控制
- 现代程序设计架构
- 结果清晰审查
- 开发人员少而精
- 不断迭代产品

#####  研究内容
- 软件开发技术
- 软件工程管理

##### 三要素
- 方法
- 工具
- 过程

##### 生命周期
- 可行性分析与设计阶段
- 需求分析阶段
- 设计阶段
- 实现阶段
- 测试阶段
- 运维阶段

#### 软件过程
指软件整个生命周期，从需求获取，需求分析，设计，实现，测试，发布和维护一个过程模型。

##### 过程模型
- 传统开发模型
	- 瀑布模型
		特征：一次性单向开发，质量保证，文档规范
		适合：需求明确的项目
		优点：质量保证，严格品控
		缺点：周期长，不灵活，难变动
	- 快速原型模型
		特征：快速构建，用户测试反馈，成本低
		适合：需求模糊的中小型软件
		优点：快速，符合用户预期
		缺点：难管理，变动大，架构规范
- 演化开发模型
	- 增量模型
		特征：对功能以一系列增量的方式开发
		适合：小而可用的软件
		优点：灵活，降低风险，可持续开发
	- 螺旋模型
		特征：每个阶段都风险评估的快速原型模型
		适合：内部开发的大规模软件项目
		优点：减少过多测试或测试不足带来的风险，项目稳定
		一个周期：确定目标=>确定方案=>风险评估=>开发=>评估，计划
- 喷泉模型
	特征：每个阶段相互重叠
	优点：提高效率，节省时间，适合面向对象
	缺点：不利于管理，规范，文档重要

##### 开发方法
- 面向过程的结构化方法
	优点：
- 面向对象的开发方法
	= 对象+类+继承+消息
	OOA：分析对象，外部关联，内部结构
	OOD：归纳抽象类，规范接口

#### 软件需求
用户对目标软件在功能、行为、性能、设计约束等方面的期望

##### 软件需求工程的必要性
需求分析是介于系统分析和软件设计阶段之间的重要桥梁
以系统规格说明和项目规划做基点，从软件的角度调整分析
需求分析师软件设计实现测试维护的主要基础
良好的需求分析有助于避免早起错误，提高效率，降低成本

##### 需求分析的任务
- 确定系统的功能需求
- 数据分析
- 定义逻辑模型
- 适应需求变更

##### 需求分析原则
- 从用户的角度考虑
- 以流程为主线
- 注重复用
- 划分需求优先级
- 需求变更及时反馈

##### 需求分析内容
- 功能需求
- 性能需求
- 领域需求
- 其他需求

#### 结构化需求分析和建模
- 核心：数据
- 实体关系模型
	描述数据建模过程，刻画系统静态特征
- 数据流图
	对功能，操作流程进行分解，完成功能建模
- 状态转换图
	系统行为建模，通过外部事件触发

##### 数据模型
实体-联系图，描述数据对象间的关系

##### 功能模型
数据流图，描绘数据在软件中的变换逻辑过程

##### 行为模型
状态转换图，描绘系统通过各种行为模式在不同状态间转换的方式

##### 建模目的
- 使分析系统化
- 模型是评审的焦点，是确定系统完整性，一致性，规格说明准确性的关键
- 模型是设计的基础

##### 建模的原因
- 在建模中了解系统
- 通过抽象降低复杂性
- 有助于回忆细节
- 有助于开发间，与用户交流
- 提供开发维护文档

##### 数据字典
- 数据流
- 数据流分量
- 数据存储
- 处理

#### 软件设计

##### 目的
构造一个高内聚，高可靠性，高维护性，高效率的软件模型
为提高软件质量做基础

- 过程设计：状态转换图，控制规格说明，加工规格说明
- 接口设计：数据流图
- 体系结构设计：数据流图
- 数据设计：数据词典，实体关系图

##### 原则
- 分而治之，模块化
- 重用设计模式
- 可跟踪性
- 灵活性
- 一致性


##### 概要设计
将软件需求转化为数据结构和软件的系统结构，确定模块间相互关系

##### 详细设计设计
通过结构细化得到数据结构与算法

##### 总体设计过程
- 设想供选择的方案
- 选择合理方案
- 推荐最佳方案
- 功能分解
	- 结构设计 模块化组件化设计
	- 过程设计 模块处理过程
- 设计软件结构
- 数据库设计

##### 设计原理
- 抽象与逐步求精 
	控制复杂性
- 模块化
	使程序获得智能化管理
- 信息隐藏
	隐藏的信息只能通过暴露的接口访问
	提高模块独立性，减少维护的影响
- 内聚度
	衡量一个模块内部各个元素彼此间的紧密程度
	- 7：偶然性内聚
	- 6：逻辑性内聚
	- 5：时间性内聚
	- 4：过程性内聚
	- 3：通信性内聚
	- 2：顺序性内聚
	- 1：功能性内聚
- 耦合度
	衡量不同模块间相互依赖的紧密程度
	- 7：非直接耦合
	- 6：数据耦合
	- 5：特征耦合
	- 4：控制耦合
	- 3：外部耦合
	- 2：公共耦合
	- 1：内容耦合

##### 启发式原则
- 改进软件结构提高模块独立性
- 模块规模适中
- 深度、宽度、扇入和扇出适当
- 模块的作用域应在控制域之内
- 设计单入口单出口的模块，力争降低模块接口复杂度
- 模块功能可预测

#### 结构化设计方法

##### 思想
- 基于模块独立性和信息隐藏原则
- 自顶向下，逐步求精
- 分解与抽象结合
- 应用结构化程序设计

##### 面向数据流 SD
- 确定信息流的类型
- 划定流界
- 将数据流图映射为程序结构
- 提取层次控制结构
- 通过设计复审和使用启发式策略进一步精化

##### 变换分析法 迭代
在数据流图中，数据流经过输入，系统变换，输出，完成数据分析。
- 复审基本系统模型
- 复审精化软件数据流图
- 确定DFD特性，判断是变换流还是事务流
- 划定输入流和输出流界限，孤立变换中心
- 依次分解

##### 事物分析法
- 复审基本系统模型
- 复审并精化软件数据流图
- 确定数据流图特性
- 指出事务中心，确认动作路径的数据流特性
- 把数据流图映射为事务处理型的程序结构
- 分解并精化石斛结构及动作路径
- 使用启发式设计策略，精化程序结构雏形，改良软件质量

##### 面向数据结构 DSSD
- 确定数据结构特征
- 用顺序/选择/重复三种基本形式表示数据
- 把数据结构表示映射为软件的控制结构
- 用与具体方法配套的设计指南进一步精化控制结构
- 开发软件的过程性描述

#### 软件实现及测试

##### 程序设计语言分类
- 机器语言
- 汇编语言
- 高级语言

- 基础语言(BASIC,FORTRAN,COBOL,ALGOL)
- 结构语言(PL/1,PASCAL,C．ADA)
- 专用语言(FORTH,PROLOG,LISP)
- 系统实现语言(C)
- 静态高级语言(COBOL,FORTRAN)
- 动态高级语言
- 块结构高级语言(ALGOL,PASCAL)
- 可视化编程语言(VB,VC,PB,BC,C++BUILDER) 

##### 编程语言特点
- 心理学观点
	- 一致性
	- 多义性
	- 局限性
	- 易编码性
	- 可移植性
	- 可维护性
	- 配套开发工具
- 工程观点
	- 易于把设计翻译为代码
	- 编译器效率
	- 源代码可移植性
	- 开发法工具可用性
	- 可维护性

##### 编写风格要求
- 节简化 提供简洁代码
	- 避免程序中不必要的动作和变量
	- 避免变量名重载
	- 减小程序体积
	- 提高运行速度
	- 避免模块冗杂
	- 避免全局变量副作用
- 模块化 把代码划分为内聚度高，富有意义的功能块
	- 确保物理和逻辑功能密切想逛
	- 限定一个模块完成一个功能
	- 检查代码重复率
- 简单化 去掉过分复制和不必要的矫揉造作
	- 采用简单的算法
	- 简单的数据结构
	- 对象命名一致性
	- 简化算术，逻辑表达式
- 结构化 把程序的各个构建组织成一个有效的系统
	- 按标准化的次序说明数据
	- 按字母顺序说明对象名
	- 使用读者明了的结构化程序部件
	- 根据应用背景排列程序各部分
	- 不随意为效率而牺牲可读性
	- 让机器多做重复工作
	- 用公共函数调用代替重复出现的表达式
	- 检查参数传递情况
	- 检查多层嵌套循环
	- 坚持使用统一缩进规则
	- 只编写单入口单出口的代码
- 文档化
	- 有效的使用注释
	- 使用含义鲜明的变量名
	- 协调使用程序块注释和程序行注释
	- 始终坚持写文档
- 格式化 使程序布局合理清晰明了
	- 有效的使用编程空间
	- 适当插入括号 排出多义性
	- 有效使用空格

##### 测试模型
- V 
定义了软件测试如何与软件工程各阶段相融合，描述了各级别软件测试与软件开发各阶段的对应关系
- W
- H
对W模型在更高层次上的线性抽象。在任何一个开发流程，只要有必要，且测试配置已准备就绪，即可进行测试活动


##### 测试原则
- 应尽早地和不断地进行测试
- 开发人员应尽量避免参加测试
- 注重测试用例的设计和选择
- 增量式测试
- 充分注意测试的群集现象
- 合理安排测试计划，严格执行测试计划
- 全面统计和分析测试结果
- 保存测试文档，并及时更新

##### 白盒测试
结构测试，α测试
- 逻辑测试，完全了解结构及处理过程
- 按照内部逻辑测试，检查是否能按预期工作
- 分类： 逻辑覆盖、循环测试，路径测试
- 设计原则
	- 保证所有判断的分支至少执行一次
	- 保证所有循环体至少循环一次
	- 保证判断和循环的所有边界的可能取值都执行一次
 	- 保证每条独立路径都执行一次

##### 黑盒测试
功能测试，β测试
- 不考虑内部结构和处理过程
- 仅测试输入输出是否完整正确
- 错误：功能错误，界面错误，数据结构错误，性能错误，初始化错误
- 方案考虑
	- 如何测试功能有效性
	-  哪些类型的输入可构成好测试用例
    - 系统是否对特定的输入值特别敏感
    - 怎样化定数据类的边界
    - 系统能够承受什么样的数据率和数据量
    - 数据的特定组合将对系统运行产生什么影响

#### 面向对象
OO=Objects + Classes + Inheritance + Communication with messages
                                                                    
##### 面向对象方法
- 任何事物都是对象构成
- 把所有对象组合划分为类，类中包含数据方法
- 继承派生
- 对象之间通过消息传递联系

##### 优点
- 与人类习惯的思维方法一致
- 稳定性好
- 代码利用率高
- 可维护性强

##### 对象
对象是对属性值和操作的封装体，是类的实例化。
- 模块独立性
- 动态连接性
- 易维护性

##### 类
对具有相同属性和行为的一个或多个对象的抽象描述
- 由方法和数据构成
- 类的实例化是对象
- 对象的内部状态只能通过内部方法修改
- 类是一解决一类问题的模块，提供方法，数据模板

##### 实例
类的具体对象

##### 消息
- 接收消息的对象
- 消息选择符
- 零或多个变元

##### 方法
对象所执行的操作

##### 属性
类中定义的抽象数据

##### 继承
子类继承父类的数据和方法，可传递
- 减少代码，提高复用性
- 清晰体现相关类的层次结构
- 自动传播代码
- 在基础类上构造扩展
- 多重继承
- 单一继承

##### 模型
- 对象模型：描述系统数据结构，静态结构
	- 确定类&对象
	- 确定关联
	- 划分主题（根据问题领域）
	- 确定属性
	- 识别继承关系

- 动态模型：描述系统控制结构，交互次序
	- 编写典型交互行为的脚本
	- 从脚本中提取出事件
	- 排列事件发生的次序，状态图
	- 比较状态图，检查一致性
- 功能模型：描述系统功能，数据变换
	- 画出基本系统模型图
	- 画出功能级数据流图
	- 描述处理框功能


##### 层次
- 主题层（范畴层）：定义主题
- 类&对象层：确定对象
- 结构层：确定结构
- 属性层：定义属性和实例联系
- 服务层：定义操作和消息联系

















