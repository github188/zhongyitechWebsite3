$(function(){
	//nav tab
    var $navLi = $(".nav li");
    $navLi.on({
        mouseenter:function(){
            $(this).children('ul').show();
        },
        mouseleave:function(){
            $(this).children('ul').hide();
        }
    });
	
    //滚轮
    $(window).scroll(function(){
        var scrollH = $(document).scrollTop(),
            headH = $('.header').height();

        //头部切换
        if($('#js_s_head').hasClass('small_head')){    
            if(scrollH >= headH){
                $('#js_s_head').addClass('fixed');
                $('#js_s_head').slideDown();
                //导航跟随
                $('#js_menu2').lavaLamp({
                    fx: 'easeOutBack',
                    speed: 700
                });
            }else{
                $('#js_s_head').slideUp();
                $('#js_s_head').removeClass('fixed');
            }
        }else{
            if(scrollH >= headH){
                $('#js_s_head').addClass('fixed');
            }else{
                $('#js_s_head').removeClass('fixed');
            }
        }
    });
    //导航跟随
    $('#js_menu1').lavaLamp({
        fx: 'easeOutBack',
        speed: 700
    });
    
    //自动切换
    var swithTab = $('.ninth').fnAutoStart({
        callback: function(i){
            $('.ninth .num li').eq(i).addClass('on').siblings().removeClass('on');
        }
    });
    $('.ninth .num li').on('click', function(i){
        swithTab.assignFn($(this).index())
    }) 
});
//封装自动切换
;(function(win,$){
    'use strict';
    $.fn.fnAutoStart = function(opts){
        return new slideStartFn(this, opts)
    };
    var slideStartFn = function(ele, opts){
        var me = this;
        me.$el = $(ele);
        me.init(opts);
    };

    slideStartFn.prototype.init = function(opts){
        var me = this;
        me.opts = $.extend({},{
            pics: me.$el.children('.list'), //图片盒子
            picsLi: me.$el.children('.list').children('li'), //图片集合
            nums: me.$el.children('.num'), //切换盒子
            numsLi: me.$el.children('.num').children('li'), //切换按钮
            autoSwipe: false, //自动切换
            bgColor: 'fafafa', //背景颜色
            aHover: true, //鼠标滑上停止
            index: 0, //轮播初始值
            speed: 5000, //每次轮播时间
            callback: function(){} //回调函数
        }, opts);
        me._index = me.opts.index;
        //图片数量
        me.picsLiLen = me.opts.picsLi.length;
        //回调
        me.opts.callback(me._index, me.picsLiLen); 
        //小于等于1个图片，跳出
        if(me.picsLiLen <= 1) return false;
        //调用自动切换
        autoStart(me);
        //鼠标滑入停止
        if(me.opts.aHover){
            me.opts.nums.hover(function(){
                fnStopSlide(me)
            },function(){
                autoStart(me)
            });
        }
    };
    //自动切换动作
    function slideStart(me,index){
        var $numsLi = me.opts.nums.children();
        var $thisImg = $numsLi.eq(index).data('src');
        var $picsLi = me.opts.pics.children();
        //$numsLi.removeClass('on').eq(index).addClass('on');
        if($thisImg==me.opts.bgColor){
            $picsLi.hide().eq(index).css({'background':'#'+ $thisImg +'','display':'block'});
        }else{
            $picsLi.hide().eq(index).css({'background-image':'url('+ $thisImg +')','background-repeat':'no-repeat','background-position':'center 0','display':'block'});
        }
        $numsLi.eq(index).removeAttr('data-src');
    }; 
    // 停止轮播
    function fnStopSlide(me){
        clearInterval(me.autoSlide);
    }
    //自动切换
    function autoStart(me){
        if(me.opts.autoSwipe){
            fnStopSlide(me);
            me.autoSlide = setInterval(function(){
                autoStartFn(me, 'next') 
            },me.opts.speed);   
        }   
    };
    //指定轮播
    slideStartFn.prototype.assignFn = function(i){
        var me = this;
        autoStartFn(me, i); 
    };
    //轮播方法
    function autoStartFn(me, go){
        if(typeof go === 'number'){
            me._index = go;
            slideStart(me,me._index);
        }else if(go == 'next'){
           me._index++;
           if(me._index >= me.picsLiLen) me._index = 0;
            slideStart(me,me._index);
        }else if(go == 'prev'){
            me._index--;
            if(me._index == 0) me_index == me.picsLiLen-1;
            slideStart(me,me._index);
        }
        me.opts.callback(me._index, me.picsLiLen);       
    }
})(window, window.jQuery);

//封装导航光标跟随
;(function(win,$){
    'use script';
    $.fn.lavaLamp = function(o){
        return new lavaLamps(this, o)
    }
    var lavaLamps = function(ele, o){
        var me = this;
        me.$el = $(ele);
        me.init(o);
    }
    lavaLamps.prototype.init = function(o){
        var me = this;
        me.opts = $.extend({},{
            ul: me.$el.children('ul'),
            li: me.$el.children().children('li'),
            back: me.$el.children().children('.back'),
            fx: 'linear',
            speed: 500,
            click: function(){}
        },o);

        me.opts.ul.each(function(){
            var b = $(this),
                noop = function(){},
                $li = b.children('li'),
                curr = b.children('li.cur')[0] || $($li[0]).addClass('cur')[0];

            $li.not('.back').hover(function(){
                move(this);
            }, noop);   
            b.hover(noop, function(){
                move(curr)
            });
            $li.click(function(e){
                setCurr(this);
                return me.opts.click.apply(this, [e, this])
            });
            setCurr(curr);
            function setCurr(a){
                me.opts.back.css({'left': a.offsetLeft ,'width': a.offsetWidth});
                curr = a;
            };
            function move(a){
                me.opts.back.each(function(){
                    $(this).dequeue() //dequeue()从队列最前端移除一个队列函数，并执行他.
                }).animate({width: a.offsetWidth, left: a.offsetLeft}, me.opts.speed, me.opts.fx);
            }; 
        });
    }
})(window, window.jQuery);

  