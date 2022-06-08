/*
 * @Author: ChinaBUG
 * @Date: 2022-06-08 15:25:20
 * @LastEditTime: 2022-06-08 15:26:48
 * @LastEditors: pptogo-110
 * @Description: 浏览器开发者工具的脚本化操作
 * @FilePath: \js-utils\develop-tools-performance.js
 */

// 获取浏览器开发者工具内载入的资源
var tsList = window.performance.getEntries();

// 获取异步加载的文件
var tsList = window.performance.getEntries().filter(e => e.initiatorType === 'xmlhttprequest');

// 获取异步加载的文件并匹配打开的资源地址
var tsList = window.performance.getEntries().filter(e => e.initiatorType === 'xmlhttprequest' && /customer\/withdraw\/list\?/.test(e.name));