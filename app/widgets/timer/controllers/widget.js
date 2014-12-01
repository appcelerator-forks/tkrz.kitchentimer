var _PARENT = arguments[0].parent,
_DURATION,
_VIBRATE,
_SOUND;

function updateTimer(e){
    if(e.index === 1)
        _PARENT.container.add($.timer);
}
