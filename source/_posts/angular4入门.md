---
title: Angular4入门
date: 2017-08-02 10:49:44
tags:
    - Angular
---
<!--more-->
## Angular4入门

### Angular-cli

#### 全局安装
```shell
sudo npm install @angular/cli -g

ng generate --help  // 查询帮助
```
#### 创建项目
```sh
ng new <ProjectName>
```
相关配置
```sh
--dry-run           // boolean, 默认为 false, 若设置 dry-run 则不会创建任何文件
--verbose           // boolean, 默认为 false
--link-cli          // boolean, 默认为 false, 自动链接到 @angular/cli 包
--skip-install      // boolean, 默认为 false, 表示跳过 npm install
--skip-git          // boolean, 默认为 false, 表示该目录不初始化为 git 仓库
--skip-tests        // boolean, 默认为 false, 表示不创建 tests 相关文件
--skip-commit       // boolean, 默认为 false, 表示不进行初始提交
--directory         // string, 用于设置创建的目录名，默认与应用程序的同名
--source-dir        // string, 默认为 'src', 用于设置源文件目录的名称
--style             // string, 默认为 'css', 用于设置选用的样式语法 ('css', 'less' or 'scss')
--prefix            // string, 默认为 'app', 用于设置创建新组件时，组件选择器使用的前缀
--mobile            // boolean, 默认为 false,表示是否生成 Progressive Web App 应用程序
--routing           // boolean, 默认为 false, 表示新增带有路由信息的模块，并添加到根模块中
--inline-style      // boolean, 默认为 false, 表示当创建新的应用程序时，使用内联样式
--inline-template   // boolean, 默认为 false, 表示当创建新的应用程序时，使用内联模板
```

#### 启动项目
```sh
cd <ProjectName>
npm start -o
ng serve  --open   // 主动打开浏览器窗口
```

```sh
ng g cl <Name> --spec            // 新建 class
ng g c  <Name>                   // 新建组件
ng g d  <Name>                   // 新建指令
ng g e  <Name>                   // 新建枚举
ng g m  <Name> --routing --spec  // 新建模块
ng g p  <Name> --flat=false      // 新建管道
ng g s  <Name> --flat=false       // 新建服务
```

#### 单元测试
```sh
ng test
npm test
```

#### e2e测试
```sh
ng e2e
```

#### 构建压缩代码并实施监控变化的应用程序
```sh
ng build --target=production --watch
```

#### 自定义构建webpack
```sh
ng eject
```

### 实际开发

#### 事件绑定

```html
<!--xun-com.component.html  -->
<span>{{title}}</span>
<!--dom绑定  -->
<input #myInput type="text">
<!--鼠标事件  -->
<button (click)="onClick($event, myInput.value)">鼠标点击事件</button>
<!--键盘事件  -->
<input #keyBoard type="text" (keydown.enter)="onEnter($event, keyBoard.value)">
```

```ts
<!--xun-com.component.ts  -->
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xun-com',
  templateUrl: './xun-com.component.html',
  styleUrls: ['./xun-com.component.css']
})
export class XunComComponent implements OnInit {
  title: string;
  constructor() {
    this.title = 'title'
  }

  ngOnInit() {
  }
  // 事件方法
  onClick(event, val) {
    console.log(event)
    console.log(val)
  }
  onEnter(event, val) {
    console.log(event)
    console.log(val)
  }

}
```

#### 新建服务

```sh
ng g s mail

// 输出
installing service
  create src/app/mail.service.spec.ts     // 用于单元测试
  create src/app/mail.service.ts          // 新建的服务
  WARNING Service is generated but not provided, it must be provided to be used
```

#### 配置服务
```ts
import { MailService } from './mail.service';

@NgModule({

  providers: [
    MailService,
    {provide: 'apiUrl', useValue: 'https://jsonplaceholder.typicode.com/'}
  ],     // 注入服务  
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 更新服务
```ts
import { Injectable } from '@angular/core';

@Injectable()
export class MailService {
  message: string  ='该消息来自MailService';
  constructor() { }
}
```

#### 使用服务
```ts
<!--xun-com.component.ts  -->
import { MailService } from '../mail.service';
...
export class AppComponent {

