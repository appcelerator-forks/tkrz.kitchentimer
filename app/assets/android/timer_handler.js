var _collection = Alloy.Collections.instance('timer'),
_service = Titanium.Android.currentService;
_collection = _collection.where({isRunning: 1});

Ti.API.info(_service.getServiceInstanceId());

for(var i = 0, l = _collection.length; i < l; i++)
{
    var model = _collection[i];
    var time = model.get('currentTime');
    // Ti.API.info(JSON.stringify(model));
    var set = {
        currentTime: time - 1000
    };
    if(model.get('currentTime') <= 0)
    {
        set.isRunning = 0,
        set.currentTime = model.get('duration');
        notify(model.toJSON());
    }
    model.save(set);
}

function notify(timer)
{
    var notification = Titanium.Android.createNotification({
        contentTitle: L('notificationTitle'),
        contentText : String.format(L('notificationBody'), timer.name),
        contentIntent: Ti.Android.createPendingIntent({intent: Ti.Android.createIntent({})}),
        when: new Date()
    });
    if(timer.sound)
        notification.defaults = Titanium.Android.DEFAULT_SOUND;
    if(timer.vibrate)
        notification.defaults = notification.defaults | Titanium.Android.DEFAULT_VIBRATE;
    Ti.Android.NotificationManager.notify(timer.id, notification);
}
