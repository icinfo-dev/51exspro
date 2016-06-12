var bootstrapDepsPath = ['jquery'];
if(navigator.userAgent.indexOf("MSIE")>0){
    if(navigator.userAgent.indexOf("MSIE 6.0")>0 || navigator.userAgent.indexOf("MSIE 7.0")>0 || navigator.userAgent.indexOf("MSIE 8.0")>0){
        bootstrapDepsPath.push('html5shiv.min','respond.min');
    }
}
var require = {
    baseUrl: '../../js/',
    paths: {
        'jquery': 'lib/jquery-1.12.3.min',
        'jquery.cookie': 'lib/cookie/jquery.cookie',
        'bootstrap': 'lib/bootstrap.min',
        'handlebars': 'lib/handlebars-1.0.0',
        'layer': 'lib/layer/layer',
        'laydate': 'lib/laydate/laydate',
        'pagination': 'lib/pagination/jquery.pagination',
        'validate': 'lib/validate/jquery.validate.min',
        'echarts': 'lib/echarts/echarts.min',
        'config': 'common/config',
        'http': 'common/http',
        'util': 'common/util',
        'html5shiv.min': 'lib/html5shiv.min',
        'respond.min': 'lib/respond.min',
        'text': 'lib/text'
    },
    shim: {
        'jquery.cookie': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: bootstrapDepsPath
        },
        'layer': {
            deps: ['jquery']
        },
        'pagination': {
            deps: ['jquery','../../app/js/lib/css!../../app/js/lib/pagination/pagination.css']
        },
        'validate': {
            deps: ['jquery']
        },
        'laydate': {
            deps: ['jquery']
        }
    }
}