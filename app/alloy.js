// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.updateObj = _.extend({}, Backbone.Events);

var intent = Titanium.Android.createServiceIntent( { url: 'timer_handler.js' } );
// Service should run its code every 1 seconds.
intent.putExtra('interval', 1000);


var service = Titanium.Android.currentService;

if(!service)
{
    Ti.API.debug('service not running, creating');
    var service = Ti.Android.createService(intent);
    service.addEventListener('stop', function(e) {
        service.start();
    });
    service.start();
}
