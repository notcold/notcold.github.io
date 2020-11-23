---
layout: post
title: 解析psd文件转换成可用代码
description: 通过node服务对psd设计稿进行解析，分解出图片，样式，根据获取到的数据重新拼装成静态页面
categories:
 - node 
tags: 
 - node
 - psdjs
image: assets/images/5.jpg

---

## 核心psdjs

通过node安装[psdjs](https://github.com/meltingice/psd.js) 

```node
    npm install psdjs --save
```
### psdjs的用法

```node
    const PSD = require('psd');
    const psd = PSD.fromFile(file); //方法 PSD.fromFile 根据文件路径读取psd文件专户为对象
    psd.parse(); //将对象解析转换为普通的js对象，包含了所有的图层数据
    const root = psd.tree(); //获取到的root是所有图层的节点数据，root是一个树形的json数组
   
```

这样就获取到了正psd文件中所有图层的数据，包括节点的定位，文字节点的字体样式，dom元素就可以根据这些数据在html页面中定位和展示。



### ps重命名脚本

在ps中执行，将图片和文字图层按名字区分开，能大大简化

```node
//获取当前活动文档
var doc = activeDocument;

//获取文档活动图层
var layers = doc.layers;
var sum = 0;

function rename(layers) {
    //循环你图层
    for (var i = 0; i < layers.length; i++) {
        //图层是文本
        if (layers[i].layers && layers[i].layers.length > 0) {
            rename(layers[i].layers)
        }
        if (layers[i].kind === LayerKind.TEXT) {
            layers[i].name = "txt_" + sum;
        } else if (layers[i].kind === LayerKind.NORMAL) {
            layers[i].name = "pic_" + sum;
        }
        sum++;
    }
}
rename(layers)
```



## 使用psdjs获取数据和图片

### 图层数据
  ```node
   const data = root.export(); //获取json数组
      /*  data
          {
            "children": [
              {
                "type": "group",
                "visible": true,
                "opacity": 1,
                "blendingMode": "normal",
                "name": "组 9",
                "left": -6,
                "right": 525,
                "top": 10,
                "bottom": 460,
                "height": 450,
                "width": 531,
                "children": [
                  {
                    "type": "group",
                    "visible": true,
                    "opacity": 1,
                    "blendingMode": "normal",
                    "name": "1",
                    "left": -6,
                    "right": 525,
                    "top": 10,
                    "bottom": 460,
                    "height": 450,
                    "width": 531,
                    "children": []
                  }
                ]
              }
            ],
            "document": {
              "width": 1210,
              "height": 746,
              "resources": {
                "layerComps": [],
                "guides": [],
                "slices": []
              }
            }
          }、
          
      */
  ```


  ### 图片保存

  获取遍历psd中的图层并将图片它们保存下来，

  ```node
  let layers = root.descendants(); // descendants方法能够将树形树形转化为一位数组，这样遍历起来就非常简单
  
  layers.forEach((layer, i) => {
          if (layer.name.includes('pic_')) { //可以通过ps脚本将图层全部重命名，将图片和其他图层区分开
              transform(layer)
          }
      })
  
  function transform(item) {//图层上自带api方法，通过saveAsPng就可以保存到指定的路径下
      item.layer.image.saveAsPng('src/img/' + filename + '/' + item.name + '.png')
  }
  ```
## 解析数据组装页面


    将获取到的数据和图片用绝对定位布局的形式，展现到页面上   

```html

<body>
<a target="_blank" id="download" download="pic" href="">下载图片</a>
<div id="root" style="position: relative;"></div>
</body>
<script>

    var filename = location.search.split('=')[1];
    $('#download').attr('href','/download.json?temp='+filename)
    const $root = $('#root');

    var difleft = diftop = 0;
    
    $.get('/getdata.json' + location.search, function (data) {
        //获取图层数据的接口
        $root.css({
            width: data.document.width,
            height: data.document.height
        })
        transform(data.children, $root)

    })

    function transform(arr, target) {
        // body...

        arr.forEach((item, i) => {
            item.name = item.name.replace(/ /g, 's')
            target.append('<div id="' + item.name + '"></div>')

            let $div = target.find('#'+item.name)

            $div.css({
                'position': 'absolute',
                'z-index': 1000 - i
            });
            if (item.type != 'group') {
                $div.css({
                    height: item.height,
                    top: item.top - diftop,
                    left: item.left - difleft
                });
                if (item.text && item.text != {}) {
                    $div.html(item.text.value.replace(' ', '&nbsp;'))
                    $div.css({
                        width: item.width + 5
                    });
                    $div.css({
                        'font-size': item.text.font.sizes[0] * item.text.transform['xx'],
                        'line-height': item.text.font.sizes[0] * item.text.transform['xx'] + 'px',
                        'font-family': item.text.font.name,
                        'color': 'rgba(' + arr2Str(item.text.font.colors[0]) + ')',
                        'text-align': item.text.font.alignment
                    });
                } else {
                    $div.css({
                        width: item.width
                    });
                    $div.css({
                        background: 'url(./img/'+filename +'/' + item.name + '.png)'
                    });
                }
            }

            if (item.mask && item.mask != {}) {
                $div.css({
                    height: item.height,
                    top: item.top - diftop,
                    left: item.left - difleft,
                });
            }

            if (item.children) {
                transform(item.children, $div)
            }
        })
    }

    function arr2Str(colors) {
        return colors[0] + ',' + colors[1] + ',' + colors[2] + ',' + colors[3]
    }


```


