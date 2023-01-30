# js
## es6 新特性
1. 块级作用域 let const
2. Symbol数据类型
3. class
4. 解构赋值 (...)
5. 模块导入导出(import/export)
6. Set/Map数据类型
7. Proxy代理
8. 函数设置默认值
9. 新增API，如isArray、assign
10. for of遍历(只可循环可迭代数据)
## var、let 和 const 区别

1. var 变量会提升，全局会放到 window 里
2. var 可以重复生命
3. const let 是块级作用域
4. const 定义后不可修改，但是引用对象内部属性可修改。

## cookie、 localStroage 和 sessionStroage 区别

1. localStroage 永久保存，sessionStroage 关闭当前会话清空
2. cookie 存储较小 4kb 其他 5M
3. cookie 可以设置过期事件，默认关闭会话失效
4. cookie 每次请求会在 http 头中

## 闭包是什么？闭包用途？

## 定义

1. 简单说闭包是一个函数返回一个函数，且该函数使用外层函数变量。
2. 由于外层函数变量被返回的函数调用，所以外层函数执行完成后，函数作用域无法释放，形成闭包。

### 用途

1. 定义私有变量，减少全局变量污染，
2. 柯里化函数，
3. 防抖与节流。

## 事件循环

event loop：

1. js 是单线程，异步操作分为宏任务和微任务，先执行主函数，宏任务和微任务分别放到对应任务队列中，
2. 当主函数执行完成后，会清空微任务，在清空微任务过程中如果产生新的微任务，还会添加到微任务队列中，等待执行，
3. 当微任务队列清空后，去宏任务队列中，依次执行
4. 每个宏任务执行完成，都需要先清空微任务队列，再执行下一个宏任务
5. 宏任务包括： setTimeout setInterval 等
6. 微任务包括：promise.then() 等

## 节流实现

delay 内只执行一次

```js
function throttle(fn, delay) {
  let lastTime = 0
  return function (...arg) {
    let currentTime = new Data().getTime()
    if (currentTime - lastTime >= delay) {
      fn.apply(this, arg)
      lastTime = currentTime
    }
  }
}
```

## 防抖实现

单位时间内，频繁触发一个事件，以最后一次触发为准

```js
function debounce(fn, delay) {
  let timer = null
  //多次调用，会先把之前的定时器清空（内部方法就不再执行），以最后一次调用的定时器为准，等待执行
  return function (...arg) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}
```

## 执行结果

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  //TODO: 是否添加 await有很大区别
  // 1.await 执行完成后，会把后面的代码放入微任务中，
  // 2.这里执行完成后会把一个空代码放入微任务，当这个空代码执行完成后，async1中的await才执行完成，
  // 3.这时才会把console.log('async1 end')放入微任务，此时console.log('promise3')已经放入微任务中，所以async1 end输入在 promise3之后
  await console.log('async2')

  //如果没有await ，这里执行完成，async1中的await即执行完成，会马上把console.log('async1 end')放入微任务，此时promise还未执行，所以async1 end输入在 promise3之前
  // console.log('async2');
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})
console.log('script end')
```

## 数组转树结构

```js
// function arrayToTree(array, parentId = 0) {
//   const result = []
//   let temp = []
//   for (let i = 0; i < array.length; i++) {
//     if (array[i].parentId == parentId) {
//       result.push(array[i])
//     } else {
//       temp.push(array[i])
//     }
//   }
//   if (temp.length > 0) {
//     for (let i = 0; i < result.length; i++) {
//       result[i].children = arrayToTree(temp, result[i].id)
//     }
//   }
//   return result
// }
function arrayToTree(array, parentId = 0) {
  if (!Array.isArray(array)) {
    throw new Error('arrayToTree expects an array as input')
  }
  if (
    !array.every(
      item => typeof item === 'object' && 'id' in item && 'parentId' in item
    )
  ) {
    throw new Error('Invalid item format in input array')
  }

  const result = array.filter(item => item.parentId === parentId)
  result.forEach(item => {
    item.children = arrayToTree(array, item.id)
  })
  return result
}
```

## 说一下浅拷贝和深拷贝的区别

1. 浅拷贝只拷贝一层，基本类型值复制，引用类型如果属性是个对象，指向还是同一地址，
2. 深拷贝彻底分开，之间毫无影响
3. 可以使用 JSON.parse(JSON.stringify())实现，但是不支持 undefined、Symbol 和方法拷贝
4. 手写递归方法赋值

```js
//深拷贝

