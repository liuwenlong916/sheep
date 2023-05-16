# html
## DOCTYPE
1. 定义文件类型

## html5新增标签
目的：HTMl语义化可以让页面的内容结构化，以便于浏览器解析和搜索引擎解析，并且提高了代码的可读性便于代码维护
1. 语义化标签：header nav aside footer section
2. input 增加form相关类型：email 等
3. 音频,视频(audio,video)
4. Canvas

# css

## 常用选择器
按优先级
1. style内联选择器
2.  id选择器 #id{}
3. class 类别选择器
4. 属性选择器 [属性=值]{}
5. 标签选择器
6. 继承选择器

## 水平垂直居中
1. flex设置 ：justify-content设置主轴center 以及align-items设置交叉轴center
2. 绝对定位和margin:auto,top/left/right/bottom:0
3. 转行内原始：lineheight

## 响应式布局
1. 媒体查询，@media screen and 根据宽高设置样式（max-width:300px ==> 小于300px才设置）
2. 百分比布局
3. rem布局

## flex:1
1.  flex:1 1 auto
2.  flex-grow:1;扩大
3.  flex-shrink:1;缩小
4.   flex-basis:auto

## 后代选择器和子类选择器区别
1. 后代选择器用空格隔开，表示所有后代
2. 子类选择器用 > 隔开，表示所有下一级所有后代


# js
## es6 新特性
1. 块级作用域 let const
2. Symbol数据类型
3. 模板字符串
4. Generator  async/await
5. class
6. 解构赋值 (...)
7. 模块导入导出(import/export)
8. Set/Map数据类型
9. Proxy代理
10. 函数设置默认值
11. 新增API，如isArray、assign
12. for of遍历(只可循环可迭代数据)
## var、let 和 const 区别

1. var 变量会提升，全局会放到 window 里
2. var 可以重复生命
3. const let 是块级作用域
4. const 定义后不可修改，但是引用对象内部属性可修改。

## bind apply call
1. bind返回一个指定新this的函数，这个函数this不可再更改，非立即执行
2. apply call 是绑定新this立即执行函数
3. apply通过数组接受参数，call

## 事件代理
1. 利用事件冒泡，减少事件注册，节省内存
2. 实现：事件绑定到父组件上
3. 常见 ul中定义事件，捕获点击li

## Promise
1. 两个队列，
2. resolve和reject方法（通过微任务清空各自队列）
3. then方法接受两个参数，一个加入resolve队列，一个加入reject
4. catch接受一个参数，加入reject队列
5. promise构造函数，传入resolve和reject方法立即执行传入方法
6. 返回一个promise

### catch参数和then的第二个参数区别
1. catch(err) 等价于then(null, err)
2. catch 可以捕获then中执行过程中的异常

## cookie、 localStroage 和 sessionStroage 区别

1. localStroage 永久保存，sessionStroage 关闭当前会话清空
2. cookie 存储较小 4kb 其他 5M
3. cookie 可以设置过期事件，默认关闭会话失效
4. cookie 每次请求会在 http 头中

## 闭包是什么？闭包用途？

### 定义

1. 简单说闭包是一个函数返回一个函数，且该函数使用外层函数变量。
2. 由于外层函数变量被返回的函数调用，所以外层函数执行完成后，函数作用域无法释放，形成闭包。

### 用途

1. 定义私有变量，减少全局变量污染，
2. 柯里化函数，
3. 防抖与节流。

### 内存泄漏
1. 使用未声明的变量是全局变量，无法被内存收回
2. 闭包
3. 未被取消的定时器
4. 脱离dom的引用

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

## 事件流
1. 事件冒泡和事件捕获
2. 执行顺序是： 向下捕获-target-冒泡
3. 捕获默认关闭，addEventListion时设置第三个属性为true开启
4. 冒泡默认开启，e.stopPropagation 阻止冒泡
5. preventDefault 阻止默认事件

## 说一下浅拷贝和深拷贝的区别

1. 浅拷贝只拷贝一层，基本类型值复制，引用类型如果属性是个对象，指向还是同一地址，
2. 深拷贝彻底分开，之间毫无影响
3. 可以使用 JSON.parse(JSON.stringify())实现，但是不支持 undefined、Symbol 和方法拷贝
4. es6解构实现浅拷贝
5. Object.assign()浅拷贝
6. 手写递归方法赋值

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

## MVVM模型
model->data数据
view->dom模型，
viewModel->视图模型，实例。相当于一个桥梁


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

