var _PARENT = arguments[0].parent,
_DURATION,
_END_TIME,
_IS_RUNNING = false,
_VIBRATE,
_SOUND,
_TIMER,
_ID;

$.showUpdateDialog = function(isnew){
	
	_PARENT.updateTimer.addEventListener('click', updateTimer);
	
    if(isnew === true){
        _PARENT.hoursPicker.setSelectedRow(0, 0, false);
        _PARENT.minutesPicker.setSelectedRow(0, 0, false);
        _PARENT.secondsPicker.setSelectedRow(0, 0, false);
        _PARENT.updateTimer.show();
        return;
    }
    
    var seconds = parseInt((_DURATION/1000)%60)
        , minutes = parseInt((_DURATION/(1000*60))%60)
        , hours = parseInt((_DURATION/(1000*60*60))%24);
    _PARENT.newTitle.value = $.title.text;
    _PARENT.hoursPicker.setSelectedRow(0, hours, false);
    _PARENT.minutesPicker.setSelectedRow(0, minutes, false);
    _PARENT.secondsPicker.setSelectedRow(0, seconds, false);
    _PARENT.soundOption.value = _SOUND;
    _PARENT.vibrateOption.value = _VIBRATE;
    _PARENT.updateTimer.show();
    
};

$.createTimerFromMem = function(timer){
	_DURATION = timer.duration;
	_ID = timer.id;
	updateTimerDisplay(_DURATION);
	$.title.text = timer.name || 'Timer';
    _VIBRATE = timer.vibrate;
    _SOUND = timer.sound;
    (_SOUND) ? $.soundIco.setOpacity(1) : $.soundIco.setOpacity(0.2);
    (_VIBRATE) ? $.vibrateIco.setOpacity(1) : $.vibrateIco.setOpacity(0.2);
    _PARENT.container.add($.timer);
};

function updateTimer(e){
    if(e.index === 0){
    	try{
	        var hours = parseInt(_PARENT.hoursPicker.getSelectedRow(0).getTitle());
	        var minutes = parseInt(_PARENT.minutesPicker.getSelectedRow(0).getTitle());
	        var seconds = parseInt(_PARENT.secondsPicker.getSelectedRow(0).getTitle());
	        _DURATION = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
	        updateTimerDisplay(_DURATION);
	        $.title.text = _PARENT.newTitle.value || 'Timer';
	        _VIBRATE = _PARENT.vibrateOption.value;
	        _SOUND = _PARENT.soundOption.value;
	        (_SOUND) ? $.soundIco.setOpacity(1) : $.soundIco.setOpacity(0.2);
	        (_VIBRATE) ? $.vibrateIco.setOpacity(1) : $.vibrateIco.setOpacity(0.2);
	        _PARENT.container.add($.timer);
	        addToMem();
       	}
       	catch(e){
       		Ti.API.info(e);
       	}
    }
	_PARENT.updateTimer.removeEventListener('click', updateTimer);
}

function addToMem(){
	var timer = {
			id: _ID,
			name: $.title.text,
			duration: _DURATION,
			vibrate: _VIBRATE,
			sound: _SOUND
		};
	_ID = require('TimerManager').addTimer(timer);
}

function startStop(){
    if(!_IS_RUNNING){
        var time = new Date().getTime();
        _END_TIME = _DURATION + time;
        _TIMER = setInterval(timeTick, 1000);
        _IS_RUNNING = true;
        $.startStop.title = '\uf04d';
        return;
    }
    clearInterval(_TIMER);
    $.startStop.title = '\uf04b';
    updateTimerDisplay(_DURATION);
    _IS_RUNNING = false;
}

function timeTick(){
    var time = new Date().getTime();
    var duration = _END_TIME - time;
    if(duration <= 0){
        startStop();
        notify();
        return;
    }
    updateTimerDisplay(duration);
}

function updateTimerDisplay(duration){
    // Ti.API.info(duration);
    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
    $.hoursDisplay.text = (hours < 10) ? '0'+hours : hours;
    $.minutesDisplay.text = (minutes < 10) ? ':0'+minutes : ':'+minutes;
    $.secondsDisplay.text = (seconds < 10) ? ':0'+seconds : ':'+seconds;
}

function closeTimer(){
	require('TimerManager').removeTimer(_ID);
	_PARENT.container.remove($.timer);
	if(_IS_RUNNING)
	   clearInterval(_TIMER);
	$.destroy();
    return;
}

function showControlls(){
    $.timerControlls.applyProperties({
        visible: true
    });
    return;
}

function hideControlls(){
    $.timerControlls.applyProperties({
        visible: false
    });
    return;
}

function notify(){
    if(_SOUND)
        Ti.Media.createSound({url: Ti.Filesystem.getResourcesDirectory() + 'sounds/beep.mp3'}).play();
    if(_VIBRATE)
        Ti.Media.vibrate([0, 500]);
}
