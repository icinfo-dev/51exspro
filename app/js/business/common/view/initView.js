define(['require', 'common/util', 'business/common/model/commonModel', 'handlebars', 'layer'], function (require, util, model, handlebars) {

    /**
     * 公用事件绑定
     * @type {*[]}
     */
    var events = [{
        el: ".log-out",
        event: "click",
        handler: function () {
            _logOut();
        }
    }, {
        el: '.btn-search',
        event: 'click',
        handler: function () {
            _fullSearch();
        }
    }];

    /**
     * 根据页面标签属性含有data-render的元素进行初始化
     */
    function init() {
        //公用事件绑定
        util.bindEvents(events);

        //返回顶部初始化
        initBackToTop({
            domId: "back-to-top",
            showDistance: 100,
            fadeTime: 300,
            scrollTime: 200
        });

        var ele = $('body').find('[data-render]') || [];
        $.each(ele, function (index, value) {
            var name = $(this).data('render');
            var str = name.substr(1).toLowerCase();
            if (!name)return false;
            var newName = name.charAt(0).toUpperCase() + str;
            var funcName = "render" + newName;
            if (obj[funcName] && typeof obj[funcName] === 'object') {
                obj[funcName].init();
            } else if (obj[funcName] && typeof obj[funcName] === 'function') {
                obj[funcName]();
            }
        })
    }

    /**
     * 渲染Header
     * @type {{init: Function, renderWarnCenter: Function, renderUserInfo: Function}}
     */
    var renderHeader = {
        init: function () {
            var that = this;
            require(['text!business/common/template/header.html'], function (template) {
                $('#header').html(template);
                that.renderWarnCenter();
                that.renderUserInfo();
            });
        },
        //预警中心
        renderWarnCenter: function () {
            var that = this;
            model.getLatestUserWarnCount({
                callBack: function (data) {
                    var ele = $('.js-warn-center');
                    if (data.status > 0) {
                        ele.find('.cy-badge').removeClass('hidden');
                        ele.on('click', function () {
                            that.addWarnFocusRecord();
                        })
                    } else {
                        ele.on('click', function () {
                            window.location.href = '/page/warn/warnCenter.html';
                        })
                    }
                }
            });
        },
        //更新用户关注记录
        addWarnFocusRecord: function () {
            model.addWarnFocusRecord({
                callBack: function () {
                    window.location.href = '/page/warn/warnCenter.html';
                }
            })
        },
        //用户信息
        renderUserInfo: function () {
            model.getUserInfo({
                callBack: function (data) {
                    $('.js-user-name').html(data.data.nickName || data.data.mobile);
                }
            });
        }
    };

    /**
     * 渲染footer
     */
    function renderFooter() {
        require(['text!business/common/template/footer.html'], function (template) {
            $('#footer').html(template);
        })
    }

    /**
     * 渲染menu
     */
    function renderMenu() {
        require(['text!business/common/template/menu.html'], function (template) {
            _getUserPlanList();
            _bind();
            //获取菜单
            function _getUserPlanList() {
                model.getUserPlanList({
                    callBack: function (data) {
                        $('#menu').append(template);
                        $('#menu .nav-main').html(handlebars.compile($('#userlistTemplate').html())(data.data));
                        var length = data.data.length + 2;
                        $('.nav-main .listbox li').css('width', 100 / length + '%');
                    }
                });
            }

            //新建舆情
            function _canAddNewUserPlan() {
                model.canAddNewUserPlan({
                    callBack: function (data) {
                        if (data.data) {
                            window.location.href = '/pages/newYq.html';
                        }
                    }
                })
            }

            //删除舆情
            function _deleteUserPlan(planId) {
                model.deleteUserPlan({
                    data: {
                        planId: planId
                    },
                    callBack: function (data) {
                        if (data.data) {
                            window.location.href = '/page/newYq.html';
                        }
                    }
                })
            }

            function _bind() {
                util.bindEvents([{
                    el: '.js-nav-new',
                    event: 'click',
                    handler: function () {
                        _canAddNewUserPlan();
                    }
                }, {
                    el: '.js-nav-delete',
                    event: 'click',
                    handler: function () {
                        var planId = $(this).closest('li').data('id');
                        layer.confirm('确定删除该方案吗？确定后该方案及相关数据将不存在？', function () {
                            _deleteUserPlan(planId);
                        });
                    }
                }])
            }
        })
    }


    /**
     * 返回顶部统一添加
     * @param opt
     */
    function initBackToTop(opt) {
        try {
            var backToTop = '<p id="back-to-top"><a href="javascript:void(0)"><span></span>返回顶部</a></p>';
            $('body').append(backToTop);
            opt.showDistance = opt.showDistance || 100;
            opt.fadeTime = opt.fadeTime || 300;
            opt.scrollTime = opt.scrollTime || 200;

            $(window).scroll(function () {
                if ($(window).scrollTop() > opt.showDistance) {
                    $('#' + opt.domId).fadeIn(opt.fadeTime);
                }
                else {
                    $('#' + opt.domId).fadeOut(opt.fadeTime);
                }
            });
            //绑定点击事件
            $('#' + opt.domId).click(function () {
                $('body,html').animate({scrollTop: 0}, opt.scrollTime);
                return false;
            });
        } catch (e) {

        }
    }

    /**
     * 退出登录
     * @private
     */
    function _logOut() {
        layer.confirm('确定要退出吗？', function () {
            var exsToken = util.getToken();
            util.removeToken();
            window.location.href = '/logout' + (exsToken ? '?token=' + exsToken : '');
        });
    }

    /**
     * 全网搜索
     */
    function _fullSearch() {
        var keyWords = encodeURIComponent($('.input-keywords').val().replace(/^\s+|\s+$/g, ''));
        window.open('/page/fullsearch/allSearch.html' + (keyWords ? '?keyWords=' + keyWords : ''));
    }

    var obj = {
        renderHeader: renderHeader,
        renderFooter: renderFooter,
        renderMenu: renderMenu
    };
    // retrurn
    obj.init = init;
    return obj;
})