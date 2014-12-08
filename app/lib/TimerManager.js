_TIMERS = Ti.App.Properties.getList('timers', []);

function getTimers(){
	return _TIMERS;
}

function addTimer(timer){
	if(timer.id === undefined){
		timer.id = new Date().getTime();
		_TIMERS.push(timer);
	}
	else{
		var index = find(timer.id);
		_TIMERS[index] = timer;
	}
	Ti.App.Properties.setList('timers', _TIMERS);
	return timer.id;
}

function removeTimer(id){
	var index = find(id);
	// Ti.API.info(index);
	if(index > -1){
		_TIMERS.splice(index, 1);
	Ti.App.Properties.setList('timers', _TIMERS);
	}
	
}

function find(id){
	var index;
	// Ti.API.info(id);
	for(var i = 0, l = _TIMERS.length; i < l; i++){
		if(_TIMERS[i].id == id){
			index = i;
			break;
		}
	}
	return (index > -1) ? index : -1;
}

exports.addTimer = addTimer;
exports.getTimers = getTimers;
exports.removeTimer = removeTimer;
