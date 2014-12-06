_TIMERS = Ti.App.Properties.getList('timers', []);

function addTimer(timer){
	if(typeof(timer.id))
	return timer.id;
}

function removeTimer(id){
	
}

function find(id){
	var index;
	for(var i = 0, l = _TIMERS.length; i < l; i++){
		if(_TIMERS[i].id == id){
			index = i;
			break;
		}
	}
	return index || -1;
}
