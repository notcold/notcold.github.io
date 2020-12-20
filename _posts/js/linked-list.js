// 周末花时间尝试实现了一个链表

class LinkList {
  constructor(arr) {
    if (arr && Array.isArray(arr)) {
      this.fromArray(arr);
    }
    return this;
  }
  length = 0;
  head = null;

  push(data) {
    if (this.head !== null) {
      const node = new LinkNode(data);
      const first = this.head;
      while (first.next !== null) {
        first = first.next;
      }
      first.next = node;
    } else {
      this.head = new LinkNode(data);
    }
    this.length++;
  }
  pop() {
    const node = this.head;
    this.head = this.head.next;
    this.length--;
    return node;
  }
  delete(node) {
    let _this = this.head;
    if (this.head === node) {
      this.head = node.next;
    } else {
      while (_this.next) {
        if (_this.next === node) {
          _this.next = node.next;
          node = null;
          break;
        } else {
          _this = _this.next;
        }
      }
    }
  }
  reverse() {
    if (this.head !== null) {
      let _this = this.head;
      while (_this) {
        const temp = _this.next;
        _this.next = this.head;
        this.head = _this;
        if (this.head.next === this.head) {
          this.head.next = null;
        }
        _this = temp;
      }
    }
  }
  // 合并两个有序链表
  concat(linkList) {
    let l1 = this.head;
    let l2 = linkList.head;
    let prev = new ListNode()
    while (_this && _next) {
        if (l1.value <= l2.value) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }
    _this.next = linkList.head;
  }
  // 是否存在环
  hasCircle() {
    let flag = false;
    let pFast = this.head;
    let pSlow = this.head;
    try {
      while (pFast.next && pSlow.next) {
        pFast = pFast.next;
        pFast = pFast.next;
        pSlow = pSlow.next;
        if (pFast === pSlow) {
          flag = true;
          break;
        }
      }
    } catch (error) {
      return flag;
    }

    return flag;
  }
  // 从数组转化
  fromArray(arr) {
    let _this = null;
    arr.forEach((element, i) => {
      if (_this !== null) {
        _this.next = new LinkNode(element);
        _this = _this.next;
      } else {
        _this = new LinkNode(element);
        this.head = _this;
      }
    });
    this.length = arr.length;
  }
  toArray() {
    const arr = [];
    let _this = this.head;
    while (_this.next) {
      arr.push(_this.value);
    }
    return arr;
  }
}

class LinkNode {
  value = null;
  next = null;
  constructor(data) {
    this.value = data;
  }
}

const list = new LinkList([1, 2, 3, 4, 5, 6]);