  constructor(private mailService: MailService) {}
  constructor(
    @Inject(MailService) private mailService,
    @Inject('apiUrl') private apiUrl) {}
  <!--二选其一  -->
  <!-- 不过对于 Type 类型(函数类型) 的对象，我们一般使用 constructor(private mailService: MailService) 方式进行注入。而 Inject 装饰器一般用来注入非 Type 类型的对象。 -->
}
```
```html
<!--xun-com.component.html  -->
<p>{{mailService.message}}</p>
```

#### ngClass
```html
<div [ngClass]="{mousedown: isMousedown}"></div>
```

#### ngStyle
```html
<!--font-size支持px % em  -->
<div>
   <span [ngStyle]="{color: 'red'}" [style.font-size.px]="fontSize" [style.background-color="'red'"]>
      Red Text
   </span>
</div>
```

#### ngModel
- 单独使用ngModel
需要给表单元素添加`name`，为`ngForm.value`对象添加`property`
```html
<input type='text' name='userName' placeholder='Input your userName' ngModel>
```
- 单向绑定[ngModel]
将this.name 初始化绑定到`ngForm.value`上
```html
<input type='text' name='userName' placeholder='Input your userName' [ngModel]="name" />
```

- 双向绑定[(ngModel)]
```ts
<!--module中  -->
import {FormsModule} from '@angular/forms';
...
imports: [
    ...
    FormsModule
  ],
<!--组件中  -->
this.inputValue = 'inputvalue'
<!--模板中  -->
<input #myInput type="text" [(ngModel)]="inputValue">
```

#### @Input
相当于props 父组件==>子组件
```ts
<!--子组件 xun-com.component  -->
import { ..., Input } from '@angular/core';
...
export class XunComComponent implements OnInit {

  @Input() msg: string;
}

<!--父组件 app.component  -->
export class AppComponent {
  msg = {
    data: '数据'
  };
}
```

```html
<!--父模板 app.component  -->
<app-xun-com [msg]="msg"></app-xun-com>

<!--子模板 xun-com.component -->
<span>msg: {{msg.data}}</span>
```

#### @Output
Output装饰器:  让子组件将信息通过事件的方式返回给父组件
```ts
<!--子组件  -->
import {Output, EventEmitter } from '@angular/core';
export class XunComComponent implements OnInit {
  @Input() msg: string;
  @Output() update = new EventEmitter<{title: string}>();
  constructor() {
    this.title = 'xun-com'
    }
}
<!--子组件模板  -->
<button (click)="update.emit(title)">更新</button>

<!--父组件  -->
export class AppComponent {
  constructor() {}
  onUpdate(title) {
    console.log(title)
  }
}
<!--父组件模板  -->
<app-xun-com (update)="onUpdate(title)"></app-xun-com>
```

#### http模块
```ts
<!--导入模块 app.module.ts  -->
...
import { HttpModule } from '@angular/http';
...
@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent, UserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

<!--调用模块  -->
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
...
export class MembersComponent implements OnInit {
  members: Member[];

  constructor(private http: Http) { } // (3)

  ngOnInit() {
    this.http.get(`api`) // (4)
        .map(res => res.json()) // (5)
        .subscribe(data => {
           if (data) this.members = data; // (6)
        });
    }
}
```

#### 路由
- `RouterModule.forRoot()`: 在主模块中定义主要的路由信息
- `RouterModule.forChild()`: 在子模块中定义路由信息
- `<router-outlet></router-outlet>`: 路由视图入口位置
- 动态路由
```ts
// 配置文件
  { path: '/profile/:username', component: ProfileComponent }
// 组件中
import { ActivatedRoute } from '@angular/router';
...
export class SettingsComponent implements OnInit {
  username: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => this.username = params.username);
  }
}
```
- 子路由 children
- loadChildren 从另一个模块中获取子路由

```ts
// 子模块
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'password', component: PasswordSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
})
export class SettingsModule {}

// 父模块
export const ROUTES: Routes = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  // ...
})
export class AppModule {}

