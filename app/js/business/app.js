require(['jquery'],function(_){
    var controllerPath = $(".page").data("controller") || "",
        module = $(".page").data("module") || "";
    var index = controllerPath.lastIndexOf("/") < 0 ? 0 : controllerPath.lastIndexOf("/");

    require(['business/'+module+'/controller/'+controllerPath+'controller', "common/util","business/common/view/commonView"], function (controller, util,common) {
        //进入对应的控制器
        var other = document.location.href;
        var page = {
            "query": util.getUrlParams(other),
            "name": controllerPath
        };

        var token = page.query.token;
        token && util.setToken(token);
        //统一处理页面逻辑
        common.init(page);
       // controller.init(page);
    });

});
