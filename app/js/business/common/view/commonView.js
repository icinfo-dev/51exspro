define(["util","business/common/model/commonModel"], function (utils,model) {
    var menuBinding = [{
        "element": ".page i.nav-delete",
        "event": "click",
        "handler": function (e) {

        }
    }];
    /**
     * 渲染头部信息
     * */
    function _renderHeader() {
        $("header").render();
    }
    /**
     * 渲染头部信息
     * */
    function _renderSearch() {
        $("search").render();
    }
    /**
     * 渲染底部信息
     * */
    function _renderFooter() {
        $("footer").render();
    }
    /**
     * 获取菜单栏
     * */
    function _renderMenu() {
        $("menu").render(_getMenuData);
    }
    function _getMenuData(){
        model.getMenuData(_showMenu);
    }
    /**
     * 渲染菜单栏
     * */
    function _showMenu(data) {
        $("menu .nav-main").template(data);
        utils.alert("sdadsadas");
    }

    // 返回
    return {
        renderHeader: _renderHeader,
        renderFooter: _renderFooter,
        renderMenu: _renderMenu,
        renderSearch:_renderSearch
    }
});