function deepCopy(obj) {
  if (obj.toString() !== '[object Object]') return
  // if (Object.prototype.toString.call(obj) !== '[object Object]') return
  var result = {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return result
}
```

## new 的作用

一般出现在构造函数使用 ，new 操作符帮我们做了四件事：

1.  创建一个新对象；
2.  将构造函数的作用域赋给新对象（因此 this 就指向了这个对象）；
3.  执行构造函数中的代码（为这个新对象添加属性）；
4.  返回新对象。

## 判断数组几种方式

Array 和 Date 都继承于 Object，并改写了 toString() 方法 Object.toString() = '[object Object]'

typeof 只能判断基础类型，引用类型都是 object， null 也是 object。

### 判断 原型

1. arr.\_\_proto\_\_ == Array.prototype//内部函数不建议
2. Object.getPrototypeOf(arr) == Array.prototype
3. Array.prototype.isPrototypeOf(arr)

### 判断 构造函数

let a =[] // let a = new Array()

1. arr.constructor == Array

2. arr instanceof Array// arr 是否为 Array 的一个实例 //此方法可以判断是否为 自定义类的实例

### 内部 class 属性，不可访问,使用 Object 的 toString 方法可以访问

手动修改原型以上方法都不可以了 obj.\_\_proto\_\_ == Array.prototype，但是 class 不会改变 arr.class = undefind

最严谨，直接调用 Object 原型的 toString 方法

1. Object.prototype.toString.call(arr) === '[object Array]'

### es5 新增 Array.isArray()

//封装 Object.prototype.toString.call(arr)

1. Array.isArray(arr)

## interface 和 type 区别

1. interface 可以干的事儿 type 都可以干
2. interface 定义接口，是个对象，不可以是基础类型，使用 extends 继承
3. type 也可以定义对象类型，使用 & 继承
4. type 可以定义联合类型，例如 type A = string|number
5. type 可以定义类型别名，例如 type A = string
6. interface 可以重复生命，最后结果会合并，type 不可以

## 创建对象方式

```js
let a = {}

let a = new Object()

// 字面量
let a = { name: 'tom' }

//工厂模式
function createObj() {
  let a = new Object()
  return a
}

//构造函数,通常首字母大写
function Persion(name) {
  this.name = name
}
let a = new Persion()

//通用方法可以写到原型上节省空间
//只有类的原型定义了一次，实例在调用方法时，查找步骤：实例=> 类-> 类原型，
//如果该方法有引用类型，不建议使用
Persion.say = function () {
  console.log('hello')
}

//es6 class
class Persion {
  //默认创建构造函数
  //constructor(){}
  //也可以手动修改i
  constructor(x, y) {}
  this.x:null,
  //原型上的方法
  toString(){

  }
}
```

## 继承的方法

```js
// 1.原型链继承
function P() {
  this.name = 'p'
}
function C() {
  this.name = 'c'
}
//缺点就是多个实例的原型指向一个
c.prototype = new P()

//2.构造函数继承,call\
function P() {
  this.name = 'p'
}
function C() {
  //缺点是无法继承父类的原型
  p.call(this)
  this.name = 'c'
}
//前两种方式结合可以解决这两个问题

//3 Object.create
function P() {
  this.name = 'p'
}
function createC() {
  let c = p.call(this)
  c.name = 'c'
  return c
}

//4 es6 class extends super
class Person {
  constructor(name) {
    this.name = name
  }
}
class Child extends Person {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}
```

# vue

## vue 设计思路

1. 声明式 declarative：
2. 数据驱动 data-driven：
3. 渐进式 progressive：

## vue 生命周期

new Vue() created 钩子

mounte：将组件数据和状态渲染到宿主原素上 mounted 钩子

### beforeCreate

1. option 合并
2. 初始化实例相关属性， 如 $parent $root
3. 获取父组件上自定义的监听事件，（emit，派发监听都在自身）
4. 初始化 render 函数，createElement 函数
5. 定义 $attrs $listener 响应式

### created

1. 初始化组件状态 prvide/inject ,props, data,methods, watch,computed

### beforeMounte

### mounted

## computed 和 watch 的区别，是否可以使用异步

1. computed 是根据原始数据（可以多个）生成新的数据，适合复杂计算，例如求总价，一对多
2. watch 是监听某一数据变化，执行相关操作，多对一
3. computed 需要 return 同步返回值，computed 不支持异步
4. watch 不需要实时返回值，所以支持异步，但是更新的数据如果在异步操作中，是不能立即使用的

## 虚拟 dom 是什么? 原理? 优缺点?

1. 虚拟 dom 是一个用于描述真是 DOM 的数据结构，
2. 工作原理就是，程序数据发生变化是，生成一个新的虚拟 DOM，然后和之前的比较，使用 diff 算法，找出实际变化的部分，仅更新变化的真是 dom。
3. 优点：先操作更新虚拟 dom，减少 真实 DOM 操作的次数，因此可以提高程序的性能。

## diff 算法

1. 比较两个树， 定义 4 个指针，分别指向两个树的首尾，首首比较，尾尾比较，首尾比较，尾首比较，比较完后，指针向前或向后移动，继续比较

### 节点比较：

1. 先比较 key 值，相同为同一节点，
2. 比较节点标签：相同，替换属性及内容，
3. 比较属性和内容，

## vue 双向绑定的原理

1.  数据劫持，监听数据变化，数据变化时，
2.  观察者模式： TODO

## proxy 和 Object.defineProperty)()

1. vue2 使用 defineProperty，vue3 使用 proxy
2. defineProperty 无法拦截添加删除属性，是能使用$set，无法劫持数组变化，
3. proxy 是对整个对象的代理，所有问题都解决了，不兼容 ie

## vue 通讯方式

1. props 父传子
2. $emit 子传父
3. provide/inject
4. vuex
5. $parent/$children(vue3 中已删除 $children)
6. $attrs/$listeners 包含 props 未定义的属性(vue3 中删除 listeners)
7. $refs((vue3 中写法有变，需要 defineExpose 对外暴露才能访问到，))
8. $root

## $router 和 $route 区别

1. $router 获取router实例，可以访问整个路由内容，$router.option.routes；或者当前项目路由拦截方法等
2. $route 仅获取当前路由信息，主要用来获取参数，只读不可修改

# webpack

## 对 webpack 认识

1. webpack 是一个静态模块打包工具，默认支持 js、json 类型文件，
2. 使用 loader 可以支持各种不同文件类型
3. plugin 可以丰富 webpack 功能，使 webpack 更强大
4. 可以分割代码，
5. 对 CommonJS、ESM 实现兼容
6. webpack 处理程序时，会构建一个依赖图谱，依次打包各个模块，生成 bundle

## commonJS 和 ES Module 区别

1. commonJS 是值导入，ESM 是引用导入
2. CommonJS 运行时加载，ESM 是编译输出
3. CommonJS 单个导出，ESM 可以导出多个，默认导出只有一个
4. ESM 只能写在头部（import()可以动态导入）
5. CommonJS this 指向当前模块，ESM this 是 undefined

## treeShaking

由于 CommonJS 规范无法确定实际运行时是否需要某个模块，所以 CommonJS 不适合 tree-shaking

1. ES Module 引入进行静态分析，编译时能够正确判断加载了哪些模块
2. 未被引用或使用的模块/变量删除

## webpack loader 原理

1. webpack 打包默认仅支持 js 和 json，打包其他类型文件，如 css html 等需要额外 loader
2. loader 通过不同的加载器（loader），对不同类型的文件进行处理，并将结果交给 webpack 处理
3. loader 其实就是个方法，接受上一个 loader 返回代码/原始文件内容，对内容进行处理，并返回新的内容
4. 分同步 loader 和异步 loader
5. babel loader 可以把 es6 的 js 文件打包成 es5

## webpack plugin 原理

1. 内部包含 apply 方法的类
2.

## loader 和 plugin 区别

1. loader 其实让 webpack 可以解析更多文件类型（默认仅支持 js 和 json），
2. plugin 可以扩展 webpack 功能，可以在 webpack 打包过程中生命周期钩子插入各种逻辑，改变输出结果，不针对某一类型

## webpack 优化性能

1. 使用 treeShaking 删除未被使用的代码，
2. cache-loader 缓存，处理过的代码不再重复处理
3. 并行处理，使用 happypack 并行编译 loader， Thread-loader 多进程方式运行资源加载逻辑
4. esBuild

## ESModule 特性

1. 自动采用严格模式
2. 每个模块都是单独私有作用域
3. 通过 CORS 请求模块
4. script 标签延迟执行，相当于 defer

### esm 和 commonjs 区别

1. esm 是导入引用，原始模板更新，引用文件也会更新
2. commonjs 是导入值
3. esm 可以导入 commonjs，commonjs 不可以导入 esm

### defer 和 async 区别

两者都是异步执行脚本，

1. async 脚本加载完成后，立即执行
2. defer 等页面元素加载完成后立即执行

### 动态导入

import 不支持导入变量，如 const im = './a.js' import from im

使用动态导入 import().then(module=>{})

### node 支持 ESM

修改后缀为.mjs

node --experimental-modules index.mjs

# node

TODO
