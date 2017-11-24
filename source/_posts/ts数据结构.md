---
title: ts数据结构
date: 2017-10-15 10:49:43
tags:
---
学习TypeScript...
<!--more-->

### 栈
后进先出
```ts
export default class Stack<T> {
  private count: number;
  private items: any;

  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString;
    for (let i = 0; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
```

### 队列
FIFO 先进先出
```ts
// object
export default class Queue<T> {
  private count: number;
  private lowestCount: number;
  private items: any;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  /**
   * @description 向队列尾部添加一个
   * @param el 新的项
   */
  enqueue(el: T) {
    this.items[this.count] = el;
    this.count++;
  }
  /**
   * @description 移除队列的第一项，并返回移除的元素
   */
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return res;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    let objString = 'obj:';
    for (let i = this.lowestCount; i < this.count; i++) {
      objString += `${this.items[i]},`;
    }
    return objString;
  }
  size() {
    return this.count - this.lowestCount;
  }
  isEmpty() {
    return this.size() === 0;
  }
}

// array
export default class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }
  enqueue(el: T) {
    this.items.push(el);
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }
  clear() {
    this.items = [];

  }
  toString() {
    let objString = 'obj:';
    for (const i of this.items) {
      objString += `${i}`;
    }
    return objString;
  }
  size() {
    return this.items.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}
```