$.open = function(){
	$.sideMenu.open({
	    activityEnterAnimation: Ti.Android.R.anim.none
    });
};

$.close = function(){
	// $.bg.animate({backgroundColor: '#00000000', duration: 200},function(){
		$.sideMenu.close({activityExitAnimation: Ti.Android.R.anim.none});
	// });
};

function animate(){
	$.bg.animate({backgroundColor: '#80000000', duration: 200});
}

function animateMenu(e){
    Ti.API.info('Touch move');
    var left = e.x - 200;
    if(left <= 0)
        $.menu.animate({left: left, duration: 30});
}

function menuSettle(e){
    Ti.API.info(e.x);
}
