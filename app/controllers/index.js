
var _collection = Alloy.Collections.instance('timer');


function init(){
    _collection.fetch();
    _collection.on('destroy', function(){
        Ti.API.info('Removed model');
    });
    _collection.on('create', function(){
        Ti.API.info('Added model');
    });
    Ti.Analytics.featureEvent('App open');
	prepareTimers();
	// $.index.activity.actionBar.onHomeIconItemSelected = openMenu();
    $.index.activity.invalidateOptionsMenu();
}

function prepareTimers(){
    $.container.hide();
    $.activityIndicator.show();
    // var timers = require('TimerManager').getTimers();
    // Ti.API.info(JSON.stringify((timers)));
    if(_collection.length > 0)
        _collection.each(function(model)
        {
    		$.container.add(Alloy.createWidget('pl.tidev.kitchentimer.timer', {parent: $, model: model}).getView());
        });
    $.activityIndicator.hide();
    $.container.show();
}

function close(){
    $.index.close();
    $.destroy();
}

function addTimer(){
    var dialog = Alloy.createWidget('pl.tidev.kitchentimer.optionsdialog');
    dialog.optionsDialog.addEventListener('click', function(e){
        if(e.button && e.index == 0 )
        {
            var data = dialog.getData();
            var model = Alloy.createModel('timer', data);
            model.save();
            _collection.add(model);
            $.container.add(Alloy.createWidget('pl.tidev.kitchentimer.timer', {parent: $, model: model}).getView());
        }
    });
    dialog.optionsDialog.show();
}


function modelToJson(model) {
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    return transform;
}

$.index.open();
