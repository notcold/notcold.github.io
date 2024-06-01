---

title: 常用的dom操作api
description: dom操作中常用的一些api方法
categories:
  - document

---


### getBoundingClientRect
  getBoundingClientRect获取元素定位
```js
  const rect = dom.getBoundingClientRect()
  /**
  {
        bottom: -37763.796875
        height: 45
        left: 855
        right: 1095
        top: -37808.796875
        width: 240
        x: 855
        y: -37808.796875
  }
  
  */ 

```

### appendChild
  添加子元素