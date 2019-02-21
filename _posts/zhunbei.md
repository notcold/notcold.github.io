css:
1. position

2. 盒模型(BFC)

3. 动画

4. viewport

5. rem
6. 各种居中
7. less sass scss postcss区别及了解
  - 预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less，增强了css代码的复用性，
    还有层级、mixin、变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

  - 后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的
    是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

8. 浏览器器兼容 
9. flex grid

js:
1. this相关:作⽤域，改变this指向(call，apply，bind，实现bind函数)，需了解作用域栈。

```js 

function bind (that) {
  var target = this
  var bindArgs = Array.prototype.slice.call(arguments, 1)
  return function () {
    var callArgs = Array.prototype.slice.call(arguments)
    return target.apply(that, bindArgs.concat(callArgs))
  }
}

```

------------------------------------

```js

function fn(){console.log(this.a)}

var obj ={a:1,alert:function(){
debugger;
console.log(this.a)}}

var obj2 ={alert:function(){
debugger;
console.log(this.a)}}

var fn1=fn.bind(obj)

Object.assign(fn1,obj2)
```

2. js定时器器⼯作机制， [军哥的博文](http://www.ruanyifeng.com/blog/2014/10/event-loop.html) [juejin](https://juejin.im/entry/5847c0f2a22b9d007aad2bdf) [blog](http://www.alloyteam.com/2016/05/javascript-timer/) [boke](https://www.jianshu.com/p/61d42574bf0d)

3.类型判断:typeof, instanceof, object.prototype.toString更多看lodash源码吧 

4.事件委托，js对象类型⽐较(⽐如⽇日期⽐较) 

5.声明以及优先级 
6.遍历相关⽅方法，区别，性能 

7.amd，cmd 

CMD推崇依赖就近，AMD推崇依赖前置
```js


//AMD requireJS

//包装
define(function(require, exports, module) {
    var a = require('a'),
          b = require('b');

    exports.action = function() {};
} );
//加载
require(['math'], function(math) {
　math.add(2, 3);
});

//CMD seaJS

define(function (requie, exports, module) {
     
    //依赖可以就近书写
    var a = require('./a');
    a.test();
     
    //...
    //软依赖
    if (status) {
     
        var b = requie('./b');
        b.test();
    }
});
```
8.对象相关:
原型链 _ proto _ 和prototype的区别 new怎么实现的 object.create怎么实现的 继承怎么实现的 深拷⻉，浅拷贝 object.assign原理
           
9.异步相关:时间器机制，fetch，jsonp原理 
```js
 var sum1 = 0, sum2 = 0, sum3 = 0; len = 2;
  var arr = [];
  for (var i = 0; i < len; i++) {
     arr.push(i)
  }
  for (var i = 0; i < len; i++) {
      setTimeout(function () {
          sum1 += arr[i];
      }, 0);
 }
 $.each(arr, function (i, v) {
     setTimeout(function () {
		console.log(i,v)
         sum2 += v;
     }, 0);
 });
 for (var i = 0; i < len; i++) {
     sum3++;
 }
 //sum3不管，答出len=2与len=200000时，sum1,sum2的值
 console.log(sum1);
 console.log(sum2);
 console.log(sum3);
```

事件循环是js实现异步的一种方法，也是js的执行机制。

10.null undefined区别
11. 安全性:xss，crsof之类的
12. 函数式编程
```js
function add(a , b) {
  return a + b;
}

function addCurry(a) {
    return function(b) {
      add(a,b)
    }
}
```
13. 观察者模式
 发布-订阅 update ---》 所有观察者  1对多
 
 中介者模式
 
 对详见的复杂引用关系
 Controller 作为一种中介者，它负责控制视图对象View和模型对象Model之间的交互。如在Struts中，Action就可以作为JSP页面与业务对象之间的中介者。
 
14. cookie，localStorage，sessionStorage使⽤及区别



fetch

```js

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}


```


```js
function superType(){
    this.name = name;
    this.colors = ["red","blue","green"];
}

superType.prototype.sayName = function(){
    alert(this.name);
};

function subType(name,age){
    //继承属性
    superType.call(this,name);
    this.age = age;
}
//继承方法
subType.prototype = new superType();
subType.prototype.constructor = subType(); //上一句导致重写了原型对象，所以要重新指定constructor的指向。
subType.prototype.sayAge = function(){
    alert(this.age);
}

var instance1 = new subType("Nico",20);
instance1.colors.push("black");
alert(instance1.colors);  //red,blue,green,black
instance1.sayName();  //"Nico"
instance1.sayAge();   //20 


var instance2 = new subType("Greg",28);
instance1.colors.push("black");
alert(instance1.colors);  //red,blue,green
instance1.sayName();  //"Greg"
instance1.sayAge();   //28
```
es6: 
1.异步相关
promise(恐怖哲源码最好看下) 


generator


await，async
```js

function func(){
    return new Promise(function(reslove) {
          console.log(1000)
        reslove(100)
      }).then(data=>{
          console.log(data)
          return 9999
      })
}
async function f() {
  var time = await func()
  console.log(time)
}
f()
```
proxy

    setter和getter

2. const，let 以及区别 (const，let都是声明的时候要赋值，⽽而且const不可以重新赋值，但是对于对象可以对象内变量重新赋值)
3. 解构

4. 箭头函数(改变this了)


5. symbol(bind实现⽤用到了)

6. set map(问到过我没答上来)
Set是集合，没有重复值的数组
7. 类(super，constructor的用法和原理)

8. module.export和export区别 

用白话讲就是，exports只辅助module.exports操作内存中的数据，辛辛苦苦各种操作数据完，累得要死，结果到最后真正被require出去的内容还是module.exports的，真是好苦逼啊。

require: node 和 es6 都支持的引入
export / import : 只有es6 支持的导出引入
module.exports / exports: 只有 node 支持的导出

9. import export

react: 
1.声明周期 
实例化
    1、getDefaultProps
    2、getInitialState
    3、componentWillMount
    4、render
    5、componentDidMount
存在期
    1、componentWillReceiveProps
    2、shouldComponentUpdate
    3、componentWillUpdate
    4、render
    5、componentDidUpdate
 销毁
    1 componentWillUnmount
 
2.setState异步原理以及滞后问题 
   
   16.x react 
    在react组件中运行的方法会被 react 封装包裹， 然后执行finally 判断是否render
    
    合并state之后由performWorkOnRoot 操作DOM修改
    
   ```js
   function interactiveUpdates$1(fn, a, b) {
     if (isBatchingInteractiveUpdates) {
       return fn(a, b);
     }
     // If there are any pending interactive updates, synchronously flush them.
     // This needs to happen before we read any handlers, because the effect of
     // the previous event may influence which handlers are called during
     // this event.
     if (!isBatchingUpdates && !isRendering && lowestPriorityPendingInteractiveExpirationTime !== NoWork) {
       // Synchronously flush pending interactive updates.
       performWork(lowestPriorityPendingInteractiveExpirationTime, false);
       lowestPriorityPendingInteractiveExpirationTime = NoWork;
     }
     var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
     var previousIsBatchingUpdates = isBatchingUpdates;
     isBatchingInteractiveUpdates = true;
     isBatchingUpdates = true;
     try {
       return fn(a, b);
     } finally { // 包裹运行方法在finally中再执行state变化
       isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
       isBatchingUpdates = previousIsBatchingUpdates;
       if (!isBatchingUpdates && !isRendering) {
         performSyncWork();
       }
     }
   }
   
function flushControlled(fn) {
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    syncUpdates(fn);
  } finally {
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}

```
16.X 版本
-------------------
^15.6.1
在React绑定的事件中 setState是异步的，但是通过js或者异步回调中setState是同步的

   ```js
   //React组件上绑定的事件做了封装处理
  //click之后先进入
    dispatchEvent= function (topLevelType, nativeEvent) {
       if (!ReactEventListener._enabled) {
         return;
       }
   
       var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
       try {
         // Event queue being processed in the same cycle allows
         // `preventDefault`.
         ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
       } finally {
         TopLevelCallbackBookKeeping.release(bookKeeping);
       }
     }
     
   //事务中的perform会把鼠标事件传递进来执行
       perform= function (method, scope, a, b, c, d, e, f) {
          /* eslint-enable space-before-function-paren */
          !!this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction.') : _prodInvariant('27') : void 0;
          var errorThrown;
          var ret;
          try {
            this._isInTransaction = true;
            // Catching errors makes debugging more difficult, so we start with
            // errorThrown set to true before setting it to false after calling
            // close -- if it's still set to true in the finally block, it means
            // one of these calls threw.
            errorThrown = true;
            this.initializeAll(0);
            ret = method.call(scope, a, b, c, d, e, f);
            errorThrown = false;
          } finally {
            try {
              if (errorThrown) {
                // If `method` throws, prefer to show that stack trace over any thrown
                // by invoking `closeAll`.
                try {
                  this.closeAll(0);
                } catch (err) {}
              } else {
                // Since `method` didn't throw, we don't want to silence the exception
                // here.
                this.closeAll(0);
              }
            } finally {
              this._isInTransaction = false;
            }
          }
          return ret;
        }
      
   
    //state.count === 0
    this.setState({count:state.count+1})
    this.setState({count:state.count+1})
    this.setState({count:state.count+1})
    //state.count === 1
    
   ```
    
    
3.props.children 
组件的所有子节点
如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类就是 array 。
4.组件化(纯函数组件，受控⾮受控组件，⾼阶组件) 

 在受控组件中，表单数据由 React 组件处理。如果让表单数据由 DOM 处理时，替代方案为使用非受控组件。
高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。
const EnhancedComponent = higherOrderComponent(WrappedComponent);

5.react16相关新API:
filber原理

portals   createPortal 的出现为 弹窗、对话框 等脱离文档流的组件开发提供了便利
使用 createPortal 可以快速创建 Dialog 组件，且不需要牵扯到 componentDidMount、componentDidUpdate 等生命周期函数。

并且通过 createPortal 渲染的 DOM，事件可以从 portal 的入口端冒泡上来，如果入口端存在 onDialogClick 等事件，createPortal 中的 DOM 也能够被调用到。

context  
 componentDidCatch  
Fragment 组件其作用是可以将一些子元素添加到 DOM tree 上且不需要为这些元素提供额外的父节点，相当于 render 返回数组元素。

6.react-router，react-router-dom原理以及使⽤
 
7.源码解析 


8.16版解决了之前的哪些问题
大项目性能优化
弹窗api不稳定的问题
生命周期异常处理
Ref在HOC中传递问题


redux: 
1.redux原理(store，action，reducer，其实就是受控函数，是数据流清晰) 
store 状态树
action 操作命令
reducer 操作

createStore 创建 store
    subscribe redux插件通过该方法监听state变化， 例如saga监听对应的action操作
    

applyMiddleware 把中间件与store绑定 ，在dispatch的时候会让action流过中间件
```js
//核心方法，dispat方法会让action流过所有绑定的reducer，以及applyMiddleware添加的中间件
function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    var listeners = currentListeners = nextListeners
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()
    }

    return action
  }

```
2.redux的问题(对于⼀一些情景不是很方便，如何解决)

3.redux源码 

4.redux优化(middleware，封装请求中间件是因为redux不能处理异步的state) 

5.react-redux (redux,connect) 
  WrappedComponent 关联store和组件的props
  
6.redux常用middleware
 react-router
 saga
 

webpack:

1.webpack4.0新更改(使用cli，废弃了⼀些插件，增加新的loader) 

2.webpack优化(bundle-loader,chunkFilename,chunkhash，MiniCssExtractPlugin) 

3.webpack常⽤用配置(babel，⼏部分，css的loader，js react相关loader，chunk， chunkname) 

4.最好彻底弄懂内部原理⽽而不是单的会配置

-.初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
-.开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
-.确定入口：根据配置中的 entry 找出所有的入口文件；
-.编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
-.完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
-.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
-.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

node:问的⽐较少，因为没让问，主要就是常⽤的，安全性，中间件通过next()之类的

模板引擎:vue中的data是通过getter，setter获取赋值的 

http:
1. 看一下⼀个⽹网址在浏览器器输入发⽣了什么 
DNS解析
ip访问

2. http头具体每个都干什么的

3. 常⽤用状态码
404
200
500
504
502
4. get post put之类

5. 跨域 

cors
jsonp
postmessage

6. 缓存

git:相关常用的会问 
git commit 
git branch
算法:排序，数组，⼆叉树⼤公司或者注重基础的公司可能会问

```js
const arr = [12,2,2323,878,324,90,228,2,953,12,34,12,71]
//冒泡

    for(let i=0 ; i<arr.length;i++){
        for(let j=i+1;j<arr.length; j++){
            if(arr[i]<arr[j]){
                swap(arr,i,j)
            }
        }
    }
    
    //选择排序
    
     for(let i=0 ; i<arr.length;i++){
         let min = i;
            for(let j=i+1;j<arr.length; j++){
                if(arr[i]<arr[j]){
                    min = j;
                }
            }
           min!=i &&swap(arr,i,min)
     }
    
    //快速插入排序
    
    for(let i=0 ; i<arr.length;i++){
        
    }
```
