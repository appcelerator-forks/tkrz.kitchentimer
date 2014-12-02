
function init(){
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
