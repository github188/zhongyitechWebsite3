
$(function(){
    var $wrap = $('.main'),
        $navPanel = $('.nav_panel'),
        $navBtn = $('.nav_btn'),
        pages = $('.number').length,
        scrolling = false,
        isMSIE = false,
        curPage = 1,
        auto = true;
    function manageClass(){
        $wrap.removeClass(function(index, aClass){
            return (aClass.match(/(^|\s)active_p\S+/g)||[]).join(' ');
        });
        $wrap.addClass('active_p' + curPage);
        $navBtn.removeClass('active');
        $('.nav_btn.nav_p' + curPage).addClass('active');
        scrolling = true;
        setTimeout(function(){
            scrolling = false
        },1000);
    };
    function manageClass1(aCur,that){
        $wrap.removeClass(function(index, aClass){
            return (aClass.match(/(^|\s)active_p\S+/g)||[]).join(' ');
        });
        $wrap.addClass('active_p' + aCur);
        $navBtn.removeClass('active');
        that.addClass('active');
        scrolling = true;
        curPage = aCur;
        setTimeout(function(){
            scrolling = false
        },1000);
    }

    //上一页
    function navigateUp(){
        if(curPage > 1){
            curPage--;
            if($.browser.msie){
                isMsie();
                if(isMSIE){
                    manageClass();  
                }else{
                    isIeApply(curPage)
                }
            }else{
                manageClass();
            }
        }
    };
    //下一页
    function navigateDown(){
        if(curPage < pages){
            curPage++;
            //当前屏幕时滚动开始
            if(curPage == 9 && auto){
                auto = false;
                $('.ninth').fnAutoStart({
                    autoSwipe: true,
                    callback : function(i){
                        $('.ninth .num li').eq(i).addClass('on').siblings().removeClass('on');
                    }
                })
            }
            if($.browser.msie){
                isMsie();
                if(isMSIE){
                    manageClass();  
                }else{
                    isIeApply(curPage)
                }
            }else{
                manageClass();
            }
        }
    };
    //头切换
    function smallHeadUp(){
        $(".small_head").slideUp();
    };
    function smallHeadDown(){
        $(".small_head").slideDown();
        $('#js_menu2').lavaLamp({
            fx: 'easeOutBack',
            speed: 700
        });
    }
    //ie适用
    function isIeApply(aCur){
        scrolling = true;
        $wrap.animate({'top':'-' + ((aCur - 1) * 100) + '%'}, 1000, function(){scrolling = false});
        $navBtn.removeClass('active');
        $('.nav_btn.nav_p' + aCur).addClass('active');
    }
    //绑定鼠标滚轮事件
    $(document).on('mousewheel DOMMouseScroll', function(e){ //'mousewheel for ie-webkit, DOMMouseScroll for firefox'
        if(!scrolling){
            if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0){
                if(curPage <= 2){
                    smallHeadUp()
                }
                navigateUp()
            }else{
                if(curPage >= 1){
                    smallHeadDown()
                }
                navigateDown()
            }
        }
        e.preventDefault();
    });
    //绑定序号
    $(document).on('click', '.nav_panel li', function(){
        if(!scrolling){
            var _this = $(this);
            var aTarget = $(this).attr('date-target');
            curPage = aTarget;
            //当前屏幕时滚动开始
            if(curPage == 9 && auto){
                auto = false;
                $('.ninth').fnAutoStart({
                    autoSwipe: true,
                    callback : function(i){
                        $('.ninth .num li').eq(i).addClass('on').siblings().removeClass('on');
                    }
                })
            }
            if(curPage <= 2){
                smallHeadUp()
            }
            if(curPage > 1){
                smallHeadDown()
            }
            if($.browser.msie){
                isMsie();
                if(isMSIE){
                    manageClass1(aTarget,_this)
                }else{
                    curPage = aTarget;
                    isIeApply(aTarget)
                }
            }else{
                manageClass1(aTarget,_this)
            }
            
        }
    });
    //判断ie
    function isMsie(){
        //判断浏览器
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(';');

        if(version.length > 1){
            var trim_Version = parseInt(version[1].replace(/[ ]/g, '').replace(/MSIE/g, ''));
            if(trim_Version > 9){
                isMSIE = true;
            }
        }
    };
    //屏蔽滚轮点击
    $(document).on({
        mousedown:function(e){
            if(e.which == 2){
                return false; 
            }
        }           
    });
    //焦点图
    $(".first").slide({mainCell:".pic",titCell:".pic_btn li",autoPlay:true ,trigger:"click",mouseOverStop:false, interTime:7000,titOnClassName:"cur"});
    //视频浮层
    $("#video_btn li").click(function(){
        var linkSrc = $(this).attr("rel");
        var video='<div id="box_vedio"><embed src="' + linkSrc + '" class="fl" id="videoplayer" allowFullScreen="true" quality="high" width="785" height="440" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed><a href="javascript:void(0);" class="popup_close fl">×</a></div>';
        $("body").append(video);
        $("#bg").show();   
        var oh = $("#box_vedio").height();
        var wh = $(window).height();
        _postop = $(window).scrollTop() + (wh-oh)/2;
        $("#box_vedio").css("top",_postop);
        //关闭视频层
        $(".popup_close").click(function(){
            $("#box_vedio").remove();
            $("#bg").hide(); 
        })
    })
     
});