var _parent = arguments[0].parent,
_model = arguments[0].model;

_model.on('change:current_time', function(){
    // Ti.API.info('Model update: ' + _model.get('currentTime'));
    updateTimerDisplay();
});

$.title.text = _model.get('name');
(_model.get('sound') == 0) ? $.soundIco.opacity = 0.1 : $.soundIco.opacity = 1;
(_model.get('vibrate') == 0) ? $.vibrateIco.opacity = 0.1 : $.vibrateIco.opacity = 1;
updateTimerDisplay();

function startStop(){
    if(!_model.get('is_running')){
        var currentTime = _model.get('current_time')
            , now = new Date().getTime()
            , end = new Date(now + currentTime);
        _model.save({
            is_running: 1,
            last_update: new Date().getTime()
        });
        Ti.API.info(end.toTimeString());
        Alloy.Globals.AlarmManager.addAlarmNotification({
            requestCode: _model.get('id'),
            icon: Ti.App.Android.R.drawable.appicon,
            year: end.getFullYear(),
            month: end.getMonth(),
            day: end.getDate(),
            second: end.getSeconds(),
            minute: end.getMinutes(),
            hour: end.getHours(), 
            contentTitle: L('notificationTitle'),
            contentText: String.format(L('notificationBody'), _model.get('name')),
            vibrate: (_model.get('vibrate') == 1) ? true : false,
            playSound: (_model.get('sound') == 1) ? true: false
        });
    }
    else
    {
        _model.save({is_running: 0});
        Alloy.Globals.AlarmManager.cancelAlarmNotification(_model.get('id'));
    }
}

function updateTimerDisplay(){
    var currentTime = _model.get('current_time')
        , seconds = Math.floor((currentTime/1000)%60)
        , minutes = Math.floor((currentTime/(1000*60))%60)
        , hours = Math.floor((currentTime/(1000*60*60))%24);
    $.hoursDisplay.text = (hours < 10) ? '0'+hours : hours;
    $.minutesDisplay.text = (minutes < 10) ? ':0'+minutes : ':'+minutes;
    $.secondsDisplay.text = (seconds < 10) ? ':0'+seconds : ':'+seconds;
}

function closeTimer(){
	_parent.container.remove($.timer);
    _model.destroy();
}

function showUpdateDialog()
{
    var dialog = Alloy.createWidget('pl.tidev.kitchentimer.optionsdialog');
    dialog.setData(_model);
    dialog.optionsDialog.addEventListener('click', function(e){
        if(e.button && e.index == 0 )
        {
            var data = dialog.getData();
            _model.save(data);
            $.title.text = data.name;
            (data.sound == 0) ? $.soundIco.opacity = 0.1 : $.soundIco.opacity = 1;
            (data.vibrate == 0) ? $.vibrateIco.opacity = 0.1 : $.vibrateIco.opacity = 1;
        }
    });
    dialog.optionsDialog.show();
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
