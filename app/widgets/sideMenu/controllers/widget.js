$.open = function(){
	$.sideMenu.open({animated: false});
};

$.close = function(){
	$.bg.animate({backgroundColor: '#00000000', duration: 200},function(){
		$.sideMenu.close({animated: false});
	});
};

function animate(){
	$.bg.animate({backgroundColor: '#80000000', duration: 200});
}

