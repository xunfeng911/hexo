---
title: TypeScript的学习
date: 2017-03-23 22:27:15
tags:
---
学习TypeScript，向一个后端迈进！

<!--more-->

### SOLID原则
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


### 基础类型 强类型

#### 基础类型
```ts
// 布尔值
let isDone: boolean = false;
// 数字 支持二、八、十、十六进制
let isNumber: number = 10;
// 字符串
let isString: string = "string";
// 模板字符串
let isExpr: string = `hello, ${isString}`;
// 数组
let isArr: number[] = [1, 2, 3];
// 数组泛型
let isList: Array<number> = [1, 2, 3];
// 元组 Tuple（可以定义一个已知元素数量的数组，各个元素类型不必相同
let x: [string, number];
x = ['string', 0];
x = [0, 'string']; // error
// 当访问一个越界的元素，会使用联合类型替代
x[3] = 'world'; // x[3] 可以被赋值为（string | number）类型
```

#### 枚举
`enum`
```ts
enum Color {Red, Green, Blue};
console.log(Color);
// {0: "Red", 1: "Green", 2: "Blue", Red: 0, Green: 1, Blue: 2}
let c:Color = Color.Green;
console.log(c); // 1
```
#### 任意值 any
```ts
let notSure: any = 'any';
notSure = 1;
notSure = false;
let list: any[] = [1, true ,'any'];
```
#### 空值 void
```ts
function returnVoid():void {
  alert('is null');
}
let unusable: void = null;
let unu:void = undefined;
```

#### 类型断言
any值的指定猜测
```ts
let someValue: any = "some strings";

let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

### 接口 interface

```ts
// 自定义的属性检查
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```
#### 属性
```ts
interface userInfo {
  name?: string;  // 可选属性
  readonly age: number; // 只读属性
  [propName: string]: any; // 额外属性定义
}
```
#### 函数类型
```ts
interface searchFunc {
    (src: string, sub: string): boolean;
}

let mySearch: searchFunc;
mySearch = (srcb, sub) => {
    let res = srcb.search(sub);
    if (res === -1) {
        console.log('false');
        return false;
    } else {
        console.log('true');
        return true;
    }
}
mySearch('aaaa', 'a'); // true
```
#### 可索引的类型
```ts
interface StringArray {
  [index: number]: string;
}
// 当使用 number 去索引 StringArray 时，会返回 string 类型的值。

interface NumberDictionary {
  [index: string]: number;
  length: number;
  name: string;   //error `name`的类型不是索引类型的子类型
}
```

#### 类类型
```ts
interface IsTime {
  currentTime: Date;
  setTime(d: Date);
}
class Clock implements IsTime {
  currentTime: Date;
  setTime(d: Date) {
        this.currentTime = d;
    }
  constructor(h: number, m: number) { }
}
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
```

#### 扩展接口
```ts
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
// 一个接口可以继承多个接口，创建出多个接口的合成接口。
```

#### 混合类型
```ts
// 一个对象可以同时作为函数和对象使用,并带有额外属性。
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}
```

#### 接口继承类
```ts
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control {
    select() { }
}

class TextBox extends Control {
    select() { }
}

class Image {
    select() { }
}

class Location {
    select() { }
}
```
在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上， SelectableControl就像Control一样，并拥有一个select方法。 Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的。



### 类 Class

#### 继承 extends
```ts
class People {
    name: string;
    work: string;
    constructor(theName: string, theWork: string) {
        this.name = theName;
        this.work = theWork;
    }
    getWork() {
        console.log(`${this.name} is ${this.work}`);
        
    }
}

class Student extends People {
    constructor(name: string) {
        super(name);
        this.work = "student";
    }
    getWork() {
        console.log('extend');
        super.getWork();
    }
}

let sam = new Student("sam")
sam.getWork()
```

#### 公共，私有与受保护的修饰符
默认为： public

私有：private，不能在声明此类的外部访问
```ts
  private name: string;
```

protected， 在派生类中仍然可以访问
```ts
  protected name: string;
```
readonly 只读
```ts
  readonly name: string;
```

#### 存取器
支持使用 get / set 截取对象成员的访问

```ts
class Employee {
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (true) {
      this._fullName = newName;
    }
  }
}

let employee =new Employee();
employee.fullName = "name";
 ```

#### 静态属性 static
存在于类本身上面而不是类的实例上。
```ts
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

#### 抽象类
抽象类做为其它派生类的基类使用。 
它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。
``` ts
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type
```

### 函数

#### 函数定义类型
```ts
let myAdd = (x: number, y: number): number => {
    return x + y;
}
// 设定返回值为 number型
```
#### 可选参数和默认参数
```ts
function buildUser(firstName: string = "you", lastName?: string) {
  if(lastName) {
    return firstName + " " +lastName;
  } else {
    return firstName;
  }
}
// 可选参数必须跟在必须参数后面。
```

### 泛型