/*
 * @Author: ChinaBUG
 * @Date: 2022-06-08 15:30:05
 * @LastEditTime: 2022-06-08 15:45:54
 * @LastEditors: pptogo-110
 * @Description: 原生的Ajax操作
 * @FilePath: \js-utils\ajax.js
 */

// 代码来自：
// http://c.biancheng.net/view/5995.html

// xhr.open(method, url, async, username, password);
// method：     HTTP 请求方法，必须参数，值包括 POST、GET 和 HEAD，大小写不敏感。
// url：        请求的 URL 字符串，必须参数，大部分浏览器仅支持同源请求。
// async：      指定请求是否为异步方式，默认为 true。如果为 false，当状态改变时会立即调用 onreadystatechange 属性指定的回调函数。
// username：   可选参数，如果服务器需要验证，该参数指定用户名，如果未指定，当服务器需要验证时，会弹出验证窗口。
// password：   可选参数，验证信息中的密码部分，如果用户名为空，则该值将被忽略。
// 
// xhr.send(body);
// 参数 body 表示将通过该请求发送的数据，如果不传递信息，可以设置为 null 或者省略。
// 
// xhr.responseBody|responseStream|responseText|responseXML
// responseBody 	将响应信息正文以 Unsigned Byte 数组形式返回
// responseStream 	以 ADO Stream 对象的形式返回响应信息
// responseText	    将响应信息作为字符串返回
// responseXML	    将响应信息格式化为 XML 文档格式返回

// 1.定义对象
function createXHR() {
    var XHR = [ //兼容不同浏览器和版本得创建函数数组
        function() { return new XMLHttpRequest() },
        function() { return new ActiveXObject("Msxml2.XMLHTTP") },
        function() { return new ActiveXObject("Msxml3.XMLHTTP") },
        function() { return new ActiveXObject("Microsoft.XMLHTTP") }
    ];
    var xhr = null;
    //尝试调用函数,如果成功则返回XMLHttpRequest对象,否则继续尝试
    for (var i = 0; i < XHR.length; i++) {
        try {
            xhr = XHR[i]();
        } catch (e) {
            continue //如果发生异常,则继续下一个函数调用
        }
        break; //如果成功,则中止循环
    }
    return xhr; //返回对象实例
}

// 2.基本使用
// 2.1 GET
var xhr = createXHR();
xhr.open("GET", queryUrl, false);
xhr.send(null);
console.log(xhr.responseText);
// 2.2 POST
var xhr = createXHR();
xhr.open("POST", queryUrl, false);
xhr.send("name1=value1&name2=value2...");
console.log(xhr.responseText);

// 3.高级使用
// 3.1 请求头
var xhr = createXHR();
xhr.open("GET", queryUrl, false);
// 注意：请求头一定要在open与send之间
xhr.setRequestHeader("accept-encoding", "gzip, deflate, br");
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded; charset=utf-8");
xhr.setRequestHeader("token", "5032ac4a8de1d75341173b936ac38592");
// 
xhr.send(null);
console.log(xhr.responseText);
// 3.2 响应头
var xhr = createXHR();
xhr.open("GET", queryUrl, false);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.getAllResponseHeaders());
    }
}
xhr.send(null);
console.log(xhr.responseText);