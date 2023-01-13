## 
1.数据拍平:用户输入树形结构数据，转数组
 2.数据展示：根据 level 设置 margin-left 
3.添加/删除

## 注意事项：
1. props属性定义必填时，必须 as const ,因为 ts中required:true是被认为在这个对象上是必须的，所以会被消除掉
2. 循环nodes添加组件时，必须用map返回一个新数组，forEach不返回数组不行 
