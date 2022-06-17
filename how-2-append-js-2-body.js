/*
 * @Author: ChinaBUG
 * @Date: 2022-06-08 16:59:09
 * @LastEditTime: 2022-06-17 09:10:08
 * @LastEditors: pptogo-110
 * @Description: 将脚本附加到页面的body内
 * @FilePath: \js-utils\how-2-append-js-2-body.js
 */

/*
javascript:(function(){var w=window,d=w.document,b=d.body,s=d.createElement("script");s.src="https://chinabug.github.io/js-utils/case/case-youdianshop-com-batch-download-v2.js";b.appendChild(s);})();
*/
javascript: (function() {
    var w = window,
        d = w.document,
        b = d.body,
        s = d.createElement("script");
    s.src = "https://chinabug.github.io/js-utils/case/case-youdianshop-com-batch-download-v2.js";
    b.appendChild(s);
})();