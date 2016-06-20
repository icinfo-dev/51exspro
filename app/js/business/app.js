require(["common/util","business/common/view/initView"], function (util,init) {
    //进入对应的控制器
    var other = document.location.href;
    var page = {
        "query": util.getUrlParams(other)
    };

    var token = page.query.token;
    token && util.setToken(token);
    //统一处理页面逻辑
    init.init();
});