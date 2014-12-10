
function init(){
    Ti.Analytics.featureEvent('App open');
	prepareTimers();
	// $.index.activity.actionBar.onHomeIconItemSelected = openMenu();
    $.index.activity.invalidateOptionsMenu();
}

function prepareTimers(){
    $.container.hide();
    $.activityIndicator.show();
    var timers = require('TimerManager').getTimers();
    // Ti.API.info(JSON.stringify((timers)));
    if(timers.length > 0)
        _.each(timers, function(timer){
            Alloy.createWidget('timer', {parent: $}).createTimerFromMem(timer);
        });
    $.activityIndicator.hide();
    $.container.show();
}

function closeWindow(){
    var dialog = Ti.UI.createAlertDialog({
        title: 'Confirm close',
        message: 'Closing application will stop all running timers.\nClose anyway?',
        buttonNames: [
            'Close',
            'Cancel'
        ]
    });
    dialog.addEventListener('click', function(e){
        if(e.index === 0)
            $.index.close();
    });
    dialog.show();
}

function addTimer(){
    Alloy.createWidget('timer', {parent: $}).showUpdateDialog(true);
}

function openMenu(e){
    var source = e.source;
    Ti.API.info(e.x + ' ' + JSON.stringify(source));
    if(e.x < 100)
        Alloy.createWidget('sideMenu').open();
}

$.index.open();