## 虚拟dom
1. 一个描述真是dom的js对象
2. template通过编辑生成render函数，执行render函数生成vnode
3. 更新过程中通过diff算法比较新旧两个vnode，尽可能减少真实dom的操作

## diff算法
1. 深度优先，同层比较
2. 比较节点是否是同类型，不同删除重建
3. 文本节点更新文本
4. 元素节点递归比较子节点
5. 首首比较，尾尾比较，首尾比较，尾首比较；

## computed 和 watch 的区别，是否可以使用异步

1. computed 是根据原始数据（可以多个）生成新的数据，适合复杂计算，例如求总价，一对多
2. watch 是监听某一数据变化，执行相关操作，多对一
3. computed 需要 return 同步返回值，computed 不支持异步
4. watch 不需要实时返回值，所以支持异步，但是更新的数据如果在异步操作中，是不能立即使用的

## 虚拟 dom 是什么? 原理? 优缺点?

1. 虚拟 dom 是一个用于描述真是 DOM 的数据结构，
2. tag props children
3. 工作原理就是，程序数据发生变化是，生成一个新的虚拟 DOM，然后和之前的比较，使用 diff 算法，找出实际变化的部分，仅更新变化的真是 dom。
4. 优点：先操作更新虚拟 dom，减少 真实 DOM 操作的次数，因此可以提高程序的性能。

## diff 算法

1. 比较两个树， 定义 4 个指针，分别指向两个树的首尾，首首比较，尾尾比较，首尾比较，尾首比较，比较完后，指针向前或向后移动，继续比较

### 节点比较：

1. 先比较 key 值，相同为同一节点，
2. 比较节点标签：相同，替换属性及内容，
3. 比较属性和内容，

## vue 双向绑定的原理

1. Object.definProperty的get/set进行数据拦截，重构数组更新方法，
2. 发布订阅模式实现数据绑定

## proxy 和 Object.defineProperty)()

1. vue2 使用 defineProperty，vue3 使用 proxy
2. defineProperty 无法拦截添加删除属性，是能使用$set，无法劫持数组变化，
3. proxy 是对整个对象的代理，所有问题都解决了，不兼容 ie

## 透传/非属性特性

1. props无法获取 style class id属性
2. $attrs 可以获取id
3. 自动添加到根节点
4. vue3中删除$Listeners
5. vue3中click事件会自动添加到根节点

## 异步组件

defineAsyncComponent()


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

## 修饰符
1. lazy input事件不立即触发，change再触发
2. trim 删除两边空格
3. number 转
4. stop 阻止冒泡
5. ptevent阻止默认事件 a标签常用
6. once触发一次

## nexttick
事件循环原理
1. 应用场景：数据更新后想立马操作dom
2. 原理：操作dom过程放入微任务队列当中，等更新dom执行完成后执行

## vue3 新特性
1. proxy实现真正的代理
2. composition API：方法话，实例化Vue（CreatApp）定义响应式数据，计算属性， 任意位置可以定义
3. 组件引用即可使用，不再需要components属性
4. 合并和asyn，一个组件可以定义多个v-model(默认还是只有一个，可以通过冒号（:）定义不同)
5. ts重构
6. template模板中不再要求单根 
7. v-if 和v-for优先级调换，v-if优先级更高
8. 删除vue2中使用浏览器方法，多端支持更好

## ref 和reactive区别
1. ref可以定义基础类型，也可以定义引用类型（内部调用reactive）
2. reactive不可以定义基础类型
3. watch监听引用类型的ref需要设置deep:true，reactive不需要
4. ref访问需要.value ，使用$ref可省略

## 跨域
浏览器同源策略导致（协议，地址，端口）
解决方法
1. jsonp：使用script/img标签的src属性，调用get请求返回
2. CORS：后端响应头设置允许访问源，告诉浏览器允许接受数据，Access-Control-Allow-Origin
3. 代理：开发过程devserver.proxy，服务器nginx反向代理

## 兼容ie

1. babel和corejs将es6转es5，
2. 第三方库（node_modules目录下的文件）默认不会转
3. 配置transpileDependencies指定转码目录

## 性能优化
### 首屏加载优化
1. 路由懒加载import()
2. 组件懒加载（弹窗等）
3. treeShaking
4. 骨架屏vue-skeleton-webpack-plugin
5. 长列表虚拟滚动
6. web worker优化复杂计算
7. 图片优化：1 懒加载，2 使用字体图标 3 url-loader 较小图片使用base64方式

