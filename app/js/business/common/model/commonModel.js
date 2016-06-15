define(['common/config', 'common/http'], function (config, http) {

    /**
     * 获取用户信息
     * @param options
     */
    function getUserInfo(options) {
        http.httpRequest({
            interface: 'getuserinfo',
            success: options.callBack
        });
    }

    /**
     * 获取预警中心信息
     * @param options
     */
    function getLatestUserWarnCount(options) {
        http.httpRequest({
            interface: 'getlatestuserwarncount',
            success: options.callBack
        });
    }

    /**
     *添加用户预警关注记录
     * @param options
     */
    function addWarnFocusRecord(options) {
        http.httpRequest({
            interface: 'addwarnfocusrecord',
            complete: options.callBack
        });
    }

    /**
     *添加用户预警关注记录
     * @param options
     */
    function getUserPlanList(options) {
        http.httpRequest({
            interface: 'getuserplanlist',
            success: options.callBack
        });
    }

    /**
     * 新建舆情
     * @param options
     */
    function canAddNewUserPlan(options) {
        http.httpRequest({
            interface: 'canaddnewuserplan',
            success: options.callBack
        });
    }

    /**
     * 删除舆情
     * @param options
     */
    function deleteUserPlan(options) {
        http.httpRequest({
            interface: 'deleteuserplan',
            data: options.data,
            type: 'post',
            success: options.callBack
        });
    }

    /**
     * 获取预警邮箱
     * @param options
     */
    function getWarnEmailList(options){
        http.httpRequest({
            interface: 'getwarnemaillist',
            success: options.callBack
        });
    }

    /**
     * 邮件分享
     * @param options
     */
    function monitorInfoEmailShare(options){
        http.httpRequest({
            interface: 'monitorinfoemailshare',
            data: options.data,
            type: 'post',
            success: options.callBack,
            beforeSend: options.beforeSend,
            error: options.error
        });
    }
    // 返回
    return {
        getUserInfo: getUserInfo,
        getLatestUserWarnCount: getLatestUserWarnCount,
        addWarnFocusRecord: addWarnFocusRecord,
        getUserPlanList: getUserPlanList,
        canAddNewUserPlan: canAddNewUserPlan,
        deleteUserPlan: deleteUserPlan,
        getWarnEmailList: getWarnEmailList,
        monitorInfoEmailShare: monitorInfoEmailShare
    }
});
