require.config({
    baseUrl: '/js',
    paths: {
        'jquery': 'lib/jquery-1.12.3.min',
        'jquery.cookie': 'lib/cookie/jquery.cookie',
        'bootstrap': 'lib/bootstrap.min',
        'handlebars': 'lib/handlebars-1.0.0',
        'layer1': 'lib/layer/layer',
        'laydate': 'lib/laydate/laydate',
        'pagination': 'lib/pagination/jquery.pagination',
        'validate': 'lib/validate/jquery.validate.min',
        'echarts': 'lib/echarts/echarts.min',
        'html5shiv.min': 'lib/html5shiv.min',
        'respond.min': 'lib/respond.min',
        'text': 'lib/text'
    },
    shim: {
        'jquery.cookie': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery','html5shiv.min','respond.min']
        },
        'layer1': {
            deps: ['jquery']
        },
        'pagination': {
            deps: ['jquery','text!lib/pagination/pagination.css']
        },
        'validate': {
            deps: ['jquery']
        },
        'laydate': {
            deps: ['jquery']
        }
    }
});