/**
 * Created by shikuan on 2019/3/6.
 */

//1
[1,2,3].map(parseInt);

[1,2,3].map(function ( v,k ) {
    return parseInt(v,k)
})

//2

[typeof null, null instanceof Object]

['object',false]


//3
    [ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ]
[3,2,1].reduce(function ( a,b ) {
    return Math.pow(a,b);
})  //9

    [].reduce(Math.pow) //error

//4
var val = 'smtg';           //true
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');//Something

//5

var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

//6
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;      //小于等于 无限循环   ，小于才会输出100
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count);


//7
var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});  // [] 跳过了空值

//8
var two   = 0.2
var one   = 0.1
var eight = 0.8
var six   = 0.6
    [two - one == one, eight - six == two]

//9
function showCase(value) {
    switch(value) {
        case 'A':
            console.log('Case A');
            break;
        case 'B':
            console.log('Case B');
            break;
        case undefined:
            console.log('undefined');
            break;
        default:
            console.log('Do not know!');
    }
}
showCase(new String('A')); //switch是严格比较
//10
showCase(String('A')); //'Case A'

//11
function isOdd(num) {
    return num % 2 == 1;
}
function isEven(num) {
    return num % 2 == 0;
}
function isSane(num) {
    return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity];
values.map(isSane);

//12
parseInt(3, 8)  //3
parseInt(3, 2)  //NAN 2进制中没有3
parseInt(3, 0) //NAN

//13
Array.isArray( Array.prototype ) // Array.prototype  => []

//14
var a = [0];
if ([0]) {
    console.log(a == true); // false
} else {
    console.log("wut");
}

//15

[] == []

//16
'5' + 3
'5' - 3

//17

1 + - + + + - + 1  =  2   //从右往左

//18
var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; });

//19
function sidEffecting(ary) {
    ary[0] = ary[2];
}
function bar(a,b,c) {
    c = 10
    console.log(arguments)
    sidEffecting(arguments);
    return a + b + c;
}
bar(1,1,1) //21

//20
var a = 111111111111111110000,
    b = 1111;
a + b;  //111111111111111110000  超出js范围了

//21
var x = [].reverse;  //考察this
x();

//22
Number.MIN_VALUE > 0  //不是负数


//23

    [1 < 2 < 3, 3 < 2 < 1] // [true ,true]

//24

2 == [[[2]]]

//25
3.toString()  //error
3..toString()
3...toString()


//26

(function(){
    var x = y = 1;
})();
console.log(y);  //1
console.log(x); //error

//27
var a = /123/,
    b = /123/;
a == b
a === b

//28
var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4]
a ==  b  //false
a === b  //false
a >   c  //false
a <   c  //true

//29
var a = {}, b = Object.prototype;
[a.prototype === b, Object.getPrototypeOf(a) === b]  //false

//30
function f() {}
var a = f.prototype, b = Object.getPrototypeOf(f);
a === b   //false

a === Object.getPrototypeOf(new f()) // true
b === Function.prototype // true

//31
function foo() { }
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name] //foo

//32
"1 2 3".replace(/\d/g, parseInt)
//如果replace函数传入的第二个参数是函数, 那么这个函数将接受如下参数
//
// match 首先是匹配的字符串
// p1, p2 .... 然后是正则的分组
// offset match 匹配的index
// string 整个字符串

//"1 2 3".replace(/\d/g, (...arg)=>{console.log(arg)})
// VM2421:1 (3) ["1", 0, "1 2 3"]
// VM2421:1 (3) ["2", 2, "1 2 3"]
// VM2421:1 (3) ["3", 4, "1 2 3"]
// "undefined undefined undefined"

//33
function f() {}
var parent = Object.getPrototypeOf(f);
f.name // ? f
parent.name // ?  ""
typeof eval(f.name) // ?   f源码
typeof eval(parent.name) //  ? undefined

//34

var lowerCaseOnly =  /^[a-z]+$/;
                                        undefined
[lowerCaseOnly.test(null), lowerCaseOnly.test()] // [true,true]

//35
    [,,,].join(",")
//36
var a = {class: "Animal", name: 'Fido'};
a.class

//37
var a = new Date("epoch")  //Invalid Date

//38
var a = Function.length, //1
    b = new Function().length
a === b

//39
var a = Date(0);
var b = new Date(0);
var c = new Date();
[a === b, b === c, a === c] [false,false,false]

//40
var min = Math.min() //Infinity
 , max = Math.max() //-Infinity
min < max  //false

//41
function captureOne(re, str) {
    var match = re.exec(str);
    return match && match[1];
}
var numRe  = /num=(\d+)/ig,
    wordRe = /word=(\w+)/i,
    a1 = captureOne(numRe,  "num=1"),
    a2 = captureOne(wordRe, "word=1"),
    a3 = captureOne(numRe,  "NUM=2"),  //g具有记忆功能
    a4 = captureOne(wordRe,  "WORD=2");
[a1 === a2, a3 === a4]

//42
var a = new Date("2014-03-19"),  //3月
    b = new Date(2014, 03, 19); //4月
[a.getDay() === b.getDay(), a.getMonth() === b.getMonth()]