```

- Router Directives
  `routerLink`: 跳转指令
  ```html
  <a routerLink="/">Home</a>
  ```
- 路由跳转
  ```ts
  this.router.navigate(['/profile', event.name]);
  ```

### NgModule
@NgModule接收一个用来描述模块属性的元数据对象

- `declarations`:  声明本模块中的视图类
- `exports`: declarations 的子集，可用于其它模块的组件模板
- `imports`: 注册其他模块
- `providers`: 添加全局服务
- `bootstrap`: 根组件


### Directive
- `Component directive`: 构建UI组件，继承于Directive类
- `Attribute directive`: 改变组件的外观或行为
- `Structural directive`: 动态添加或删除DOM元素来改变DOM布局

#### 自定义指令
- `HostBinding`: 实现元素属性绑定
- `Input`: 实现自定义元素属性输入
- `HostListener`: 监听元素的事件
- `Attribute`: 获取指令宿主元素上的自定义属性

#### ngFor: 使用可迭代的每个项作为模板的上下文来重复模板
首先更新mail服务，增加数组
```ts
import { Injectable } from '@angular/core';

@Injectable()
export class MailService {
  message: string = '该消息来自MailService';
  messages: string[] = [
    '天之骄子，加入修仙之路群',
    'Shadows，加入修仙之路群',
    'Keriy，加入修仙之路群'
  ]
  constructor() { }
}
```
更新组件模板
```html
<ul>
  <li *ngFor="let message of mailService.messages; index as i;">
    {{i}} - {{message}}
  </li>
</ul>
```

#### ngIf: 根据表达式的值，显示或移除元素
```html
<div *ngIf="SHOW">show</div>
```
#### ngSwitch
```html
<ul [ngSwitch]='person.country'>
  <li *ngSwitchCase="'UK'" class='text-success'>
      {{ person.name }} ({{person.country}})
  </li>
   <li *ngSwitchCase="'USA'" class='text-secondary'>
      {{ person.name }} ({{person.country}})
  </li>
  <li *ngSwitchDefault class='text-primary'>
    {{ person.name }} ({{person.country}})
  </li>
</ul>
```



### Template Driven Forms
#### 创建表单
ng内嵌`validators`模块
使用`userName.valid`判断验证，`userName.errors`输出错误信息
```ts
<!--html模板  -->
<input
  type="text"
  required
  minlength="3"
  [(ngModel)]="username"
  #userName="ngModel">
  {{userName.valid}}
<div *ngIf="userName.errors?.required">请您输入用户名</div>
<div *ngIf="userName.errors?.minlength">
  用户名的长度必须大于 {{userName.errors?.minlength.requiredLength}}，当前的长度为
    {{userName.errors?.minlength.actualLength}}
</div>

<!--ts模块  -->
export class AppComponent {
  username = 'semlinker';
}
```


#### 表单提交
通过 `#loginForm="ngForm"` 方式获取 `ngForm` 对象，然后通过 `loginForm.value` 来获取表单的值
<!--html模板  -->
```html
<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm.value)">
...
<button type="submit">提交</button>
</form>
```
<!--绑定方法  -->
```ts
onSubmit(value) {
    console.dir(value);
  }
```
通过`ngModelGroup`指令对表单元素进行细化
```html
<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm.value)">
   <fieldset ngModelGroup="user">
    <input
     type="text"
     required
     minlength="3"
     name="username"
     [(ngModel)]="username"
     #userName="ngModel">
    <hr>
    <div *ngIf="userName.errors?.required">请您输入用户名</div>
    <div *ngIf="userName.errors?.minlength">
      用户名的长度必须大于 {{userName.errors?.minlength.requiredLength}}，当前的长度为
        {{userName.errors?.minlength.actualLength}}
    </div>
    <input type="password" ngModel name="password">
   </fieldset>
    <button type="submit">提交</button>
    <hr>
    {{loginForm.value | json}}
  </form>
```

#### 验证状态样式
可以通过 `#userName="ngModel"` 方式获取 `ngModel` 对象，进而通过`userName.dirty`获取控件的状态信息
css类
```css
.input.ng-invalid {
  border: 3px solid red;
}
input.ng-valid {
  border: 3px solid green;
}
```
状态列表
- `valid`: 表单控件有效
- `invalid`: 表单控件无效
- `pristine`: 表单控件值未改变
- `dirty`: 表单控件值已改变
- `touched`: 表单控件已被访问过
- `untouched`: 表单控件未被访问过

