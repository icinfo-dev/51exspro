define(["handlebars"], function (Handlebars) {
    //
  //注册对比事件 v1 为后台传入的参数，v2为状态值
  Handlebars.registerHelper("compare", function (v1, v2, options) {
    var type = "";
    type = v2 == 1 ? "positive" : (v2 == 0 ? "neutral" : "negative");
    if (v1 == type) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  Handlebars.registerHelper("js_compare", function (v1, v2, options) {
    if (v1 == v2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  var listModel;
  function _renderUserplanlist(data) {
    $("nav-bg").refresh(data.data);
    var length = data.data.length+2;
    $('.nav-main .listbox li').css("width",100/length+"%");
  }
  function _renderYqfa(data,tabID) {
    listModel = listModel ? listModel :$("#yqfaListAllScript").html();
    var myTemplate = Handlebars.compile(listModel);
    var dom = tabID ? $(tabID) : $("#list1-all");
    dom.find("ul").temolate(data,listModel);
    if(arguments.length==3 && arguments[2]!=1){
       dom.find(".plan-main-list").find("li p span.label-ststus").hide();
    }
  }

  function _renderList(data,i){
    var myTemplate = Handlebars.compile("{{#ul_list}}{{/ul_list}}");
    var html = myTemplate();
    var myTemplate2 = Handlebars.compile(html);
    var html2 = myTemplate2(data.list);
    $(".main .plan").eq(i+1).find(".tab-content .plan-main-list").eq(0).html(html2);
    $(".main .plan").eq(i+1).find(".plan-title h3").html(data.title);
    $(".main .plan").eq(i+1).find(".plan-title page").attr("href","/pages/monitor/full_view.html?id="+data.id);
    $(".main .plan").eq(i+1).find(".plan-title page").attr("target","_blank");
    $(".main .plan").eq(i+1).find(".nav-tabs").attr("planID",data.id);
  }
  function _renderTabList(data,tabID){
    var myTemplate = Handlebars.compile("{{#ul_list}}{{/ul_list}}");
    var html = myTemplate();
    var myTemplate2 = Handlebars.compile(html);
    var html2 = myTemplate2(data);
    var dom = $(tabID);
    dom.find(".plan-main-list").html(html2);
    if(arguments.length==3 && arguments[2]!=1){
       dom.find(".plan-main-list").find("li p span.label-ststus").hide();
    }
  }
  return {
    //用户方案
    renderUserplanlist :_renderUserplanlist,
    renderYqfa  :  _renderYqfa,
    renderList :_renderList,
    renderTabList:_renderTabList
  }
});
