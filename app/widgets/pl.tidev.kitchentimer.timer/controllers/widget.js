var _parent = arguments[0].parent,
_model = arguments[0].model;

_model.on('change:current_time', function(){
    // Ti.API.info('Model update: ' + _model.get('currentTime'));
    updateTimerDisplay();
});
_model.on('end', function(){
    $.startStop.title = '\uf04b';
});

if(_model.get('is_running'))
{
    $.startStop.title = '\uf04c';
}
else
{
    $.startStop.title = '\uf04b';
}

$.title.text = _model.get('name');
(_model.get('sound') == 0) ? $.soundIco.opacity = 0.1 : $.soundIco.opacity = 1;
(_model.get('vibrate') == 0) ? $.vibrateIco.opacity = 0.1 : $.vibrateIco.opacity = 1;
updateTimerDisplay();

function startStop(){
    if(!_model.get('is_running')){
        $.startStop.title = '\uf04c';
        var currentTime = _model.get('current_time');
        _model.save({
            is_running: 1,
            last_update: new Date().getTime()
        });
        Ti.API.info(Math.round(currentTime/1000));
        Alloy.Globals.AlarmManager.cancelAlarmNotification(_model.get('id'));
        Alloy.Globals.AlarmManager.addAlarmNotification({
            requestCode: _model.get('id'),
            icon: Ti.App.Android.R.drawable.appicon,
            second: Math.round(currentTime/1000),
            contentTitle: L('notificationTitle', 'Timer finished'),
            contentText: String.format(L('notificationBody', 'Timer %s has ended countdown!'), _model.get('name')),
            vibrate: (_model.get('vibrate') == 1) ? true : false,
            playSound: (_model.get('sound') == 1) ? true: false,
            sound: Ti.Filesystem.getResRawDirectory() + 'alarm',
        });
    }
    else
    {
        $.startStop.title = '\uf04b';
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
