(function() {

    var $window = $(window),
        $body = $(document.body),
        $pagetop = $('.fn-pagetop');
    var isShow = false;

    $('.fn-menu, .fn-bars').rippleEffect();
    $('.fn-drawer-trigger').on('click', function(e) {
        e.preventDefault();
        if($body.hasClass('fn-overflow')) {
            hideDrawer();
        } else {
            showDrawer();
        }
    });
    $('.fn-content').on('touchstart mousedown', function(e) {
        if($body.hasClass('fn-overflow')) {
            hideDrawer();
        }
    });
    $pagetop.on('click', function(e) {
        e.preventDefault();
        $pagetop.removeClass('fn-show');
        $('html,body').animate({
            scrollTop: 0
        },500,'swing');

    });
    $window.on('resize', function(e) {
        var width = $window.width();
        if (width > 680 && $body.hasClass('fn-overflow')) {
            $body.removeClass('fn-overflow')
        }
    });
    $window.on('mousewheel', function(e) {
        if ($window.scrollTop() !== 0) {
            if (!isShow) {
                $pagetop.addClass('fn-show');
                isShow = true;
            }
        } else if (isShow) {
            $pagetop.removeClass('fn-show');
            isShow = false;
        }
    });

    $(document).on('blur','.fn-code', uneditable);
    $(document).on('click','.fn-pre .fn-icon', editable);

    function uneditable() {
        $(this).attr('contentEditable',false);
    }

    function editable(e) {
        e.preventDefault();
        var $target = $(this).siblings('.fn-code');
        $target.attr('contentEditable',true);
        $target.focus();
        if (document.execCommand) {
            document.execCommand('selectAll', false, null);
            //document.execCommand('copy');
        }
    }

    function init() {
        $window.trigger('mousewheel');
    }
    function hideDrawer() {
        $body.removeClass('fn-overflow');
    }
    function showDrawer() {
        $body.addClass('fn-overflow');
    }
    init();
})();