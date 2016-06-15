/**
 * dom操作
 */
define([],function(){

    // html代码段集合
    var htmlMap = {
        'loading_large': '<div class="loading loading-large"><img class="loading-img" src="../../img/loading_48.gif" /></div>',
        'loading_middle':'<div class="loading loading-middle"><img class="loading-img" src="../../img/loading_32_.gif" /></div>',
        'loading_small':'<div class="loading loading-small"><img class="loading-img" src="../../img/loading_16_.gif" /></div>'
    };



    /**
     * 加载中占位符
     * @param ele string(selector)
     * @param type string
     */
    function showLoading(ele, type) {
        var ele = $(ele);
        var html = loadingTypeConfig[type];
        ele.append(html);
    }

    /**
     * 删除加载占位符
     * @param ele string(selector)
     */
    function removeLoading(ele) {
        var ele = $(ele);
        ele.find('loading').remove();
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
                key = info.inputName + "[" + i + "]." + info.fields[index];
                value = $(this).data(info.fields[index].toLowerCase());
                if (typeof value == "undefined") {
                    value = "";
                }
                form += '<input name="' + key + '" value="' + value + '" />';
            }
        });
        form += "</form>";
        return form;
    }

});