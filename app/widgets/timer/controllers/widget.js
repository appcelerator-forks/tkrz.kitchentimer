var _PARENT = arguments[0].parent,
_DURATION,
_END_TIME,
_IS_RUNNING = false,
_VIBRATE,
_SOUND,
_TIMER;

$.showUpdateDialog = function(isnew){
    if(isnew === true){
        $.hoursPicker.setSelectedRow(0, 0, false);
        $.minutesPicker.setSelectedRow(0, 0, false);
        $.secondsPicker.setSelectedRow(0, 0, false);
        $.updateTimer.show();
        return;
    }
    
    var seconds = parseInt((_DURATION/1000)%60)
        , minutes = parseInt((_DURATION/(1000*60))%60)
        , hours = parseInt((_DURATION/(1000*60*60))%24);
    $.newTitle.value = $.title.text;
    $.hoursPicker.setSelectedRow(0, hours, false);
    $.minutesPicker.setSelectedRow(0, minutes, false);
    $.secondsPicker.setSelectedRow(0, seconds, false);
    $.updateTimer.show();
    
};

function updateTimer(e){
    if(e.index === 1){
    	try{
	        var hours = parseInt($.hoursPicker.getSelectedRow(0).getTitle());
	        var minutes = parseInt($.minutesPicker.getSelectedRow(0).getTitle());
	        var seconds = parseInt($.secondsPicker.getSelectedRow(0).getTitle());
	        _DURATION = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
	        updateTimerDisplay(_DURATION);
	        $.title.text = $.newTitle.value;
	        _VIBRATE = $.vibrateOption.value;
	        _SOUND = $.soundOption.value;
	        (_SOUND) ? $.soundIco.setOpacity(1) : $.soundIco.setOpacity(0.2);
	        (_VIBRATE) ? $.vibrateIco.setOpacity(1) : $.vibrateIco.setOpacity(0.2);
	        _PARENT.container.add($.timer);
       	}
       	catch(e){
       		Ti.API.info(e);
       	}
    }
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
    Ti.API.info(duration);
    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
    $.hoursDisplay.text = (hours < 10) ? '0'+hours : hours;
    $.minutesDisplay.text = (minutes < 10) ? ':0'+minutes : ':'+minutes;
    $.secondsDisplay.text = (seconds < 10) ? ':0'+seconds : ':'+seconds;
}

function closeTimer(){
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
