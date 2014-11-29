var _START_TIME,
_END_TIME ,
_TIME_LEFT,
_MATRIX0 = Ti.UI.create2DMatrix().rotate(0),
_MATRIX360 = Ti.UI.create2DMatrix().rotate(360),
_ANIMATION = Ti.UI.createAnimation({
	transform: _MATRIX360
}),
_TIMER_RUNNING = false,
_TIMER,
_VIBRATE = true;

function init(){
	resetTimer();
}

function toggleTimer(){
	if(!_TIMER_RUNNING)
		startTimer();
	else
		stopTimer();
}

function startTimer(){
	_TIMER_RUNNING = true;
	var duration = Ti.App.Properties.getInt('duration', 1000*60);
	_START_TIME = new Date().getTime();
	_END_TIME = _START_TIME + duration;
	_TIMER = setInterval(clockTick, 1000);
	clockTick();
	$.startBtn.title = 'Stop';
}

function stopTimer(){
	_TIMER_RUNNING = false;
	clearInterval(_TIMER);
	$.startBtn.title = 'Start';
}

function resetTimer(){
	_TIME_LEFT = Ti.App.Properties.getInt('duration', 1000*60);
	updateTime();
}

function clockTick(){
	_TIME_LEFT = _END_TIME - (new Date().getTime());
	if(_TIME_LEFT <= 0){
		Ti.Media.createSound({url: Ti.Filesystem.getResourcesDirectory()+'sounds/beep.mp3'}).play();
		Ti.Media.vibrate([0, 500]);
		stopTimer();
		return;
	};
	updateTime();
}

function setTimer(){
	if(_TIMER_RUNNING)
		return;
	$.setTimer.show();
}

function setTime(e){
	if(e.index == 1 && $.timeInput.value != '')
		Ti.App.Properties.setInt('duration', $.timeInput.value * 60 * 1000);
	else
		Ti.App.Properties.setInt('duration', 60 * 1000); // Default one minute
	resetTimer();
}

function toggleScreenOn(e){
	$.index.setKeepScreenOn(e.value);
}

function toggleVibrate(e){
	_VIBRATE = e.value;
}

function updateTime(){
	var time = new Date(_TIME_LEFT);
	var hours = time.getHours() - 1;
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	$.hoursDisplay.text = (hours < 10) ? '0'+hours : hours;
	$.minutesDisplay.text = (minutes < 10 ) ? ':0'+minutes : ':'+minutes;
	$.secondsDisplay.text = (seconds < 10 ) ? ':0'+seconds : ':'+seconds;
}

$.index.open();
