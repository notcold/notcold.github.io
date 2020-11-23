---
layout: post
title: React Schedul 源码学习
description: 学习了解React中任务如何安排调度执行
categories: [ React]
tags: [ 源码 ]
image: assets/images/react/schedule.png

---


# React Schedul


  React 的schedule原理
  花了一个大概的图简单描述一个任务进入调度到他执行的过程。

  调度![图片]({{site.url}}/assets/images/react/schedule.png)

  下面是代码的流转过程

```js


// scheduleCallback

// 首先任务进入该方法进行分配，进行时间计算后判断是否需要延后执行
//  需要则先把任务加入到一个时间等待队列中 ，如果任务的开始执行时间最早，则重新设置定时 `startTime - currentTime`ms 后执行 
//  不需要则加入任务执行队列，如果队列为空则立即开始执行
function unstable_scheduleCallback(priorityLevel, callback, options) {
  // 获取当前时间
  var currentTime = getCurrentTime();
  
  var startTime;
  var timeout;
  // 计算任务的开始时间和一个延迟的时间
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay;
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
    // 从option取或者根据任务优先级取
    timeout =
      typeof options.timeout === 'number'
        ? options.timeout
        : timeoutForPriorityLevel(priorityLevel);
  } else {
    // 如果option没有安排开始时间 startTime就是当前时间
    timeout = timeoutForPriorityLevel(priorityLevel);
    startTime = currentTime;
  }
  // 计算得到任务的过期时间
  var expirationTime = startTime + timeout;
  // 构建一个任务对象
  var newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel, // 任务优先级
    startTime,    // 任务开始执行时间
    expirationTime,  //任务延迟时间，超过这个时间必须要执行
    sortIndex: -1,
  };
  // 任务执行开始时间如果不等于当前时间，任务需要调度执行
  if (startTime > currentTime) {
    // 任务延迟执行， sortIndex是开始时间，推入任务队列按时间排序
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);
    // 如果任务队列为空，并且，当前任务是 时间排期队列中第一个
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // 如果在调度中就退出
      if (isHostTimeoutScheduled) {
        cancelHostTimeout();
      } else {
        // 设置开始调度
        isHostTimeoutScheduled = true;
      }
      // 调用调度方法开始调度 类似setTimeout设置时间到任务开始时间
      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    // 任务直接进入执行队列，按过期时间排序
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);
    // 如果没有在调度也没有再执行，那么就开始执行
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
}
        



// 时间延迟队列的 任务定时执行
// 两种实现方式，一种是通过 MessageChannel 的方式异步消息循环发送的方式
const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;

  requestHostCallback = function(callback) {
    scheduledHostCallback = callback;
    if (!isMessageLoopRunning) {
      isMessageLoopRunning = true;
      port.postMessage(null);
    }
  };

// 一种是直接通过setTimeout的方式执行任务
// 异步启动任务队列执行
requestHostCallback = function(cb) {
    if (_callback !== null) {
      // 防止重复调用
      setTimeout(requestHostCallback, 0, cb);
    } else {
      //_callback 赋值，在_flushCallback方法中被调用
      _callback = cb;
      //开始队列
      setTimeout(_flushCallback, 0);
    }
  };



// 判断是否有任务在调度队列中
// 有就开始调度
// 没有就查看定时队列进入下次判断，不断定时循环直到有任务可以开始执行
function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;
  advanceTimers(currentTime);
  // 确定没有任务在队列调度中
  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      // 进入任务执行 队列
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else {
      const firstTimer = peek(timerQueue);
      if (firstTimer !== null) 
        // 取时间队列中的最早的任务定时启动
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
    }
  }
}

// 开始任务队列，处理一些控制符号，开始队列循环，发生一场就设置退出
function flushWork(hasTimeRemaining, initialTime) {
  if (enableProfiling) {
    markSchedulerUnsuspended(initialTime);
  }
  isHostCallbackScheduled = false;
  // 有新的任务开始了，如果有时间延迟队列在进行中就退出掉，等待任务队列执行
  if (isHostTimeoutScheduled) {
    isHostTimeoutScheduled = false;
    cancelHostTimeout();
  }
  // 设置开始执行
  isPerformingWork = true;
  const previousPriorityLevel = currentPriorityLevel;
  try {
    // 环境变量
    if (enableProfiling) {
      try {
        return workLoop(hasTimeRemaining, initialTime);
      } catch (error) {
        if (currentTask !== null) {
          const currentTime = getCurrentTime();
          markTaskErrored(currentTask, currentTime);
          currentTask.isQueued = false;
        }
        throw error;
      }
    } else {
      // No catch in prod codepath.
      return workLoop(hasTimeRemaining, initialTime);
    }
  } finally {
    currentTask = null;
    //任务优先级
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
}
//任务队列循环
function workLoop(hasTimeRemaining, initialTime) {
  //当前时间
  let currentTime = initialTime;
  //当前时间去判断时间队列中是否有任务可以开始执行了，有就送入任务队列
  advanceTimers(currentTime);
  // 从队列头部取一个任务
  currentTask = peek(taskQueue);
  while (
    // 有任务，并且调度没暂停
    currentTask !== null &&
    !(enableSchedulerDebugging && isSchedulerPaused)
  ) {
    if (
      // 当前任务没有过期并且当前时间片没有剩余时间了就退出
      currentTask.expirationTime > currentTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      break;
    }
    // 任务过期了或者当前时间还没到deadline就继续执行任务
    // 任务的执行方法
    const callback = currentTask.callback;
    if (callback !== null) {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel;
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      markTaskRun(currentTask, currentTime);
      // 任务执行还有返回还有后序任务则继续执行，否则执行队列中下一个任务
      const continuationCallback = callback(didUserCallbackTimeout);
      currentTime = getCurrentTime();
      // 如果当前任务方法的返回还是方法则这个任务没有结束不从队列中移除
      if (typeof continuationCallback === 'function') {
        // 任务结果是任务新的执行方法
        currentTask.callback = continuationCallback;
        markTaskYield(currentTask, currentTime);
      } else {
        // 任务完成从对立中移除
        if (currentTask === peek(taskQueue)) {
          pop(taskQueue);
        }
      }
      // 一个刷新时间延迟队列的方法，判断是否有任务到执行时间了有就把任务移到执行队列
      advanceTimers(currentTime);
    } else {
      //当前任务已结束从队列中移除
      pop(taskQueue);
    }
    //下一个循环开始
    currentTask = peek(taskQueue);
  }
  // 返回当前任务队列是否还有任务没执行
  if (currentTask !== null) {
    return true;
  } else {
    // 没有就判断是否要开始 时间队列异步调度
    let firstTimer = peek(timerQueue);
    if (firstTimer !== null) {
      // 定时启动最早的时间任务
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
    return false;
  }
}


```

  上面是Schedule 大致的代码流程，通过 `setTimeout` 或者 `MessageChannel` 实现任务的异步执行。Schedule模块已经被从React代码中单独抽成一个功能，可以脱离React单独使用，在某些适用的需求中可以引入使用。