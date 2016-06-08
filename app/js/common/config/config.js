/**
 * 配置文件
 */
define(function () {
    // 开发服务地址
    var devServerUrl = "http://115.238.48.66:1158",
    //生产环境标志
        prdEnvFlag = false,
    // 接口Url集合
        interfaceUrls = {
            //更新预警关注记录
            "addwarnfocusrecord": '/warn/warncenter/addwarnfocusrecord/v=1.0.0',
            //获取用户注册地址
            "getregisterurl": '/system/register/getregisterurl/v=1.0.0',
            //获取行业信息
            "getindustrys": '/system/baseinfo/getindustrys/v=1.0.0',
            //获取地域信息
            "getareas": '/system/baseinfo/getareas/v=1.0.0',
            //开通服务
            "openapplication": '/system/user/openapplication/v=1.0.0',
            //获取用户信息
            "getuserinfo": '/system/user/getuserinfo/v=1.0.0',
            //删除方案
            "deleteuserplan": '/plan/userplan/deleteuserplan/v=1.0.0',
            //获取最新预警数量
            "getlatestuserwarncount": '/warn/warncenter/getlatestuserwarncount/v=1.0.0',
            //全部舆情方案-情感分布
            "getallnewsentimentdislist": '/monitor/statmonitor/getallnewsentimentdislist/v=1.0.0',
            //全部舆情方案-数据源舆情走势
            "getallnewsourceperformlist": '/monitor/statmonitor/getallnewsourceperformlist/v=1.0.0',
            //重点媒体情感偏向
            'getkeymediasentimentlist': '/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0',
            //加载用户方案菜单
            "getuserplanlist": '/plan/userplan/getuserplanlist/v=1.0.0',
            //全部舆情方案-最新舆情
            "getallnewmonitorinfolist": '/monitor/contentmonitor/getallnewmonitorinfolist/v=1.0.0',
            //单舆情方案-最新舆情
            "getnewmonitorinfolist": '/monitor/contentmonitor/getnewmonitorinfolist/v=1.0.0',
            //文章页-相关舆情
            "getrelatedmonitorinfolist": '/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0',
            //全景-舆情信息列表
            "getmonitorinfolist": '/monitor/contentmonitor/getmonitorinfolist/v=1.0.0',
            //获取预警邮箱
            "getwarnemaillist": '/warn/warnemail/getwarnemaillist/v=1.0.0',
            //新建舆情方案
            "adduserplan": '/plan/userplan/adduserplan/v=1.0.0',
            //文章页-相关舆情
            "getrelatedmonitorinfolist": '/monitor/contentmonitor/getrelatedmonitorinfolist/v=1.0.0',
            //文章页-舆情详情
            "getmonitorinfodetails": '/monitor/contentmonitor/getmonitorinfodetails/v=1.0.0',
            //取消相似预警
            "cancelsimilarwarn": '/warn/warncenter/cancelsimilarwarn/v=1.0.0',
            //全网搜索
            "fullwebsearch": '/monitor/contentmonitor/fullwebsearch/v=1.0.0',
            //单舆情方案-数据源舆情走势
            "getsourceperformlist": '/monitor/statmonitor/getsourceperformlist/v=1.0.0',
            //每日情感走势
            "getdailysentimentperformlist": '/monitor/statmonitor/getdailysentimentperformlist/v=1.0.0',
            //重点媒体情感偏向
            "getkeymediasentimentlist": '/monitor/statmonitor/getkeymediasentimentlist/v=1.0.0',
            //获取媒体关注度信息
            "getmediaattentionlist": '/monitor/statmonitor/getmediaattentionlist/v=1.0.0',
            //地域分布
            "getregiondistributelist": '/monitor/statmonitor/getregiondistributelist/v=1.0.0',
            //地域分布Map
            "getregiondistributelist": '/monitor/statmonitor/getregiondistributelist/v=1.0.0',
            //获取舆情方案
            "getuserplan": '/plan/userplan/getuserplan/v=1.0.0',
            //修改舆情方案
            "modifyuserplan": '/plan/userplan/modifyuserplan/v=1.0.0',
            //获取方案舆情周报列表
            "getweeklyreportlist": prdEnv ? config.interfaceServer + '/monitor/report/getweeklyreportlist/v=1.0.0' : '../../api/weeklyReportList.json',
            //舆情周报下载
            "downloadweeklyreport": '/monitor/report/downloadweeklyreport/v=1.0.0',
            //获取舆情导读列表
            "getweeklyreadguidelist": '/monitor/report/getweeklyreadguidelist/v=1.0.0',
            //获取载体分布统计
            "getweeklycarrierdislist": '/monitor/report/getweeklycarrierdislist/v=1.0.0',
            //获取top10情感信息媒体分布列表
            "getweeklytop10sentmediadislist": '/monitor/report/getweeklytop10sentmediadislist/v=1.0.0',
            //舆情周报下载
            "downloadweeklyreport": '/monitor/report/downloadweeklyreport/v=1.0.0',
            //获取预警信息列表
            "getwarninfolist": "/warn/warncenter/getwarninfolist/v=1.0.0",
            //获取方案预警邮箱列表
            "getplanwarnemaillist": "/warn/planwarnemail/getplanwarnemaillist/v=1.0.0",
            //获取方案预警邮箱可选项
            "getplanwarnemailoptions": "/warn/planwarnemail/getplanwarnemailoptions/v=1.0.0",
            //取消相似预警
            "cancelsimilarwarn": "/warn/warncenter/cancelsimilarwarn/v=1.0.0",
            //更新方案预警邮箱
            "modifyplanwarnemail": "/warn/planwarnemail/modifyplanwarnemail/v=1.0.0",
            //删除方案预警邮箱
            "deleteplanwarnemail": "/warn/planwarnemail/deleteplanwarnemail/v=1.0.0",
            //更新预警邮箱
            "modifywarnemail": "/warn/warnemail/modifywarnemail/v=1.0.0",
            //获取单个方案的正负面数据
            "getsentimentdistribute": "/monitor/statmonitor/getsentimentdistribute/v=1.0.0",
            //邮件分享
            "monitorinfoemailshare": "/monitor/contentmonitor/monitorinfoemailshare/v=1.0.0",
            //新增方案按钮点击
            "canaddnewuserplan": "/plan/userplan/canaddnewuserplan/v=1.0.0"
        };

    // 返回
    return {
        getInterfaceUrl: function (interfaceName) {
            return (prdEnvFlag ? "" : devServerUrl) + interfaceUrls[interfaceName];
        }
    };
});