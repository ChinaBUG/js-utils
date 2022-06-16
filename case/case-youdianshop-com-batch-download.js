/*
 * @Author: ChinaBUG
 * @Date: 2022-06-08 16:08:08
 * @LastEditTime: 2022-06-08 16:15:39
 * @LastEditors: pptogo-110
 * @Description: 某个应用的后台，批量下载用户数据
 * @FilePath: \js-utils\case\case-youdianshop-com-batch-download.js
 */

// 使用说明：
// 1. 使用 chrome 或者 火狐 打开网站
// 2. 打开开发者工具
// 鼠标右键“检查”， 或者按键盘上的F12。
// 3. 在面板中找到控制台
// 找到左边的那个右三角， 输入以下代码，并回车执行。
// 4. 然后等待代码的执行，并自动下载文件

// 第一步：
// 先复制第一步的代码，粘贴到控制台中，并回车执行。
// 注意：如果执行的时候页面刷新了，就需要从这一步重新执行。
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

function req(varObj, ACT) {
    console.logCSS("Run ******************************************", 'main');
    console.logCSS(varObj);
    // console.logCSS("Run( "+varObj.apiSign+".apiUrl ): ",varObj.apiUrl);
    // console.logCSS("Run( "+varObj.apiSign+".pageNo ): ",varObj.pageNo);
    // console.logCSS("Run( "+varObj.apiSign+".totalPage ): ",varObj.totalPage);
    // console.logCSS("Run( "+varObj.apiSign+".sIc ): ",varObj.sIc);
    // console.logCSS("Run( "+varObj.apiSign+".dataObject ): ",varObj.dataObject);
    // 判断是否存在队列,存在着不处理,不存在则加入队列
    var VarKey = 'queue_' + varObj.apiSign + '_' + varObj.sIc,
        VarKeyTry = VarKey + '_try_number_' + varObj.pageNo;
    if (window[VarKey] == undefined) {
        window[VarKey] = new Array();
    }
    if (window[VarKey].indexOf(varObj.pageNo) > -1) {
        if (window[VarKeyTry] == undefined) {
            window[VarKeyTry] = 1;
        } else {
            window[VarKeyTry] += 1;
        }
        console.logCSS("【" + varObj.apiSign + "】 第 " + varObj.pageNo + " 页 存在列表中(尝试" + window[VarKeyTry] + "次)...", "error");
        if (window[VarKeyTry] > 3) {
            window[VarKey][window[VarKey].indexOf(varObj.pageNo)] = null;
        }
        return;
    } else {
        window[VarKey].push(varObj.pageNo);
    }
    var ACT = ACT || "get",
        ACTION = ACT === "post" ? window.restful.post : restful.get;
    varObj.dataObject.page = varObj.pageNo;
    ACTION({
        url: varObj.apiUrl,
        data: varObj.dataObject
    }).then(function(e) {
        if (varObj.totalPage == -1) {
            switch (varObj.apiSign) {
                case 'StoreMyUsers2':
                case 'StoreMyUsers':
                    varObj.totalPage = Math.ceil(e.count / varObj.dataObject.limit);
                    break;
                case 'user/cash':
                    varObj.totalPage = Math.ceil(e.total / varObj.dataObject.limit);
                    break;
                default:
                    varObj.totalPage = e.totalPage;
                    break;
            }
            console.logCSS("【" + varObj.apiSign + "】 共 " + varObj.totalPage + " 页 ...", "main");
        }
        console.logCSS("【" + varObj.apiSign + "】 第 " + varObj.pageNo + " 页 开始...", "warn");
        console.logCSS(e);
        var content = new Array();
        listObj = e.list;
        if (listObj.length > 0) {
            var isHeader = false;
            listObj.forEach(function(el, idx) {
                var fields = new Array();
                let contentC = new Array();
                switch (varObj.apiSign) {
                    case 'withdraw':
                        fields = ['userName', 'userPayName', 'userPayAccount', 'mobile', 'feeTotal'];
                        break;
                    case 'StoreMyUsers2':
                    case 'StoreMyUsers':
                        fields = ['userId', 'name', 'mobile'];
                        if ('StoreMyUsers' == varObj.apiSign) {
                            // 直接获取邀请的人员
                            // window["a1_"+el.userId]={apiSign:"getInvitedUserAndBetData",apiUrl:"user/store/userInvited",pageNo:1,totalPage:-1,sIc:null,apiSignKey:el.userId};
                            // window["a1_"+el.userId].dataObject={ page: 1, pageSize: 500,userId:el.userId,startTime:'', endTime:''};
                            // window["a1_"+el.userId].sIc=setInterval(req, 5000,window["a1_"+el.userId],'post');
                        } else if ('StoreMyUsers2' == varObj.apiSign) {
                            var startDate = window.prompt("请输出需要查询的开始的日期时间", "2022-06-01 16:43");
                            var endDate = window.prompt("请输出需要查询的结束的日期时间", "2022-06-14 16:43");
                            if (startDate != '') {
                                startDate = (new Date(startDate)).getTime() / 1000;
                            } else {
                                startDate = 0;
                            }
                            if (endDate != '') {
                                endDate = (new Date(endDate)).getTime() / 1000;
                            } else {
                                endDate = 0;
                            }
                            window["a2_" + el.userId] = { apiSign: "user/cash", apiUrl: "store/coin/tradeLog/user/cash", pageNo: 1, totalPage: -1, sIc: null, apiSignKey: el.userId };
                            window["a2_" + el.userId].dataObject = {
                                currencyTag: '',
                                endDate: endDate,
                                limit: 500,
                                page: 1,
                                startDate: startDate,
                                tradeCode: '', // 分类
                                userId: el.userId
                            };
                            window["a2_" + el.userId].sIc = setInterval(req, 5000, window["a2_" + el.userId], 'get');
                        }
                        break;
                    default:
                        for (const objkey in el) {
                            fields.push(objkey);
                        }
                        break;
                }
                if (!isHeader) {
                    content.push(fields.join(","));
                    isHeader = true;
                }
                if (fields.length > 0) {
                    fields.forEach(function(el2, idx2) {
                        if (el[el2] != undefined) {
                            contentC.push("\"" + el[el2] + "\"");
                        }
                    });
                    content.push(contentC.join(","));
                }
            });
            let fnPath = 'dealMoney-' + varObj.apiSign + (varObj.apiSignKey != undefined ? '-(' + varObj.apiSignKey + ')' : '') + '-' + (new Date()).getDate() + '-' + varObj.pageNo + '.csv';
            console.save(content.join("\n"), fnPath);
            console.logCSS("【" + varObj.apiSign + "】 第 " + varObj.pageNo + " 页 文件保存成功...", "success");
        } else {
            console.logCSS("【" + varObj.apiSign + "】 第 " + varObj.pageNo + " 页 内容为空...", "error");
        }
        console.logCSS("【" + varObj.apiSign + "】 第 " + varObj.pageNo + " 页 结束...", "warn");
        if (varObj.pageNo <= varObj.totalPage) varObj.pageNo++;
        if (varObj.pageNo > varObj.totalPage) {
            clearInterval(varObj.sIc);
            varObj = null;
            window[VarKey] = null;
            console.logCSS("【" + varObj.apiSign + "】 共 " + varObj.totalPage + " 页 已经下载成功...", "success");
        };
    }).catch(function(e) {
        console.logCSS("错误!!! 第 " + varObj.pageNo + " 页(" + varObj.apiSign + "), " + e.message, "error");
    });
}

