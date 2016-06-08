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
        'common.config': 'common/config/config'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'layer': {
            deps: ['jquery']
        },
        'pagination': {
            deps: ['jquery']
        },
        'validate': {
            deps: ['jquery']
        },
        'laydate': {
            exports: 'laydate'
        }
    }
}