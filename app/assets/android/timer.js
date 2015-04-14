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
    }
    model.save(set);
}