#### 单选多选
```html
<div *ngFor="let version of versions;">
  <input
    [attr.id]="version"
      name="version"

      required
      [value]="version"
      type="radio">
    <label [attr.for]="version">{{version}}</label>
</div>
```
#### 特点
- 使用方便，适用于简单环境
- 通过[(ngModel)]实现数据的双向绑定
- 最小化组件类的代码
- 不易于单元测试

### Reactive Form
`FormControl`: 一个为单个表单控件提供支持的类，可用于跟踪控件的值和验证状态.
```ts
ngOnInit() {
  this.myControl = new FormControl('Semlinker');
}
```

`FormGroup`: 包含一组 FormControl 实例，可用于跟踪 FormControl 组的值和验证状态.
<!--组件ts  -->
```ts
export class XunCsComponent implements OnInit {

constructor() {}
  // tslint:disable-next-line:member-ordering
  user: FormGroup;
  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl(''),
      account: new FormGroup({
        email: new FormControl(''),
        confirm: new FormControl('')
      })
    });
  }
  onSubmit() {
    console.log(this.user.value, this.user.valid);
  }
}
```
<!--组件模板  -->
```html
  <form novalidate [formGroup]="user"  (ngSubmit)="onSubmit(user)" >
  <label>
    <span>Full name</span>
    <input
      type="text"
      placeholder="Your full name"
      formControlName="name">
  </label>
  <div formGroupName="account">
    <label>
      <span>Email address</span>
      <input
        type="email"
        placeholder="Your email address"
        formControlName="email">
    </label>
    <label>
      <span>Confirm address</span>
      <input
        type="email"
        placeholder="Confirm your email address"
        formControlName="confirm">
    </label>
  </div>
  <button type="submit">Sign up</button>
</form>
```

#### 表单验证
通过`user.invalid`判断表单验证是否正确
通过`user.controls.name?.errors`获取错误原因
```ts
this.user = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  account: new FormGroup({
    email: new FormControl('', Validators.required),
    confirm: new FormControl('', Validators.required)
  })
});
```

#### FormBuilder
用来简化`FormGroup`+`FormControl`结合
```ts
ngOnInit() {
  this.user = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    account: this.fb.group({
      email: ['', Validators.required],
      confirm: ['', Validators.required]
    })
  });
}
```

#### 特点
- 灵活，适用于复杂场景
- 简化html模板代码，将验证逻辑抽离到组件类中
- 方便跟踪表单控件值变化
- 易于单元测试

### 动态加载已声明的组件

* 定义组件
* 创建组件容器
  `ViewChild`：一个属性装饰器，用来从模板视图中获取对应的元素，可以通过模板变量获取，获取时可以通过 read 属性设置查询的条件，就是说可以把此视图转为不同的实例
  `ViewContainerRef`： 个视图容器，可以在此上面创建、插入、删除组件等等
  ```ts
   @ViewChild("childContainer", { read: ViewContainerRef }) container: ViewContainerRef;
   ```
* 动态创建组件
  `ComponentFactoryResolve`: 一个服务，动态加载组件的核心，这个服务可以将一个组件实例呈现到另一个组件视图上
  通过调用`ComponentFactory`实例的`create()`创建组件
  应用`ComponentFactoryResolver`服务的`resolveComponentFactory()`方法接受组件类，返回`ComponentFactory`
  在组件`constructor`注入该服务
  ```ts
  constructor(private resolver: ComponentFactoryResolver) {}
  ```
  ```ts
  createComponent(type: string) {
    // 删除之前的视图
    this.container.clear();
    // 创建组件实例
    const factory: ComponentFactory<ActXunComponent> = this.resolver.resolveComponentFactory(ActXunComponent);
    // 将组件添加到容器当中
    this.componentRef = this.container.createComponent(factory);
    // 为组建复制
    this.componentRef.instance.type = type;
    // 订阅组件的输出属性
    this.componentRef.instance.output.subscribe((msg: string) => console.log(msg));
  }
  ```
  销毁组件
  ```ts
  ngOnDestroy() {
    this.componentRef.destroy();
  }
  ```
* 在`NgModule`的`entryComponents`属性中添加动态组件
```ts
@NgModule({
  ...,
  declarations: [AppComponent, ActXunComponent],
  bootstrap: [AppComponent],
  entryComponents: [ActXunComponent],
})
export class AppModule { }
```

