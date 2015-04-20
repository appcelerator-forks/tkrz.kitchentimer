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
    try
    {
        var hours = parseInt($.hoursPicker.getSelectedRow(0).getTitle());
    }
    catch (e)
    {
        Ti.API.debug('Zawiodły godziny');
        var hours = 0;
    }
    try
    {
        var minutes = parseInt($.minutesPicker.getSelectedRow(0).getTitle());
    }
    catch (e)
    {
        Ti.API.debug('Zawiodły minuty');
        var minutes = 0;
    }
    try
    {
        var seconds = parseInt($.secondsPicker.getSelectedRow(0).getTitle());
    }
    catch (e)
    {
        Ti.API.debug('Zawiodły sekundy');
        var seconds = 0;
    }
    var duration = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000)
        , data = {
            name: $.newTitle.value,
            duration: duration,
            current_time: duration,
            sound: ($.soundOption.value) ? 1 : 0,
            vibrate: ($.vibrateOption.value) ? 1 : 0
        };
    return data;
};
