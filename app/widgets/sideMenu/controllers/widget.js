$.open = function(){
	$.sideMenu.open({
	    activityEnterAnimation: Ti.Android.R.anim.fade_in
    });
};

$.close = function(){
	// $.bg.animate({backgroundColor: '#00000000', duration: 200},function(){
		$.sideMenu.close({activityExitAnimation: Ti.Android.R.anim.fade_out});
	// });
};

function animate(){
	$.bg.animate({backgroundColor: '#80000000', duration: 200});
}

