---
layout: post
title: XMLHttpRequest对象
description: 
categories:
 - browser 
tags: 
 - ajax

image: assets/images/5.jpg

---

# XMLHttpRequest对象介绍

### 什么是 XMLHttpRequest 对象？

##### XMLHttpRequest 对象用于在后台与服务器交换数据。
    
#####  XMLHttpRequest 对象是开发者的梦想，因为您能够：
    
   - 在不重新加载页面的情况下更新网页
   - 在页面已加载后从服务器请求数据
   - 在页面已加载后从服务器接收数据
   - 在后台向服务器发送数据
   
##### 所有现代的浏览器都支持 XMLHttpRequest 对象。
    from W3C

### 创建 XMLHttpRequest 对象
    
 (IE7+、Firefox、Chrome、Safari 以及 Opera) 
   
    xhr = new XMLHttpRequest();
    
  Internet Explorer （IE5 和 IE6）
  
    xhr =new ActiveXObject("Microsoft.XMLHTTP");

  xhr对象  
```js
    {
           onabort: null  //打断请求时的回调
           onerror: null  //请求失败的回调
           onload: null   //请求中的回调
           onloadend: null //请求结束
           onloadstart: null //请求开始
           onprogress: null 
           onreadystatechange: null     
           ontimeout: null
           readyState: 0
           response: ""
           responseText: ""
           responseType: ""
           responseURL: ""
           responseXML: null
           status: 0
           statusText: ""
           timeout: 0
           upload: XMLHttpRequestUpload 
           withCredentials: false
           __proto__: XMLHttpRequest
       }
```

一个简单的xhr请求

```js
 
        const client = new XMLHttpRequest();
        client.open("GET", url);//url可以是一个下载地址也可以是一个网页地址
        client.onreadystatechange = function() {
            if (xhr.readyState >= 3) {
                //数据成功返回
            }
        };
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send(); //get请求不需要send数据
 
```