// 第二步：
// 根据需要，选择不同的代码块，复制到控制台中，并回车，然后等待文件的自动下载，
// 注意：如果页面刷新了，就需要从第一步重新执行，否则，只需要选择下面的代码块，分别执行就行。

// 2.1 我的,资金代办,提现,已处理
// https://store.******.com/user/dealMoney
var a1 = { apiSign: "withdraw", apiUrl: "coin/store/customer/withdraw/list", pageNo: 1, totalPage: -1, sIc: null };
a1.dataObject = { audit: 1, page: a1.pageNo, pageSize: 500 };
a1.sIc = setInterval(req, 5000, a1);

// 2.2 我的,用户管理
// https://store.******.com/user/punters
var a2 = { apiSign: "StoreMyUsers", apiUrl: "store/my/users", pageNo: 1, totalPage: -1, sIc: null };
a2.dataObject = { searchKey: "", page: a2.pageNo, limit: 500, sortType: 0 };
a2.sIc = setInterval(req, 5000, a2);

// 2.3 我的,用户管理,按查询
// https://store.youdianshop.com/punters/search
var searchKey = window.prompt("请输出需要查询的手机号,可以末尾几位", "32494");
var a3 = { apiSign: "StoreMyUsers2", apiUrl: "store/my/users", pageNo: 1, totalPage: -1, sIc: null };
a3.dataObject = { searchKey: searchKey, page: a3.pageNo, limit: 500, sortType: 0 };
a3.sIc = setInterval(req, 5000, a3);