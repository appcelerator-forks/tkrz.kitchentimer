var _parent = arguments[0].parent,
_model = arguments[0].model;

_model.on('change:currentTime', function(){
    // Ti.API.info('Model update: ' + _model.get('currentTime'));
    updateTimerDisplay();
});

$.title.text = _model.get('name');
updateTimerDisplay();

function startStop(){
    if(!_model.get('isRunning')){
        _model.save({isRunning: 1});
    }
    else
        _model.save({isRunning: 0});
}

function updateTimerDisplay(){
    var seconds = (_model.get('currentTime')/1000)%60
        , minutes = Math.floor((_model.get('currentTime')/(1000*60))%60)
        , hours = Math.floor((_model.get('currentTime')/(1000*60*60))%24);
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
    dialog.setData($model);
    dialog.optionsDialog.addEventListener('click', function(e){
        if(e.button && e.index == 0 )
        {
            var data = dialog.getData();
            $.model.save(data);
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
