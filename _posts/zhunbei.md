css:
1. position
static  relative  absolute  fixed  sticky粘性
2. 盒模型    (BFC)
3. 
  margin border padding content 
  
  BFC 隔离样式影响
  
3. 动画
animation:动画名 时间   次数
@keyframes name
4. viewport

5. rem
动态计算根节点font-size
```js
<script>!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);  flex(100, 1);</script>
```

6. 各种居中

绝对定位加transform
flex
table设置居中
3层div嵌套

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


JSON.stringify({a:123,b:'123123',c:{hello:'world'}}) //"{"a":123,"b":"123123","c":{"hello":"world"}}"

```

2. js定时器器⼯作机制， [军哥的博文](http://www.ruanyifeng.com/blog/2014/10/event-loop.html) [juejin](https://juejin.im/entry/5847c0f2a22b9d007aad2bdf) [blog](http://www.alloyteam.com/2016/05/javascript-timer/) [boke](https://www.jianshu.com/p/61d42574bf0d)

3.类型判断:typeof, instanceof, object.prototype.toString更多看lodash源码吧 

4.事件委托，js对象类型⽐较(⽐如日期⽐较) 

5.声明以及优先级 
a =1
var a;变量提升
6.遍历相关⽅方法，区别，性能 
while for()  for in  for of  forEach
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

class A{}
class B extends A{}
B.__proto__ === A
true
B.prototype.__proto__ === A
false
B.prototype.__proto__ === A.prototype
true
A.prototype.__proto__ === Object.prototype
true
Object.prototype.__proto__ === null
true

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）
           
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
特性	Cookie	localStorage	sessionStorage
数据的生命期	一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效	除非被清除，否则永久保存	仅在当前会话下有效，关闭页面或浏览器后被清除
存放数据大小	4K左右	一般为5MB
与服务器端通信	每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题	仅在客户端（即浏览器）中保存，不参与和服务器的通信
易用性	需要程序员自己封装，源生的Cookie接口不友好	源生接口可以接受，亦可再次封装来对Object和Array有更好的支持


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
subType.prototype.constructor = subType; //上一句导致重写了原型对象，所以要重新指定constructor的指向。
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



//组合寄生式继承
    function inheritPrototype(subType,superType){
        var prototype = object(superType.prototype);    //创建对象
        prototype.constructor = subType;    //增强对象
        subType.prototype = prototype;    //指定对象
    }
```
es6: 
Object.prototype.objCustom = function () {}; 
Array.prototype.arrCustom = function () {};

let iterable = [3, 5, 7];
iterable.foo = "hello";

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}


for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}

for...in 效率是最低的。这是因为 for...in 有一些特殊的要求，包括：
1. 遍历所有属性，不仅是 own properties 也包括原型链上的所有属性。
2. 忽略 enumerable 为 false 的属性。
3. 必须按特定顺序遍历，先遍历所有数字键，然后按照创建属性的顺序遍历剩下的。
所以请优先使用 for...of 。
Object。entries() //[key,val]

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
[]数据需要额外劫持方法

2. const，let 以及区别 (const，let都是声明的时候要赋值，而且const不可以重新赋值，但是对于对象可以对象内变量重新赋值)
3. 解构


4. 箭头函数(改变this了)
1.不绑定this
在箭头函数出现之前，每个新定义的函数都有其自己的 this 值

2.使用call()和apply()调用
由于 this 已经在词法层面完成了绑定，通过 call() 或 apply() 方法调用一个函数时，只是传入了参数而已，对 this 并没有什么影响：

3.箭头函数不绑定arguments,取而代之用rest参数…解决
4.箭头函数不能用作构造器，和 new 一起用就会抛出错误。
  

5. symbol(bind实现用到了)

6. set map(问到过我没答上来)
Set是集合，没有重复值的数组
7. 类(super，constructor的用法和原理)

8. module.export和export区别 

用白话讲就是，exports只辅助module.exports操作内存中的数据，辛辛苦苦各种操作数据完，累得要死，结果到最后真正被require出去的内容还是module.exports的，真是好苦逼啊。

require: node 和 es6 都支持的引入
export / import : 只有es6 支持的导出引入
module.exports / exports: 只有 node 支持的导出

9. import export

10.script异步
    
    defer是“渲染完再执行”，async是“下载完就执行”

async 脚本在script文件下载完成后会立即执行,并且其执行时间一定在 window的load事件触发之前。这意味着多个async脚本很可能不会按其在页面中的出现次序顺序执行。
与此相对，浏览器确保多个 defer 脚本按其在HTML页面中的出现顺序依次执行,且执行时机为DOM解析完成后，document的DOMContentLoaded 事件触发之前。

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

