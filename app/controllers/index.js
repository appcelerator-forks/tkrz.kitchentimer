
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
	// prepareTimers();
	// $.index.activity.actionBar.onHomeIconItemSelected = openMenu();
    $.index.activity.invalidateOptionsMenu();
}

function prepareTimers(){
    $.container.hide();
    $.activityIndicator.show();
    var timers = require('TimerManager').getTimers();
    // Ti.API.info(JSON.stringify((timers)));
    // if(timers.length > 0)
        // _.each(timers, function(timer){
            // Alloy.createWidget('timer', {parent: $}).createTimerFromMem(timer);
        // });
    $.activityIndicator.hide();
    $.container.show();
}

function closeWindow(){
    var dialog = Ti.UI.createAlertDialog({
        title: L('closeDialogTitle','Confirm close'),
        message: L('closeMessage','Closing application will stop all running timers.\nClose anyway?'),
        buttonNames: [
            L('buttonClose','Close'),
            L('buttonCancel','Cancel')
        ]
    });
    dialog.addEventListener('click', function(e){
        if(e.index === 0)
            $.index.close();
            $.destroy();
    });
    dialog.show();
}

function addTimer(){
    var model = Alloy.createModel('timer', {
        name: "wldjwlcwcbkec",
        id: null,
        duration: 36000,
        currentTime: 36000,
        isRunning: 0,
        sound: 0,
        vibrate: 0
    });
    model.save();
    _collection.add(model);
    $.container.add(Alloy.createWidget('timer', {parent: $, model: model}).getView());
}


function modelToJson(model) {
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    return transform;
}

$.index.open();
