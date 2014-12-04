
function init(){
	$.activityIndicator.show();
	var timers = Ti.App.Properties.getList('timers', []);
	if(timers.length > 0)
		_.each(timers, function(timer){
			Alloy.createWidget('timer', {parent: $}).createTimerFromMem(timer);
		});
	$.activityIndicator.hide();
}

function closeWindow(){
    var dialog = Ti.UI.createAlertDialog({
        title: 'Confirm close',
        message: 'Closing application will stop all running timers.\nClose anyway?',
        buttonNames: [
            'Cancel',
            'Close'
        ]
    });
    dialog.addEventListener('click', function(e){
        if(e.index === 1)
            $.index.close();
    });
    dialog.show();
}

function addTimer(){
    Alloy.createWidget('timer', {parent: $}).showUpdateDialog(true);
}

$.index.open();