### 动态加载已声明的表单

### Pipe (管道)
过滤器，对输入的数据进行处理。

#### Ng内建管道
- String => String
  * UpperCasePipe（大写转换）
  ```html
  <p>{{'Angular' | uppercase}}</p>
  <span>输出ANGULAR</span>
  ```

  * LowerCasePipe (小写转换)
 ```html
  <p>{{'Angular' | lowercase}}</p>
  <span>输出angular</span>
  ```

  * TitleCasePipe (首字母大写)
   ```html
  <p>{{'angular' | titlecase}}</p>
  <span>输出Angular</span>
  ```

- Number => String
  * DecimalPipe (数值格式化)
  ```html
  <p>{{expression | number[: digiInfo] }}</p>
  <p>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</p>
  <p>{{ 3.14159265 | number: '1.3-5' }}</p>
  <p>输出3.14159</p>
  ```

  * PercentPipe （百分比格式化）
  ```html
  <p>{{expression | percent[: digiInfo] }}</p>
  <p>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</p>
  <p>{{ 1 | percent: '1.3-5' }}</p>
  <p>输出100.000%</p>
  ```

  * CurrencyPipe (货币格式化)
  ```html
  <p>{{expression | currency[: currencyCode[: symbolDisplay[: digiInfo]]] }}</p>
  <p>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</p>
  <p>currencyCod是指货币代码，其值为ISO 4217标准，人民币CNY,美元USD,欧元 EUR.
symbolDisplay 是一个布尔值，true时显示货币符号($￥) false显示货币码</p>
  <p>{{ 1 | currency: 'USD': true }}</p>
  <p>输出100.000%</p>
  ```

- Object => String
  * JsonPipe (对象json化)
  ```html
  <p>{{ {name: 'xuncs'} | json}}</p>
  <p>输出{ "name": "xuncs" }</p>
  ```

  * DatePipe (日期格式化)
  ```html
  <p>{{ new Date() | date: 'shortTime' }}</p>
  <p>语法：{{expression | date:format}}</p>
  <p>
    y 年 y使用4位数字表示年份(2017),yy使用两位数字表示(17)
    M 月 M 1位或两位数字(2或10、11、12),MM 两位数字表示，前面补0(02)
    d 日 d 一位或两位数字(9) dd两位数字，前面补0(09)
    E 星期 EEE 三位字母缩写的星期 EEEE 星期全称
    j 12小时制时间 j (9 AM) jj (09 AM)
    h 12小时制小时 h(9) hh (09)
    H 24小时制小时 H(9) HH (09)
    m 分 m (5) mm (05)
    s 秒 s (1) ss (01)
    z 时区 z China Standard Time
  </p>
  ```

- Tools (工具类)
  * SlicePipe (数组或字符串取切割)
  ```html
  <p>{{ 'xuncs' | slice:0:3 }}</p>
  <p>输出：xun</p>
  <p>语法：{{expression | slice: start [: end] }}</p>
  ```
  * AsyncPipe
  `Promise`: 返回单个值，不可取消
  `Observalbe`: 随着时间推移发出多个值，可以取消，支持`map`,`filter`,`reduce`等操作符，延迟执行
  * I18nPluralPipe
  * I18nSelectPipe

#### 管道参数
管道可以接收任意数量的参数。
用法: 参数之间用`:`隔开

#### 管道链
将多个管道连接在一起，组成管道链对数据进行处理
```html
<p>{{ 'angular' | slice:0:3 | uppercase }}</p>
<p>输出：ANG</p>
```

#### 管道分类

- pure管道
仅当管道输入值变化的时候，才执行转换操作，默认的类型是 pure 类型。(备注：输入值变化是指原始数据类型如：string、number、boolean 等的数值或对象的引用值发生变化)

- impure管道
在每次变化检测期间都会执行，如鼠标点击或移动都会执行 impure 管道

#### 自定义管道 (@Pipe)
- 使用 @Pipe 装饰器定义 Pipe 的 metadata 信息，如 Pipe 的名称 - 即 name 属性
- 实现 PipeTransform 接口中定义的 transform 方法
```
ng g p  <Name> --flat=false      // 新建管道
```

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xunTest',
  // 非纯管道
  pure: false
})
export class XunTestPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
```
