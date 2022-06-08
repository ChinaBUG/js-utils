/*
 * @Author: ChinaBUG
 * @Date: 2022-06-08 15:52:18
 * @LastEditTime: 2022-06-08 15:55:33
 * @LastEditors: pptogo-110
 * @Description: 开发者工具 控制台 输出的一些常用定义
 * @FilePath: \js-utils\develop-tools-console.js
 */

// 1.控制台输出内容为文件
// 改自网站：https://blog.csdn.net/weixin_45940312/article/details/123607495
(function(console) {
    console.save = function(data, filename) {
        let MIME_TYPE = "text/json";
        if (!data) return;
        if (!filename) filename = "console-{T}.json".replace('{T}', (new Date()).getTime());
        if (typeof data === "object") data = JSON.stringify(data, null, 4);
        let blob = new Blob([data], { type: MIME_TYPE });
        let e = document.createEvent("MouseEvent");
        let a = document.createElement("a");
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(":");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
})(console);

// 2.控制台指定输出文字的颜色
(function(console) {
    console.logCSS = function(logs, css) {
        css = css || '';
        switch (css) {
            case 'main':
                css = 'color: #43bb88;font-weight: bold;text-decoration: underline;';
                break;
            case 'success':
                css = 'color: #25a73b;';
                break;
            case 'warn':
                css = 'color: #b8c931f5;';
                break;
            case 'error':
                css = 'color: #ef3232;';
                break;
            default:
                css = 'color: #a7a7a7;';
                break;
        }
        if (typeof(logs) == 'object') {
            console.log("%o", logs);
        } else {
            console.log("%c" + logs, css);
        }
    }
})(console);

// 3.