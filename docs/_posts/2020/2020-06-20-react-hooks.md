---
layout: post
title: react-hooks
description: 为什么要用hooks以及hooks是如何实现的
categories: [react]
tags: [hooks]
---

## 什么是 hooks

hooks 是 react16.8 版本推出的`Function Component`的新特性.[React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。](http://www.ruanyifeng.com/blog/2019/09/react-hooks.html)

## 为什么要用 hooks

React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。使用 Hooks 使开发者在开发组件的时候可以使用函数组件

用hooks实现一个按钮组件，相比于 Class Component组件简洁了很多，函数组件没有实例的特性也使得运行更加轻量
```js

export default function Button() {
  const [buttonText, setButtonText] = useState("Click me,   please");

  function handleClick() {
    return setButtonText("Thanks, been clicked!");
  }

  return <button onClick={handleClick}>{buttonText}</button>;
}
```

## hooks 的原理是什么

hooks 的实现依赖与 react 的 fiber 架构，fiber 节点的特性使得 hooks 可以被存储在非对象组件上。

下面是 useEffect 的源码

```js
//hooks存储在 ·workInProgressHook·  链表中
// 在组件第一次执行mount阶段时，生成第一个  workInProgressHook 并挂载到fiber节点的memoizedState
// 每次组件重新render 都重新从 fiber 节点获取到内部hooks存储的状态链表
function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,

    baseState: null,
    baseQueue: null,
    queue: null,

    next: null,
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

// 更新时，从使用的hooks一一对应的从 fiber的memoizedState 中一个个取出hooks状态并付给workInProgressHook这个全局变量
function updateWorkInProgressHook(): Hook {
  // This function is used both for updates and for re-renders triggered by a
  // render phase update. It assumes there is either a current hook we can
  // clone, or a work-in-progress hook from a previous render pass that we can
  // use as a base. When we reach the end of the base list, we must switch to
  // the dispatcher used for mounts.
  // 开始取hooks，如果全局指针
  let nextCurrentHook: null | Hook;
  if (currentHook === null) {
    let current = currentlyRenderingFiber.alternate;
    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    nextCurrentHook = currentHook.next;
  }

  let nextWorkInProgressHook: null | Hook;
  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
  } else {
    // Clone from the current hook.
    // hooks数量跟初始状态不一致
    invariant(
      nextCurrentHook !== null,
      "Rendered more hooks than during the previous render."
    );
    currentHook = nextCurrentHook;

    const newHook: Hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,

      next: null,
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
  }
  return workInProgressHook;
}

//以useEffect为例，在mount阶段和update阶段分别调用不同的方法mountEffect和updateEffect，分别对应mountEffectImpl和updateEffectImpl

// 第一次初始化的时候挂载方法
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps): void {
  //当前hook对象
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  //当前fiber节点
  currentlyRenderingFiber.effectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(
    HookHasEffect | hookEffectTag,
    create,
    undefined,
    nextDeps
  );
}
//update的时候基本逻辑跟其他hooks差不多，最终都是通过pushEffect方法，最终触发执行
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps): void {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy = undefined;

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        pushEffect(hookEffectTag, create, destroy, nextDeps);
        return;
      }
    }
  }

  currentlyRenderingFiber.effectTag |= fiberEffectTag;

  hook.memoizedState = pushEffect(
    HookHasEffect | hookEffectTag,
    create,
    destroy,
    nextDeps
  );
}
//往当前renderFiber节点的lasteffect queue上添加执行方法
function pushEffect(tag, create, destroy, deps) {
  const effect: Effect = {
    tag,
    create,
    destroy,
    deps,
    // Circular
    next: (null: any),
  };
  // 在commitRoot方法中最后被调用
  let componentUpdateQueue: null | FunctionComponentUpdateQueue = (currentlyRenderingFiber.updateQueue: any);
  if (componentUpdateQueue === null) {
    // 创建queue
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = (componentUpdateQueue: any);
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    // queue已存在则添加effect到queue上
    const lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  return effect;
}

// [state,setState] = useState()
// 对应 setState的执行方法
//
function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A
) {
  //
  const currentTime = requestCurrentTimeForUpdate();
  const suspenseConfig = requestCurrentSuspenseConfig();
  const expirationTime = computeExpirationForFiber(
    currentTime,
    fiber,
    suspenseConfig
  );

  // 创建一个更新任务
  const update: Update<S, A> = {
    expirationTime,
    suspenseConfig,
    action,
    eagerReducer: null,
    eagerState: null,
    next: (null: any),
  };

  // Append the update to the end of the list.
  const pending = queue.pending;
  if (pending === null) {
    // This is the first update. Create a circular list.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  const alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber ||
    (alternate !== null && alternate === currentlyRenderingFiber)
  ) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdate = true;
    update.expirationTime = renderExpirationTime;
    currentlyRenderingFiber.expirationTime = renderExpirationTime;
  } else {
    // 省略一些逻辑代码
    // 把修改内容放入 调度任务
    scheduleWork(fiber, expirationTime);
  }
}
```
