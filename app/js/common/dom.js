/**
 * dom操作
 */
define(['jquery'],function($){

    // html代码段集合
    var htmlMap = {
        '1': '<div class="js-placeholder loading-large"><img class="loading-img" src="../../img/loading_48.gif" /></div>',
        '2': '<div class="js-placeholder loading-middle"><img class="loading-img" src="../../img/loading_32_.gif" /></div>',
        '3': '<div class="js-placeholder loading-small"><img class="loading-img" src="../../img/loading_16_.gif" /></div>',
        '4': '<div class="js-placeholder emptyData"><p>对不起！没有您需要的数据</p><img src="../../img/index_none.png" alt=""></div>',
        '5': '<div class="js-placeholder emptyData"><p>对不起！没有您需要的数据</p><a href="/pages/newYq.html">新建舆情 — — 请点击这里！</a><img src="../../img/index_none.png" alt=""></div>',
        '6': '<div class="js-placeholder emptyData"><p>暂无数据</p></div>',
        '7': '<div class="js-placeholder emptyData"><p>加载失败</p></div>'
    };



    /**
     * 加载中占位符
     * @param ele string(selector)
     * @param type string
     */
    function showPlaceholder(ele, type) {
        var ele = $(ele);
        var html = htmlMap[type];
        ele.append(html);
    }

    /**
     * 删除加载占位符
     * @param ele string(selector)
     */
    function removePlaceholder(ele) {
        var ele = $(ele);
        ele.find('.js-placeholder').remove();
    }

    /**
     * 生成下载form表单页面元素
     * info:{
         *      formId:xxx, 表单ID
         *      inputName:yyy, 隐藏域名称
         *      fields:[xxx,yyy,zzz]，下载内容
         *      selectList:[xxx,yyy,zzz]，选中项
         * }
     */
    function generateDldForm(info) {
        var form = '<form id="' + info.formId + '" class="hidden" method="post">',
            key = '',
            value = '';
        $.each(info.selectList, function (i, v) {
            for (var index = 0; index < info.fields.length; index++) {
                key = info.inputName + '[' + i + '].' + info.fields[index];
                value = $(this).data(info.fields[index].toLowerCase());
                if (typeof value == 'undefined') {
                    value = '';
                }
                form += '<input name="' + key + '" value="' + value + '" />';
            }
        });
        form += '</form>';
        return form;
    }


    return {
        showPlaceholder: showPlaceholder,
        removePlaceholder: removePlaceholder,
        generateDldForm: generateDldForm
    }
});