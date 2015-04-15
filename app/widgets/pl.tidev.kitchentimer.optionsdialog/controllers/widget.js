$.setData = function(model)
{
    $.newTitle.value = model.get('name');
    var duration = model.get('duration')
        , seconds = (duration/1000)%60
        , minutes = (duration/(1000*60))%60
        , hours = (duration/(1000*60*60))%24;
    $.hoursPicker.setSelectedRow(0, hours, false);
    $.minutesPicker.setSelectedRow(0, minutes, false);
    $.secondsPicker.setSelectedRow(0, seconds, false);
    $.soundOption.value = (model.get('sound') == 1) ? true : false;
    $.vibrateOption.value = (model.get('vibrate') == 1) ? true : false;
};

$.getData = function()
{
    var hours = parseInt($.hoursPicker.getSelectedRow(0).getTitle());
    var minutes = parseInt($.minutesPicker.getSelectedRow(0).getTitle());
    var seconds = parseInt($.secondsPicker.getSelectedRow(0).getTitle());
    var duration = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    var data = {
        name: $.newTitle.value,
        duration: duration,
        currentTime: duration,
        sound: ($.soundOption.value) ? 1 : 0,
        vibrate: ($.vibrateOption.value) ? 1 : 0
    };
    return data;
};
