exports.definition = {
	config: {
		columns: {
		    "name": "text",
		    "id": "integer primary key",
		    "duration": "real",
		    "currentTime": "real",
		    "isRunning": "integer",
		    "sound": "integer",
		    "vibrate": "integer"
		},
		defaults: {
		    "name": "Timer",
		    "duration": 0,
		    "currentTime": 0,
		    "isRunning": false,
		    "sound": true,
		    "vibrate": true
		},
		adapter: {
			type: "sql",
			collection_name: "timer",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};