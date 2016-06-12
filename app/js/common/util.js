/**
 * 工具集
 */
define(["text!/js/business/common/template/modal.html",
        "text!/js/business/common/template/header.html",
        "text!/js/business/common/template/footer.html",
        "text!/js/business/common/template/menu.html",
        "text!/js/business/common/template/404.html","handlebars", "jquery", "jquery.cookie", "bootstrap"],
    function (_modal, _header, _footer, _menu, _404,handlebars) {
        var map = {
          'header':_header,
          'footer':_footer,
          'menu':_menu,
          '404':_404
        };
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
            return $.cookie("exsToken") || '3b679f7cf55011e5bb6600188b839ae8';
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

        /**
         * 对于不同占位符展示不同的html片段
         * @type {{
     * key: type,
     * value: html片段
     * }}
         */
        var loadingTypeConfig = {
            1: '<div class="loading"><img class="loading-img" src="../../img/loading_48.gif" /></div>'
        }

        /**
         * 加载中占位符
         * @param ele string(selector)
         * @param type string
         */
        function showLoading(ele, type) {
            var ele = $(ele);
            var html = loadingTypeConfig[type];
            ele.append(html);
            var loading = ele.find('.loading');
            var loadingImg = loading.find('.loading-img');
            var w = loadingImg.width();
            var h = loadingImg.height();
            loading.css({'position': 'relative', 'width': '100%', 'height': '100%'});
            loadingImg.css({
                'marginLeft': (-1) * w / 2 + 'px',
                'marginTop': (-1) * h / 2 + 'px',
                'position': 'absolute',
                'top': '50%',
                'left': '50%'
            });  //垂直居中
        }

        /**
         * 删除加载占位符
         * @param ele string(selector)
         */
        function removeLoading(ele) {
            var ele = $(ele);
            ele.find('.loading').remove();
        }

        /**
         * 弹出框 alert
         * @param  string(显示内容)
         */
        function _alert(content) {
            if (!content)
                return;
            $("body .commonAlert").length == 0 && $("body").append($(_modal).filter(".commonAlert"));
            $("body .commonAlert").find(".cy-model-content").html(content);
            $("body .commonAlert").modal('show');
        }

        /**
         * 弹出框 alert
         * @param  string(显示内容),callback(点击确认回调),callback(点击取消回调)
         */
        function _confirm(content, fn1, fn2) {
            if (!content)
                return;
            $(".commonConfirm").length == 0 && $("body").append($(_modal).filter(".commonConfirm"));
            $(".commonConfirm").find(".cy-model-content").html(content);
            $(".commonConfirm").modal('show');
        }

        function _refresh(tar,data,template) {
            var html;
            if(template){
                html = template;
            }else{
                var keyArr = tar.data("model").split(" ");
                var key = keyArr[0];
                if(!map[key]||!key)
                            return;
                if(keyArr[1]){
                    html = $(map[key]).filter(keyArr[1]).html();
                }else{
                    html = map[key];
                }
            }
            if($(html).find("script").length==0||data==""){
                tar.html(html);
            }else{
                var myTemplate = handlebars.compile($(html).find("script").html());
                tar.html(myTemplate(data));
            }
        }
        function _render(tar){
            var html;
            var keyArr = tar.data("model").split(" ");
            var key = keyArr[0];
            if(!map[key]||!key)
                return;
            if(keyArr[1]){
                html = $(map[key]).filter(keyArr[1]).html();
            }else{
                html = map[key];
            }
            tar.html(html);
            if(tar.find("script").length!=0){
                tar.find("script").parent().data("model",tar.data("model"));
            }
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
            trims: trims,
            showLoading: showLoading,
            removeLoading: removeLoading,
            //modal 弹出 comfirm
            confirm: _confirm,
            alert: _alert,
            render: _render,
            refresh :_refresh
        };
    });
