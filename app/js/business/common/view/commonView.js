define(['jquery'], function () {

    /**
     * 设置checkbox事件
     */
    function handleCheckbox() {
        var checkbox, span;
        var len = $('.table .list-yq tr').length;
        $(document).on('click', '.cy-checkbox', function () {
            checkbox = $(this).find('input[type=checkbox]');
            span = $(this).find('span');
            if (checkbox.length == 0) return false;
            if (span.hasClass('checked')) {
                span.removeClass('checked');
                checkbox.prop('checked', false);
                if ($(this).parents('thead').length == 1) {
                    $(this).parents('thead').next('tbody').find('tr').find('td:first .cy-checkbox span').removeClass('checked');
                } else {
                    $('.table thead .checked').removeClass('checked');
                }
            } else {
                span.addClass('checked');
                if ($(this).parents('thead').length == 1) {
                    $(this).parents('thead').next('tbody').find('tr').find('td:first .cy-checkbox span').addClass('checked');
                } else {
                    $('.table tbody .checked').length == $('.table tbody tr').length &&
                    $('.table thead .cy-checkbox span').addClass('checked');
                }
                checkbox.prop('checked', true);
            }
        })
    }

    /**
     * 绑定点击收起面板
     */
    function planCloseOpen() {
        $(".conditions-choice").find(".conditions-shrinkage-btn").on("click", function () {
            if ($(this).hasClass("chooseClosed")) {
                $(".conditions-choice").find(".conditions-box").not(":last").show();
                $(this).removeClass("chooseClosed");
                $(this).children("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            } else {
                $(".conditions-choice").find(".conditions-box").not(":last").hide();
                $(this).addClass("chooseClosed");
                $(this).children("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            }
        })
    }

    return {
        handleCheckbox: handleCheckbox,
        planCloseOpen: planCloseOpen
    }

})