高阶组件的缺点
高阶组件也有一系列的缺点，首先是被包裹组件的静态方法会消失，这其实也是很好理解的，我们将组件当做参数传入函数中，返回的已经不是原来的组件，而是一个新的组件，原来的静态方法自然就不存在了。如果需要保留，我们可以手动将原组件的方法拷贝给新的组件，或者使用hoist-non-react-statics之类的库来进行拷贝。
```js
function HOC(warpcomponent) {
  return Component(){
      render(){
          return warpcomponent
      }
  }
}

```

pureComponent
会比较 Object.keys(state | props) 的长度是否一致，每一个 key是否两者都有，并且是否是一个引用，也就是只比较了第一层的值，确实很浅，所以深层的嵌套数据是对比不出来的。

5.react16相关新API:


 componentDidCatch(error, info) {
    this.setState({ hasError: true });

    logErrorToMyService(error, info);
  }


Error Boundaries
React16 支持了更优雅的错误处理策略，如果一个错误是在组件的渲染或者生命周期方法中被抛出，整个组件结构就会从根节点中卸载，而不影响其他组件的渲染，可以利用 error boundaries 进行错误的优化处理。


Strict Mode
StrictMode 可以在开发阶段开启严格模式，发现应用存在的潜在问题，提升应用的健壮性，其主要能检测下列问题：

识别被标志位不安全的生命周期函数
对弃用的 API 进行警告
探测某些产生副作用的方法
检测是否使用 findDOMNode
检测是否采用了老的 Context API

将 componentWillMount、componentWillReceiveProps 和 componentWillUpdate 标记为不安全的方法

新的生命周期

static getDerivedStateFromProps(nextProps, prevState)
getDerivedStateFromProps(nextProps, prevState) 其作用是根据传递的 props 来更新 state。它的一大特点是无副作用，由于处在 Render Phase 阶段，所以在每次的更新都会触发该函数， 在 API 设计上采用了静态方法，使其无法访问实例、无法通过 ref 访问到 DOM 对象等，保证了该函数的纯粹高效。

getSnapshotBeforeUpdate(prevProps, prevState)
getSnapshotBeforeUpdate(prevProps, prevState) 会在组件更新之前获取一个 snapshot，并可以将计算得的值或从 DOM 得到的信息传递到 componentDidUpdate(prevProps, prevState, snapshot) 函数的第三个参数，常常用于 scroll 位置定位等场景。

filber原理

portals   createPortal 的出现为 弹窗、对话框 等脱离文档流的组件开发提供了便利
使用 createPortal 可以快速创建 Dialog 组件，且不需要牵扯到 componentDidMount、componentDidUpdate 等生命周期函数。

并且通过 createPortal 渲染的 DOM，事件可以从 portal 的入口端冒泡上来，如果入口端存在 onDialogClick 等事件，createPortal 中的 DOM 也能够被调用到。

context  

getChildContext()

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
    
