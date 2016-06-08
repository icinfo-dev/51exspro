/**
 * 工具集
 */
define(["jquery", "jquery.cookie"], function () {

    /**
     * 事件绑定
     * @param bindings [{el:x,event:y,handler:z}]
     *                  el为页面元素 event为绑定事件 handler为事件响应函数
     */
    function bindEvents(bindings) {
        $.each(bindings, function (i, v) {
            $(v.el).on(v.event, v.handler);
        });
    }

    /**
     * 获取Url参数
     * @param url url地址
     */
    function getUrlParams(url) {
        // 需要返回的参数集合
        var rtnParams = {},
        // 参数键值对
            paramPair = [];
        if (!url || url.indexOf('?') === -1) {
            return rtnParams;
        }

        $.each(url.substr(url.indexOf('?') + 1).split('&'), function (i, v) {
            paramPair = v.split('=');
            rtnParams[paramPair[0]] = paramPair[1];
        });

        return rtnParams;
    }

    /**
     * 设置Token
     * @param token 令牌值
     */
    function setToken(token) {
        if (!token) {
            return;
        }

        $.cookie("exsToken", token, {
            path: "/", expires: 7
        });
    }

    /**
     * 获取token
     */
    function getToken() {
        return $.cookie("exsToken");
    }

    /**
     * 删除token
     */
    function removeToken() {
        $.cookie('exsToken', null, {path: "/"});
    }

    /**
     * 字符串base64编码
     * @param str 源字符串
     * @returns {string} 结果字符串
     */
    function base64Encode(str) {
        var c1, c2, c3,
            base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            i = 0,
            len = str.length,
            string = '';
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                string += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                string += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            string += base64EncodeChars.charAt(c3 & 0x3F)
        }
        return string;
    }

    /**
     * 去除空格
     * @param array
     * @returns {Array}
     */
    function trims(array) {
        var newArr = [],
            ele;
        $.each(array, function (i, v) {
            ele = v.replace(/ /g, '');
            ele != '' && newArr.push(ele);
        });
        return newArr;
    }

    // 返回
    return {
        // 事件绑定
        bindEvents: bindEvents,
        // 获取Url地址参数
        getUrlParams: getUrlParams,
        // 设置token
        setToken: setToken,
        // 获取token
        getToken: getToken,
        // 移除token
        removeToken: removeToken,
        // base64字符编码
        base64Encode: base64Encode,
        // 去除空格
        trims: trims
    };
});
