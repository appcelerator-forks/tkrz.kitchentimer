$.stayOn.value = Ti.App.Properties.getBool('keepScreenOn', false);
$.version.text = String.format(L('version', 'Version: %s'), Ti.App.version + '');