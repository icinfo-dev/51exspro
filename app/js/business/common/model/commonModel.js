define([], function (config) {

  function _getMenuData(){
    var callback = arguments[0];
    var data = {"data":[{title:"2323232"}]};
    callback(data.data);
  }
  // ����
  return {
    getMenuData: _getMenuData
  }
});
