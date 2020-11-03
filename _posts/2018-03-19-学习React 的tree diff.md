---
layout: post
image: assets/images/5.jpg

---


React提出的virtualDOM与diff算法是它作为框架一直为人津津乐道的地方，两者的结合对前端框架的理念是颠覆性的，

也是开发者提到React必定会探讨的东西。React的diff算法在传统的diff操作上结合Web的特性做了大胆的策略优化。



## 传统的diff

[传统 diff 算法](https://link.zhihu.com/?target=http%3A//grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)通过循环递归对节点进行依次对比，算法复杂度达到 O(n^3)，其中 n 是树中节点的总数。每一个节点都要被遍历多次，当节点数量变的很大的时候，这种方法效率会非常低下，在页面中会导致卡顿，卡死。



## React的diff

react的设计者们根据dom变化的特点将传统的算法缩减了许多操作。

#### diff策略

1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3. 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

根据这样的策略，React分别对 tree diff、component diff 以及 element diff 进行算法优化，他们也是React diff操作的三个核心。

- tree diff      不需要做跨层级比较
- component diff  同类型组件才需要比较，不同类型直接替换
-  element diff   同层级做好标记，根据id判断节点是否变化