### 打包优化
1. --report 或webpack-bundle-analyzer插件查看打包体积
2. externals 打包时排除依赖包，使用cdn方式引入<script src=''></script>
3. 组件库按需引入
4. HappyPack 多线程打包
5. Gzip压缩：compression-webpack-plugin插件
6. 

# webpack

## 对 webpack 认识

1. webpack 是一个静态模块打包工具，默认支持 js、json 类型文件，
2. 使用 loader 可以支持各种不同文件类型
3. plugin 可以丰富 webpack 功能，使 webpack 更强大
4. 可以分割代码，
5. 对 CommonJS、ESM 实现兼容
6. webpack 处理程序时，会构建一个依赖图谱，依次打包各个模块，生成 bundle

## webpack打包原理
1. fs.readfile读取入口文件
2. babel/parser 将原始代码转成ast树
3. @babel/traverse 收集依赖模块
4. babel/core 和babel/preset将ast树转成浏览器可以识别的es5代码
5. eval执行


## loader 和 plugin 区别

1. loader 其实让 webpack 可以解析更多文件类型（默认仅支持 js 和 json），
2. plugin 可以扩展 webpack 功能，可以在 webpack 打包过程中生命周期钩子插入各种逻辑，改变输出结果，不针对某一类型

## webpack loader 原理

1. webpack 打包默认仅支持 js 和 json，打包其他类型文件，如 css html 等需要额外 loader
2. loader 通过不同的加载器（loader），对不同类型的文件进行处理，并将结果交给 webpack 处理
3. loader 其实就是个方法，接受上一个 loader 返回代码/原始文件内容，对内容进行处理，并返回新的内容
4. 分同步 loader 和异步 loader
5. 异步loader使用 async()返回一个方法，返回内容
5. babel loader 可以把 es6 的 js 文件打包成 es5



## 手写 loader
1. 本质就是个方法，接受内容，处理后的内容返回
2. 配置resolveLoader.modules = ['./node_modules','./loaders']，查找路径
3. 异步loader使用this.async()返回结果，只能放最后执行

## 常用loader
1. style-loader css-loader sass-loader postcss-loader(各个浏览器前缀)
2. filie-loader url-loader(设置文件阈值，小的生成base64)
3. babel-loader es6转es5
4. vue-loader 
5. eslint-loader
6. 
## webpack plugin 原理

1. 内部包含 apply 方法的类，接受compiler
2. compiler.hooks定义各种钩子函数，等待执行
3. 丰富webpack功能，可以在webpack整个打包过程中任意钩子里

## 常用plugin
1. cleanwebpack-plugin 清除dist
2. htmlwebpackplugin 创建引用输出文件的index.html

## webpack 优化性能

1. 使用 treeShaking 删除未被使用的代码，
2. cache-loader 缓存，处理过的代码不再重复处理
3. 并行处理，使用 happypack 并行编译 loader， Thread-loader 多进程方式运行资源加载逻辑
4. esBuild
5. 懒加载页面和组件import()
6. 使用loading美化等待时间
7. 长列表虚拟滚动
8. 组件库按需引入

## ESModule 特性

1. 自动采用严格模式
2. 每个模块都是单独私有作用域
3. 通过 CORS 请求模块
4. script 标签延迟执行，相当于 defer

## commonJS 和 ES Module 区别

1. commonJS 是值导入，ESM 是引用导入,引用文件也会更新
2. CommonJS 运行时加载，ESM 是编译输出
3. CommonJS 单个导出，ESM 可以导出多个，默认导出只有一个
4. ESM 只能写在头部（import()可以动态导入）
5. CommonJS this 指向当前模块，ESM this 是 undefined

## treeShaking

由于 CommonJS 规范无法确定实际运行时是否需要某个模块，所以 CommonJS 不适合 tree-shaking

1. ES Module 引入进行静态分析，编译时能够正确判断加载了哪些模块
2. 未被引用或使用的模块/变量删除

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

## npm run xxx执行过程
1. 一些命令没有全局安装、配置环境变量，不能直接执行
2. npm i 的时候会在node_modules/.bin创建可执行文件
3. run的时候会去webpack.config script里查找命令
4. 然后去.bin文件里找可执行文件执行

TODO


# nginx

## 反向代理
location ^~/user{
  proxy_pass:'http://1.1.1.1:80'
}

## 前缀替换
1. 加斜杠/   location ^~/user/
2. rewrite ^/user/(.*)$ /$1 break

