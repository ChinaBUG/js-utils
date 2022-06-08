/*
 * @Author: ChinaBUG
 * @Date: 2022-06-08 16:01:39
 * @LastEditTime: 2022-06-08 16:10:16
 * @LastEditors: pptogo-110
 * @Description: 下载 国家中小学智慧教育平台 视频的办法
 * @FilePath: \js-utils\case\case-smartedu-cn-sync-classroom.js
 */

// 使用说明：
// 1. 使用 chrome 或者 火狐 打开网站
// https: //basic.smartedu.cn/syncClassroom
// 2. 找到想要的课程
// 3. 看完
// 因为没看完， 是不会把“ 视频文件链接” 都下载， 用脚本没办法获取到下载链接的。
// PS： 主要是没时间去找怎么获取教程的播放列表， 偷个懒。
// 4. 打开开发者工具
// 鼠标右键“检查”， 或者按键盘上的F12。
// 5. 在面板中找到控制台
// 找到左边的那个右三角， 输入以下代码。
// 复制， 粘贴后， 记得按键盘上的回车键。

// 1.点击右键下载
// 效果：
// 执行后，会新打开一个页面，里面用数字代表每一个视频文件，有多少数字就有多少个视频文件，鼠标移动到数字上方，右键点击，菜单内选择下载文件
var openO = window.open();
var tsList = window.performance.getEntries().filter(e => e.initiatorType === 'xmlhttprequest' && e.name.substr(-3) == '.ts');
openO.document.write("<div style='display: flex;flex-direction: row;flex-wrap: wrap;align-content: center;justify-content: flex-start;align-items: flex-start;'>");
tsList.forEach(function(el, idx) { openO.document.write("<a href='" + el.name + "' style='flex: 1;'>" + (idx + 1) + "</a>"); });
openO.document.write("</div>");

// 2.使用下载工具批量下载
// 效果：
// 执行后，会新打开一个页面，里面按照一个网址一行，有多少行就有多少个视频文件，全选复制，到下载工具中选择批量下载，粘贴就可以
var openO = window.open();
var tsList = window.performance.getEntries().filter(e => e.initiatorType === 'xmlhttprequest' && e.name.substr(-3) == '.ts');
openO.document.write("<div style='display: flex;flex-direction: row;flex-wrap: wrap;align-content: center;justify-content: flex-start;align-items: flex-start;'>");
tsList.forEach(function(el, idx) { openO.document.write("<span style='flex: 1;'>" + el.name + "</span>"); });
openO.document.write("</div>");