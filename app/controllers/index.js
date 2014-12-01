
function init(){
}

function addTimer(){
    Alloy.createWidget('timer', {parent: $}).getView('updateTimer').show();
    // $.container.add(timer.getView('timer'));
}

$.index.open();
