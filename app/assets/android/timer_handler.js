var _collection = Alloy.Collections.instance('timer'),
_service = Titanium.Android.currentService;
_collection = _collection.where({is_running: 1});

// Ti.API.info(_collection.length);

for(var i = 0, l = _collection.length; i < l; i++)
{
    var model = _collection[i]
        , time = model.get('current_time')
        , now = new Date().getTime()
        , delta = (now - model.get('last_update'))
        , set = {
            current_time: time - /*((delta < 1000) ? 1000 : */delta/*)*/,
            last_update: now
        };
    Ti.API.info((now - model.get('last_update')));
    if(set.current_time < 0)
    {
        set.is_running = 0,
        set.current_time = model.get('duration');
        model.trigger('end');
    }
    model.save(set);
}