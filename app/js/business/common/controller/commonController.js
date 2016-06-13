define(["business/common/view/commonView","util"], function (view,utils) {
   function _init(){

       $.fn.render = function(fn){
           if($(this).data("render")&&$(this).data("model")){
               utils.render($(this),fn);
           }
       };
       $.fn.template = function(data,template){
           utils.template($(this),data,template);
       };

       var dom =$("body").find("[data-render]")||[];
       var name;
       $.each(dom,function(i,v){
           name = $(this)[0].tagName;
           var str = name.substr(1).toLowerCase();
           var newName = name.charAt(0)+str;
           view["render"+newName]();
       });
   }
    // 返回
    return {
        init: _init
    }
});