## 隐藏版本号：
server_tokens:off

## 后缀配置，指定静态资源目录
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ { 
    root           html/static/;
}

## 限制访问
  location /static {
    root               html;
    # allow 允许
    allow              39.xxx.xxx.xxx;
    # deny  拒绝
    deny               all;
  }



# merge
## Loader与plugin的区别？
Loder本质就是一个函数，在该函数中对接收到的内容进行转换，并返回转换后的结果，
因为webPack只认识javascript,所以Loader就承担了翻译官，对其他类型的资源做转译工作；
plugin就是插件，插件可以扩展webpack功能，在webpack运行生命周期中会广播中许多事件，
plugin可以监听这些事件，并在合适的时机通过webpack提供的api改变输出结果；
## webpack的构建流程？
初始化参数：从配置文件与shell语句中读取与合并参数，得出最终参数
开始编译：从上一步得到的最终化参数初始化compiler对象，加载所有配置的插件，执行对象中的run方法，开始执行编译
确定入口：根据配置中的entry找到所有入口文件
编译模块：从入口文件出发，调用所有配置好的loader对模块进行编译，再找出该模块依赖的模块，再递归本步骤，直到所有入口依赖的文件都经过本步骤
完成模块编译：得到每个模块被翻译后的最终内容
输出资源：根据入口和模块之间的关系，组装成一个个包含多个模块的chunk，再把每一个chunnk转换成一个单独的文件加入到输出列表
输出完成：确定后输出内容，把输出文件内容写入到文件系统

## webpack开发时会用到那些可以提高效率的插件？
webpack-dashbord:更友好的展示相关打包信息；
webpack-merge:提供公共配置，减少重复配置代码
speed-mearsure-webpack-plugin:简称SMP,分析webpack打包过程中loader和plugin耗时，有助于找到构建过程中的性能瓶颈
size-plugin:监控资源体积变化；
holdModelReplacementPlugin:模块热更新

## source map是什么？生产环境怎么用？
source map是将编译、打包、压缩后的代码映射为源代码的过程，
打包压缩后的代码不具有可读性，想要调试就需要source map,
map文件只要不打开开发者工具，浏览器是不会加载的

## 线上处理方法：
hidden-source-map:借助第三方错误监控平台Sentry使用
no-source-map:只会显示具体行数以及查看源代码错误栈，安全性比souce map高
source map :通过nginx设置将.map文件只对白名单开放（公司内网）


## 模块打包原理？
webpack实际上为每个模块创造了一个可以导入和导出的环境，本质上并没有修改代码的执行逻辑，
执行顺序，和模块加载顺序；

## webpack监听原理？
在发现源代码发生变化时，自动重新构建出新的输出文件.webpack开启监听模式有两种：

启动webpck命令时，带上————watch参数
在配置webpack.config.js中设置wacth:true
缺点：

原理：
轮询判断文件的最后编辑时间是否变化，如果某个文件发生变化，并不会立刻告诉监听者，而是先缓存起来，等aggregateTimeout后再执行

## webpack热更新原理？
核心就是客户端从服务端拉取更新的后文件，准确的说是chunk diff,
实际上WDS与浏览器之间维护了websocket，当本地资源发生变化时，WDS会向浏览器推送更新，
并附上上构建时的hash,让客户端与上一次资源做对比，
客户端对比出差异后会向WDS发起ajax请求来获取更新后的内容

## 如何优化webapck的构建速度？
使用高版本webpack和node.js
多进程
压缩代码
多进程并行压缩
图片压缩
合理使用缓存
开启缓存


## 说一说axios的拦截器原理及应用？
axios分为请求拦截器和响应拦截器；请求拦截器用于接口在请求前做的处理，如每个请求添加token、时间戳等；响应拦截器用于在接口返回之后做的处理，如对返回的状态进行判断等；

拦截器原理：
创建一个chn数组，数组中保存了拦截器相应的方法以及dispachRequest，把请求拦截器放在dispachRequest的前面，响应拦截器放在dispachRequest的后面，把请求拦截器和响应拦截器用forEach将他们分别unshift和push到数组中，为了保证执行顺序，需要用promise,以出对列的方式对chn数组中的方法挨个执行

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。从浏览器中创建 XMLHttpRequests,从 node.js 创建 http 请求,支持 Promise API,可拦截请求和响应，可转换请求数据和响应数据，可取消请求，可自动转换 JSON 数据，客户端支持防御 XSR
 


