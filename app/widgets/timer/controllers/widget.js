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
    
    var time = new Date(_DURATION);
    var hours = parseInt(time.getHours());
    var minutes = parseInt(time.getMinutes());
    var seconds = parseInt(time.getSeconds());
    $.newTitle.value = $.title.text;
    $.hoursPicker.setSelectedRow(0, hours, false);
    $.minutesPicker.setSelectedRow(0, minutes, false);
    $.secondsPicker.setSelectedRow(0, seconds, false);
    $.updateTimer.show();
    
};

function updateTimer(e){
    if(e.index === 1){
        var hours = parseInt($.hoursPicker.getSelectedRow(0).getTitle());
        var minutes = parseInt($.minutesPicker.getSelectedRow(0).getTitle());
        var seconds = parseInt($.secondsPicker.getSelectedRow(0).getTitle());
        _DURATION = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
        updateTimerDisplay(_DURATION);
        $.title.text = $.newTitle.value;
        _VIBRATE = $.vibrateOption.value;
        _SOUND = $.soundOption.value;
        (_SOUND) ? $.soundIco.setOpacity(1) : $.soundIco.setOpacity(0.5);
        (_VIBRATE) ? $.vibrateIco.setOpacity(1) : $.vibrateIco.setOpacity(0.5);
        _PARENT.container.add($.timer);
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
    var time = new Date(duration);
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    $.hoursDisplay.text = (hours < 10) ? '0'+hours : hours;
    $.minutesDisplay.text = (minutes < 10) ? ':0'+minutes : ':'+minutes;
    $.secondsDisplay.text = (seconds < 10) ? ':0'+seconds : ':'+seconds;
}

function closeTimer(){
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
        Ti.Media.createSound({url: Ti.Filesystem.getResourcesDirectory() + 'sounds/beep.mp3'});
    if(_VIBRATE)
        Ti.Media.vibrate([0, 500]);
}
