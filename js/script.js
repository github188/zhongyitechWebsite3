$(document).ready(function(){
	var $tab_li = $('#tab ul.tab_menu li');
	$tab_li.on("mouseover",function() {
		$(this).addClass('selected').siblings().removeClass('selected');
		var index = $tab_li.index(this);
		$('div.tab_box > div').eq(index).show().siblings().hide();
	});
	$(".backtop").click(function(){
		$('html,body').animate({scrollTop: 0},600);
	});
});
//mouseover“∆…œ»•