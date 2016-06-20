define(['require', 'common/util', 'business/common/model/commonModel', 'handlebars', 'business/common/view/commonView', 'layer1', 'common/hbsHelper'], function (require, util, model, handlebars, commonView) {
    layer.config({
        path: '/js/lib/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    /**
     * 添加新邮箱form验证
     */
    function addEmailFormValid(cacheEmail) {
        $('#emailForm').on('submit', function () {
            var emailStr = $('#emailForm').find('input[type=email]').val();
            if (emailStr == '') {
                layer.tips('邮箱不能为空，请添加！', '#emailForm input[type=email]', {
                    tips: [1, '#CA1515'],
                    time: 2000
                });
                return false;
            }
            if (!util.checkRagular('email', emailStr)) {
                layer.tips('输入的邮箱格式不正确，请验证！', '#emailForm input[type=email]', {
                    tips: [1, '#CA1515'],
                    time: 2000
                });
                return false;
            }
            if (!cacheEmail[emailStr]) {
                cacheEmail[emailStr] = emailStr;
                $('#add-email-box .add-email-ul').append('<li><label class="cy-checkbox"><input type="checkbox"><span></span></label>' + emailStr + '</li>')
                $('#emailForm').find('input[type=email]').val('');
            } else {
                layer.tips(emailStr + "已存在，请勿重复添加", '#emailForm input[type=email]', {
                    tips: [1, '#CA1515'],
                    time: 2000
                });
            }
            return false;
        })
    }

    /**
     * 确认按钮发送之前对邮箱格式进行验证；
     * @param layero 主要是找到的layer对应的dom，在对应位置添加tips
     * @returns {boolean} return {}  验证成功执行回调  false则不执行回调
     */
    function emailCountValid(layero) {
        var checkedEle = $('.add-email-list :checked');
        var checkedLength = checkedEle.length;
        var shareEmailList = [];
        var otherEmailList = [];
        if (checkedLength <= 5 && checkedLength > 0) {
            checkedEle.each(function () {
                var emailStr = $(this).parents('li').text();
                if ($(this).is(':checked')) {
                    shareEmailList.push(emailStr);
                } else {
                    otherEmailList.push(emailStr);
                }
            });
            return {
                shareEmailList: shareEmailList,
                otherEmailList: otherEmailList
            };
        } else if (checkedLength == 0) {
            layer.tips('请选择至少一个邮箱', layero.find('.layui-layer-btn a')[0], {
                tips: [1, '#CA1515'],
                offset: ['0', '100px'],
                time: 2000
            });
        } else {
            layer.tips('您最多可选择5个邮箱', layero.find('.layui-layer-btn a')[0], {
                tips: [1, '#CA1515'],
                offset: ["0", '100px'],
                time: 2000
            });
        }
        return false;
    }

    /**
     * 邮件发送
     */
    function renderEmail(docId) {
        require(['text!business/common/template/email.html'], function (template) {
            var emailObj = {}; //保存已添加的邮箱作缓存用
            _getWarnEmailList();
            commonView.handleCheckbox();
            //获取预警邮箱
            function _getWarnEmailList() {
                model.getWarnEmailList({
                    callBack: function (data) {
                        !$('#add-email-box').length && $('body').append(template);
                        $('.add-email-ul').html(handlebars.compile($('#addEmailTemplate').html())(data));
                        $("#emailForm input[type=email]").val("");
                        $("#emailForm").attr("novalidate", "false");
                        layer.open({
                            type: 1,
                            title: '邮件发送舆情信息',
                            content: $('#add-email-box'),
                            area: '500px',
                            btn: ['发送邮件', '取消'],
                            yes: function (index, layero) {
                                _sendEmail(docId, layero);
                            },
                            end: function () {
                                $('#add-email-box').remove();
                            }
                        })
                        for (var i = 0; i < data.data.length; i++) {
                            emailObj[data.data[i]] = data.data[i];
                        }
                        ;
                        addEmailFormValid(emailObj);
                    }
                })
            }

            /**
             * 发送邮件
             * @param docId 需要分享的内容docId
             * @param layero 对应的layer层
             * @private
             */
            function _sendEmail(docId, layero) {
                var params = emailCountValid(layero);  //验证成功之后传回来的参数
                if (params) {
                    _monitorInfoEmailShare(docId, params.shareEmailList, params.otherEmailList);
                }
            }

            /**
             * 发送请求到服务器
             * @param docId
             * @param shareEmailList
             * @param otherEmailList
             * @private
             */
            function _monitorInfoEmailShare(docId, shareEmailList, otherEmailList) {
                layer.closeAll();
                model.monitorInfoEmailShare({
                    data: {
                        docId: docId,
                        shareEmails: shareEmailList,
                        otherEmails: otherEmailList
                    },
                    beforeSend: function () {
                        layer.msg('发送中，请稍后', {icon: 16, time: -1, shade: [0.4, '#CCC']});
                    },
                    callBack: function (data) {
                        if (data.status == 200) {
                            layer.alert('邮件发送成功！', {icon: 1});
                        } else {
                            layer.alert('发送失败！' + data.subMsg, {icon: 2});
                        }
                    },
                    error: function () {
                        layer.alert('邮件发送失败，请重试！', {icon: 2});
                    }
                })
            }
        })
    }

    return {
        renderEmail: renderEmail,
        emailCountValid: emailCountValid
    }
});