var _START_TIME,
_END_TIME ,
_TIME_LEFT,
_MATRIX0 = Ti.UI.create2DMatrix().rotate(0),
_MATRIX360 = Ti.UI.create2DMatrix().rotate(360),
_ANIMATION = Ti.UI.createAnimation({
	transform: _MATRIX360
}),
_TIMER_RUNNING = false,
_TIMER;

function toggleTimer(){
	if(!_TIMER_RUNNING)
		startTimer();
	else
		stopTimer();
}

function startTimer(){
	_TIMER_RUNNING = true;
	var duration = Ti.App.Properties.getInt('duration', 1000*60*10);
	_START_TIME = new Date().getTime();
	_END_TIME = _START_TIME + duration;
	_TIMER = setInterval(clockTick, 1000);
	_ANIMATION.setDuration(duration);
	clockTick();
	// $.timerRing.animate(_ANIMATION);	
	$.startBtn.title = 'Stop';
}

function stopTimer(){
	_TIMER_RUNNING = false;
	// $.timerRing.animate({
		// transform: _MATRIX0,
		// duration: 1
	// });
	clearInterval(_TIMER);
	$.startBtn.title = 'Start';
}

function resetTimer(){
	
}

function clockTick(){
	_TIME_LEFT = _END_TIME - (new Date().getTime());
	var minutes = new Date(_TIME_LEFT).getMinutes();
	var seconds = new Date(_TIME_LEFT).getSeconds();
	$.minutesDisplay.text = (minutes < 10 ) ? '0'+minutes : minutes;
	$.secondsDisplay.text = (seconds < 10 ) ? '0'+minutes : minutes;
}

$.index.open();
