---

title: proxy代理和reflect反射
description: 逐渐拓展知识面
categories: [js]
tags: [es6]
---




```
copy 过来的一些点，待整理
```
## Proxy 代理
我们先来看一些简单的场景，借用上节课的例子：

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

let proxyPersonClass = new Proxy(Person, {
  apply(target, context, args) {
    throw new Error(
      `hello: Function ${target.name} cannot be invoked without 'new'`
    );
  },
});
```

我们对 Person 构造函数进行了代理，这样就可以防止非构造函数实例化的调用：

```js
proxyPersonClass("lucas");

// VM173058:9 Uncaught Error: hello: Function Person cannot be invoked without 'new'
//at :1:1

new proxyPersonClass("lucas");
// {name: "lucas"}

//同样道理，也可以静默处理非构造函数实例化的调用，将其强制转换为 new 调用：

class Person {
  constructor(name) {
    this.name = name;
  }
}

let proxyPersonClass = new Proxy(Person, {
  apply(target, context, args) {
    return new (target.bind(context, ...args))();
  },
});
```

这样即便在不使用 new 关键字时，仍然可以得到 new 调用的实例：

```js
proxyPersonClass("lucas");
// Person {name: "lucas"}
```

另外一个场景：熟悉前端测试的读者，可能对断言 assert 并不陌生，一种常用的使用方式是：

```js
const lucas = {
  age: 23,
};
assert["lucas is older than 22!!!"] = 22 > lucas.age;

// Error: lucas is older than 22!!!
```

我们看 assert 赋值语句右侧表达式结果为一个布尔值，当表达式成立时，断言不会抛出；如果 assert 赋值语句右侧表达式不成立时，也就是断言失败时，断言抛出错误。

乍看上去这是不是很神奇？如果面试过程中，面试官要求你实现一个 assert，该怎么做呢？这样一个断言库本质上还是拦截 assert 对象的赋值（set）操作：

```js
const assert = new Proxy(
  {},
  {
    set(target, warning, value) {
      if (!value) {
        console.error(warning);
      }
    },
  }
);
```

这样我们只需要判读对 assert 的赋值值是否为 true，如果不为 true，则打印错误。

是不是很简单？这样我们就可以随意进行断言：

```js
const weather = "cold";
assert["The weather is not good!!!"] = weather === "good";

// Error: The weather is not good!!!
```

这些只是 Proxy 实现的一些很简单的例子，这里抛砖引玉，大家可以充分发挥想象力，创造更多的玩法。

Proxy 支持的拦截操作一览，一共 13 种,包括对全部的对象上属性的访问和设置

- get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。
- has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。
- deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。
- ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
- getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。
