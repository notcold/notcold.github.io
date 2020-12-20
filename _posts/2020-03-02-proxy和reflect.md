---
layout: post
title: proxy代理和reflect反射
description: 逐渐拓展知识面
categories: [js]
tags: [es6]
image: 
---

Proxy 代理
我们先来看一些简单的场景，借用上节课的例子：

class Person {
constructor (name) {
this.name = name
}
}

let proxyPersonClass = new Proxy(Person, {
apply (target, context, args) {
throw new Error(`hello: Function ${target.name} cannot be invoked without 'new'`)
}
})

我们对 Person 构造函数进行了代理，这样就可以防止非构造函数实例化的调用：

proxyPersonClass('lucas')

// VM173058:9 Uncaught Error: hello: Function Person cannot be invoked without 'new'
at :1:1

new proxyPersonClass('lucas')
// {name: "lucas"}

同样道理，也可以静默处理非构造函数实例化的调用，将其强制转换为 new 调用：

class Person {
constructor (name) {
this.name = name
}
}

let proxyPersonClass = new Proxy(Person, {
apply (target, context, args) {
return new (target.bind(context, ...args))()
}
})

这样即便在不使用 new 关键字时，仍然可以得到 new 调用的实例：

proxyPersonClass('lucas')
// Person {name: "lucas"}

另外一个场景：熟悉前端测试的读者，可能对断言 assert 并不陌生，一种常用的使用方式是：

const lucas = {
age: 23
}
assert['lucas is older than 22!!!'] = 22 > lucas.age

// Error: lucas is older than 22!!!

我们看 assert 赋值语句右侧表达式结果为一个布尔值，当表达式成立时，断言不会抛出；如果 assert 赋值语句右侧表达式不成立时，也就是断言失败时，断言抛出错误。

乍看上去这是不是很神奇？如果面试过程中，面试官要求你实现一个 assert，该怎么做呢？这样一个断言库本质上还是拦截 assert 对象的赋值（set）操作：

const assert = new Proxy({}, {
set (target, warning, value) {
if (!value) {
console.error(warning)
}
}
})

这样我们只需要判读对 assert 的赋值值是否为 true，如果不为 true，则打印错误。

是不是很简单？这样我们就可以随意进行断言：

const weather = 'cold'
assert['The weather is not good!!!'] = weather === 'good'

// Error: The weather is not good!!!

这些只是 Proxy 实现的一些很简单的例子，这里抛砖引玉，大家可以充分发挥想象力，创造更多的玩法。
