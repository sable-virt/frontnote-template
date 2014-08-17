(function() {

    var $window = $(window),
        $body = $(document.body),
        $pagetop = $('.sn-pagetop');
    var isShow = false;

    $('.sn-menu, .sn-bars').rippleEffect();
    $('.sn-drawer-trigger').on('click', function(e) {
        e.preventDefault();
        if($body.hasClass('sn-overflow')) {
            hideDrawer();
        } else {
            showDrawer();
        }
    });
    $('.sn-content').on('touchstart mousedown', function(e) {
        if($body.hasClass('sn-overflow')) {
            hideDrawer();
        }
    });
    $pagetop.on('click', function(e) {
        e.preventDefault();
        $pagetop.removeClass('sn-show');
        $('html,body').animate({
            scrollTop: 0
        },500,'swing');

    });
    $window.on('resize', function(e) {
        var width = $window.width();
        if (width > 680 && $body.hasClass('sn-overflow')) {
            $body.removeClass('sn-overflow')
        }
    });
    $window.on('mousewheel', function(e) {
        if ($window.scrollTop() !== 0) {
            if (!isShow) {
                $pagetop.addClass('sn-show');
                isShow = true;
            }
        } else if (isShow) {
            $pagetop.removeClass('sn-show');
            isShow = false;
        }
    });

    $(document).on('click blur','.sn-code', function(e) {
        if (!document.execCommand) return;
        if (e.type === 'focusout') {
            $(this).attr('contentEditable',false);
        } else {
            $(this).attr('contentEditable',true);
            document.execCommand('selectAll', false, null);
        }
    });

    function init() {
        $window.trigger('mousewheel');
    }
    function hideDrawer() {
        $body.removeClass('sn-overflow');
    }
    function showDrawer() {
        $body.addClass('sn-overflow');
    }
    init();
})();