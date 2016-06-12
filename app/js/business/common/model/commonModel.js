define([], function (config) {

  function _getMenuData(){
    var callback = arguments[0];
    var data = {"data":[{title:"2323232"}]};
    callback(data.data);
  }
  // ·µ»Ø
  return {
    getMenuData: _getMenuData
  }
});
