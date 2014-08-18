$.fn.rippleEffect = function() {
    var _$this = $(this);
    _$this.css({
        tapHighlightColor: 'rgba(0,0,0,0)'
    });
    var isTouch = false;
    function startRipple(e) {
        if (e.type === 'touchstart') {
            isTouch = true;
        } else {
            if (isTouch) {
                isTouch = false;
                return;
            }
        }
        var $this = $(this),
            event = e.originalEvent,
            x = event.touches ? event.touches[0].pageX : e.pageX,
            y = event.touches ? event.touches[0].pageY : e.pageY,
            offset = $this.offset(),
            pointX = parseInt(x - offset.left),
            pointY = parseInt(y - offset.top);

        var $svg = $this.find("svg");
        if ($svg.length !== 0) {
            var $oldEffect = $svg.data('ripple');
            if ($oldEffect) {
                $oldEffect.stop();
                $svg.data('ripple', null);
            }
            $svg.remove();
        }
        $this.append('<svg class="fn-ripple"><circle fill-opacity="0.8" cx="'+pointX+'" cy="'+pointY+'" radius="0"></circle></svg>');

        var $circle = $this.find('circle');
        var $effect = $({
            r: 0.8,
            op: 1
        }).animate({
            r : $this.outerWidth(),
            op: 1
        },{
            easing: "swing",
            duration: 250,
            step : function(val,fx){
                if (fx.prop === 'op') {
                    $circle.attr('fill-opacity', val);
                } else {
                    $circle.attr(fx.prop, val);
                }
            }
        });
        $circle.data('ripple',$effect);
    }

    function endRipple(e) {
        var $this = $(this),
            $svg = $this.find('svg.fn-ripple');
            $circle = $svg.find('circle');
        if ($circle.length === 0) return;

        var $effect = $circle.data('ripple'),
            radius = parseInt($circle.attr('r'));

        $effect.stop(true,false).animate({
            r : $this.outerWidth(),
            op: 0
        },{
            easing: "swing",
            duration: 250,
            step : function(val,fx){
                if (fx.prop === 'op') {
                    $circle.attr('fill-opacity', val);
                } else {
                    $circle.attr(fx.prop, val);
                }
            },
            complete: function() {
                $svg.remove();
            }
        });
    }
    _$this.on('mousedown touchstart', startRipple);
    _$this.on('mouseup touchend', endRipple);
};