(store) =>(next)=>(action)=>{//do something}
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
2.redux的问题(对于一些情景不是很方便，如何解决)

3.redux源码 

4.redux优化(middleware，封装请求中间件是因为redux不能处理异步的state) 

5.react-redux (redux,connect) 
  WrappedComponent 通过context关联store和组件的props
  
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
cache-control
mime-type
content-type
expries
accept
origin

3. 常⽤用状态码
301 永久重定向
302 重定向
404 not found
200 
500 服务器出错
504 超时
502 服务器gg
4. get post put之类

PUT：client对一个URI发送一个Entity，服务器在这个URI下如果已经又了一个Entity，那么此刻服务器应该替换成client重新提交的，也由此保证了PUT的幂等性。如果服务器之前没有Entity ，那么服务器就应该将client提交的放在这个URI上。总结一个字：PUT。对的，PUT的方法就是其字面表意，将client的资源放在请求URI上。对于服务器到底是创建还是更新，由服务器返回的HTTP Code来区别。


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
    
    //插入排序
    
    for(let i=0 ; i<arr.length;i++){
        
    }
```




1.如何看待前端框架选型 ?

2.vue的如何实现双向绑定的 ？
setter getter绑定
3.react 虚拟DOM 是什么? 如何实现? 说一下diff算法 ?
构建一个描述页面dom节点的js 都没对象，对象包含了所有的dom信息
节点 类型 属性 children 值

4.工作中最出色的点, 和你最头疼的问题 如何解决的 ?

5.react和vue的比较 ?

6.React Diff 算法 ?
tree diff
component diff
ele diff
    
7.观察者模式实现 ?
redux subscribe 订阅后执行listener



8.http报文头部有哪些字段? 有什么意义 ?
```js
:authority: www.cnblogs.com
:method: GET
:path: /mvc/blog/ViewCountCommentCout.aspx?postId=2612910
:scheme: https
accept: application/json, text/javascript, */*; q=0.01
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7
cache-control: no-cache
content-type: text
cookie: __tins__1910329=%7B%22sid%22%3A%201526971609062%2C%20%22vd%22%3A%201%2C%20%22expires%22%3A%201526973409062%7D; __51cke__=; __51laig__=1; _ga=GA1.2.959517077.1526971609; CNZZDATA1000042812=35626807-1542683612-https%253A%252F%252Fwww.google.com%252F%7C1542683612; __utma=226521935.959517077.1526971609.1550661134.1550661134.1; __utmc=226521935; __utmz=226521935.1550661134.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); sc_is_visitor_unique=rx7853846.1550661265.32527BE732E34F7710CA4365B8767DFB.1.1.1.1.1.1.1.1.1-10500913.1550468989.2.2.2.2.2.2.2.2.2; UM_distinctid=1690e86f72e128-05b0ff1cc33f43-36647105-232800-1690e86f72f6a2; CNZZDATA1258390419=1178611104-1550726413-https%253A%252F%252Fwww.google.com%252F%7C1550724635; _gid=GA1.2.1650419177.1551094097; _gat=1
pragma: no-cache
referer: https://www.cnblogs.com/
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
x-requested-with: XMLHttpRequest

```


9.移动端高清方案如何解决 ?
2倍dppr 用2倍的像素图 

10.webpack的原理, loader 和 plugin 是干什么的? 有自己手写过么 ?

loader梳理所有的引用转换为模块
plugin对模块进行处理

11.简述从网页输入url到网页展示的过程发生了哪些事情 ?
dns ip 服务器读取文件  浏览器接受内容解析 逐行扫描 样式树   dom数 渲染 js运行 
12.SSR 和 客户端渲染有什么区别 


vue是如何实现绑定事件的 ?
```js
//原生事件
export function on (el, event, cb, useCapture) {
  el.addEventListener(event, cb, useCapture)
}
```


13简述公司node架构中容灾的实现 ?
14.浏览器事件有哪些过程? 为什么一般在冒泡阶段, 而不是在捕获阶段注册监听? addEventListener 参数分别是什么 ?
最大程度的兼容浏览器
addEventListener('click',function(){},)
父--捕获
子--（捕获或者冒泡，看添加顺序）
父--冒泡

15.面向对象如何实现? 需要复用的变量 怎么处理 ?


16.移动端300ms延时的原因? 如何处理?
为了检测双击
fast-click
17.主流框架的数据单向/双向绑定实现原理 ?

二、AngularJs
angularJs有脏检查机制，主要是依据$watch对象来监测数据是否更新。可以通过$apply和$digest两个函数来手动触发检测。这个和基于setter的检测机制不同，不能够做到在数据更新时执行操作，而只能通过事件入口执行检查，确认数据更新后再更新视图。

一般情况下$apply和$digest执行效果相同，但是$apply可以带上参数可在变更后执行某个方法，并且$digest方法只触发当前作用域和它的子作用域上的监控，而$apply是触发整个作用域上的监控。所以在保证只变更当前或子级作用域的情况下，调用$digest性能会高出$apply。

脏检查的性能问题一直被讨论，相较基于setter的检测机制来说，如果在处理循环更新DOM元素的情况，脏检查可以先检查所有的更新，构建好整个DOM结构，然后一次整体更新，相较于setter的分次更新来说性能反而会更高。

三、Vue.js
Vue.js是通过数据劫持结合发布者-订阅者模式的方式来实现的。用户操作会更改某个属性的值，而通过重写该属性的set方法，对数据进行劫持监听，可以在每次值更新的时候，执行重写的set方法内的指定操作。这里的指定操作即是判断数据是否更新，是否需要更新视图。如果确认更新则修改当前视图。

四、React
React本身并没有提到双向绑定的概念，但是可以基于setState和onChange事件实现数据层于视图层的同步更新。例如每次修改表单值时执行onChange事件，调用setState更新数据层，从而更新视图。

18.React vue区别 virtualDOM实现



19.DIFF算法为什么是O(n)复杂度而不是O(n^3)

树节点与标记节点比较

20.http code码?
`
    	简单版
      	[
      		100  Continue	继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
      		200  OK 		正常返回信息
      		201  Created  	请求成功并且服务器创建了新的资源
      		202  Accepted 	服务器已接受请求，但尚未处理
      		301  Moved Permanently  请求的网页已永久移动到新位置。
      		302 Found  		临时性重定向。
      		303 See Other  	临时性重定向，且总是使用 GET 请求新的 URI。
      		304  Not Modified 自从上次请求后，请求的网页未修改过。
    
      		400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
      		401 Unauthorized 请求未授权。
      		403 Forbidden  	禁止访问。
      		404 Not Found  	找不到如何与 URI 相匹配的资源。
    
      		500 Internal Server Error  最常见的服务器端错误。
      		503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
      	]
`

21.移动端rem布局如何实现? 简述原理?
  跟节点设置font-size ，计算文字大小  以750宽  100/750 = fs /设计稿取值
如果dpr=1(如电脑端），则html的font-size为50px，也就是 1rem = 50px
如果dpr=2(如iphone 5 和 6），则html的font-size为100px，也就是 1rem = 100px
如果dpr=3(如iphone 6 sp），则html的font-size为150px，也就是 1rem = 150px
如果dpr为其他值，即便不是整数，如3.4 , 也是一样直接将dpr 乘以 50 。

22.JSbridge原理, js和native是如何通信的?
ios：拦截指定类型的WEBVIEW请求方式，  eval(code)
andorid：拦截指定类型的WEBVIEW请求方式， 

23.Rollup和webpack区别, treeshaking是什么?
Rollup偏向于js库   去掉冗余代码
24.TCP三次握手的过程, get post请求的区别 ?


get请求小 不安全 

25.静态文件的浏览器缓存如何实现?
Cache-Control

26.前端跨域方案
jsonp
allow-access-control
postMessage
27.http 请求包含哪些字段 分别是什么意思

请求行
请求头
请求体

28.js 有哪些数据类型 如何判断? null 和 undefined区别 应用场景?
29.new String('a') 和 'a' 是一样的么?
对象和简单数据
30.移动端如何实现下拉到底部 跟随移动 结束后回弹的动画?

31.移动端如何优化首页白屏时间过长 ?
骨骼屏，SSR
32.ES6 generator函数简述
```js
function *f() {
  yield '123' 
}
f().next();
```
33.数组去重实现?
转为set集合
for循环判断

34.js浮点数运算不精确 如何解决?
小数部分分开转换为整数运算，最后在加回去

35.公司的前端工程化实践

    sonar代码检测
    webpack模块化
    组件化
    自动化打包发布
    

36.DOM基础知识,添加元素,删除元素等等...
append()
var list=document.getElementById("myList");
list.removeChild(list.childNodes[0]);
37.DOM节点类型
文本类型，普通类型，替换类型  属性
38.正则表达式如何匹配一段url ?在正则表达式中有哪几种作用?

/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test('http://heml.we12.eee')

http://home.sss.sss:port/path/?

39.移动端优化方式? 离线包是如何实现的?
https://www.jianshu.com/p/0a65c3d03591




fetch和ajax



koa中间件洋葱模型

```js
function compose (middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

```





react生命周期

react性能优化

添加原生事件不移除为什么会内存泄露
事件中可以访问到的变量无法被释放

还有哪些地方会内存泄露

闭包，

setInterval需要注意的点

    指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的事件
    最短间隔时间是10毫秒
    
    requestAnimationFrame 比起 setTimeout、setInterval 的优势主要有两点：
    
    requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
    在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。
    

定时器为什么是不精确的
    
    执行需要时间
    队列等待需要时间

setTimeout(1)和setTimeout(2)之间的区别

介绍宏任务和微任务
    
    微任务：Promise Process.nexttick

promise里面和then里面执行有什么区别

介绍pureComponet

介绍Function Component

React数据流

props和state的区别
    
    父组件render会引起子组件re-render

介绍react context

 一个树结构上的全局状态

介绍class和ES5的类以及区别
    
    


介绍箭头函数和普通函数的区别

介绍defineProperty方法，什么时候需要用到

    对象 属性名 属性的描述

for..in 和 object.keys的区别

    for in 遍历原型链

介绍闭包，使用场景


使用闭包特权函数的使用场景


get和post有什么区别

数据发送的方式
数据传递的大小

A = {
a:B
}

B={
b:A
}

[A]

强缓存
Expires（该字段是 http1.0 时的规范，值为一个绝对时间的 GMT 格式的时间字符串，代表缓存资源的过期时间）
Cache-Control:max-age（该字段是 http1.1 的规范，强缓存利用其 max-age 值来判断缓存资源的最大生命周期，它的值单位为秒）
协商缓存
Last-Modified（值为资源最后更新时间，随服务器response返回）
If-Modified-Since（通过比较两个时间来判断资源在两次请求期间是否有过修改，如果没有修改，则命中协商缓存）
ETag（表示资源内容的唯一标识，随服务器response返回）
If-None-Match（服务器通过比较请求头部的If-None-Match与当前资源的ETag是否一致来判断资源是否在两次请求之间有过修改，如果没有修改，则命中协商缓存）