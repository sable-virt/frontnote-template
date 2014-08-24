(function() {
    var TOOLTIP_OFFSET_X = 10,
        TOOLTIP_OFFSET_Y = 10,
        TOOLTIP_DURATION = 200,
        PAGETOP_DURATION = 450;

    var $window = $(window),
        $document = $(document),
        $body = $(document.body),
        $pagetop = $('.fn-pagetop');
    var isShow = false;

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
        $document.on('blur','.fn-code', uneditable);
        $document.on('click','.fn-pre .fn-icon', editable);
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

        var $tooltip = $('<div class="fn-tooltip"><i class=""></i></div>');
        $body.append($tooltip);
        $('.fn-preview > *').on('mousemove',function(e) {
            $tooltip.html(this.className);
            $tooltip.stop().fadeIn(TOOLTIP_DURATION).css({
                top: e.clientY + TOOLTIP_OFFSET_Y,
                left: e.clientX + TOOLTIP_OFFSET_X
            });
        }).on('mouseleave',function(e) {
            $tooltip.stop().fadeOut(TOOLTIP_DURATION);
        });

        $pagetop.on('click', function(e) {
            e.preventDefault();
            $pagetop.removeClass('fn-show');
            $('html,body').animate({
                scrollTop: 0
            },PAGETOP_DURATION,'swing');

        });
        hljs.initHighlightingOnLoad();
    }
    function hideDrawer() {
        $body.removeClass('fn-overflow');
    }
    function showDrawer() {
        $body.addClass('fn-overflow');
    }
    init();
})();