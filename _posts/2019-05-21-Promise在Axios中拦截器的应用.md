---
layout: post
title: Promise在Axios拦截器的应用
description: Axios通过Promise的链式调用实现拦截器
categories:
 - Javascript 
tags: 
 - Promise
image: assets/images/2bis.jpg

---

## Axios的拦截器

在Axios中可以在通过use方法添加通用的方法，用来在请求发送前和响应之后

```js

// 添加请求拦截器
axios.interceptors.request.use(
  function(config:any) {
    // 在发送请求之前做些什么
    return config
  },
  function(error:any) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // console.log(response.data)
    // response.status == '401'
    // 对响应数据做点什么
    
    return response
  },
  function(error) {
    // 对响应错误做点什么
    
    return Promise.reject(error)
  }
)
```



## 一般的拦截方式

一般的方式就是通过在请求方法中注入代码，严格的在请求发起前和请求回来后的毁掉函数中增加调用

```

if(interceptors.request){
	//调用请求拦截器
}
request(()=>{
	//请求返回后
	if(interceptors.response){
	//调用响应拦截器
}
})//发起请求



```



## Axios的拦截方式

```js

//创建一个Promise的队列，包含了请求发起的Promise方法
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
//把请求拦截器添加到队列前面
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
//把响应拦截器添加到队列后
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
//清空队列，调用全部的方法，所有的方法通过Promise按照队列顺序执行，请求拦截器执行完后就会调用请求发起，
//请求完成后Promise对象会继续调用队列中的方法执行响应拦截器，从而实现了拦截器和请求的顺序执行
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
```

# 收获

从Axios的拦截器的实现方式，学习到了Promise实现顺序调用的新招，可以更好的解耦代码，让核心代码专注功能，把

执行控制交给Promise去做。