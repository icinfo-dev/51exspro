define(['handlebars'],function(handlebars){
    handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
                break;
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
                break;
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
                break;
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
                break;
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                break;
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
                break;
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                break;
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
                break;
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
                break;
            case 'length':
                return v1.length === v2?options.fn(this) : options.inverse(this);
                break;
            default:
                return options.inverse(this);
                break;
        }
    });
    //注册计算器
    handlebars.registerHelper("math", function(v1, operator, v2){
        if(operator == "+"){	return v1+v2;}
        if(operator == "-"){	return v1-v2;}
        if(operator == "*"){	return v1*v2;}
        if(operator == "/"){	return v1/v2;}
        if(operator == "%"){	return v1%v2;}
    });
    handlebars.registerHelper("campareSentiment", function (v1, v2, options) {
        var span = "";
        if(v1=="positive"){
            span = '<span class="label label-info">正面</span>';
        }else if(v1=="negative"){
            span = '<span class="label label-danger">负面</span>';
        }else{
            span = '<span class="label label-success">中性</span>'
        }
        return span;
    });
    handlebars.registerHelper("isCheck", function (v1, v2, options) {
        if(v1=="" || typeof v1=="undefined"){
            return '';
        }
        if(v1){
            return 'checked';
        }
        return '';
    });
})

