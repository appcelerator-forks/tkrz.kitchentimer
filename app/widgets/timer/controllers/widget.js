var _PARENT = arguments[0].parent,
_DURATION,
_END_TIME,
_IS_RUNNING = false,
_VIBRATE,
_SOUND;

$.showUpdateDialog = function(isnew){
    if(isnew === true){
        $.hoursPicker.setSelectedRow(0, 0, false);
        $.minutesPicker.setSelectedRow(0, 0, false);
        $.secondsPicker.setSelectedRow(0, 0, false);
        $.updateTimer.show();
        return;
    }
    else{
        var time = new Date(_DURATION);
        var hours = parseInt(time.getHours());
        var minutes = parseInt(time.getMinutes());
        var seconds = parseInt(time.getSeconds());
        $.newTitle.value = $.title.text;
        $.hoursPicker.setSelectedRow(0, hours, false);
        $.minutesPicker.setSelectedRow(0, minutes, false);
        $.secondsPicker.setSelectedRow(0, seconds, false);
        $.updateTimer.show();
        return;
    }
};

function updateTimer(e){
    
    if(e.index === 1){
        var hours = parseInt($.hoursPicker.getSelectedRow(0).getTitle());
        var minutes = parseInt($.minutesPicker.getSelectedRow(0).getTitle());
        var seconds = parseInt($.secondsPicker.getSelectedRow(0).getTitle());
        _DURATION = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
        $.hoursDisplay.text = (hours < 10) ? '0'+hours : hours;
        $.minutesDisplay.text = (minutes < 10) ? ':0'+minutes : ':'+minutes;
        $.secondsDisplay.text = (seconds < 10) ? ':0'+seconds : ':'+seconds;
        $.title.text = $.newTitle.value;
        _VIBRATE = $.vibrateOption.value;
        _SOUND = $.soundOption.value;
        _PARENT.container.add($.timer);
    }
}

function startStop(){
    
}

function closeTimer(){
    
}

function showControlls(){
    $.timerControlls.applyProperties({
        visible: true
    });
}

function hideControlls(){
    $.timerControlls.applyProperties({
        visible: false
    });
}
