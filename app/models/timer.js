exports.definition = {
	config: {
		columns: {
		    "name": "text",
		    "id": "integer primary key",
		    "duration": "real",
		    "current_time": "real",
		    "last_update": "real",
		    "end_time": "real",
		    "is_running": "integer",
		    "sound": "integer",
		    "vibrate": "integer"
		},
		defaults: {
		    "name": "Timer",
		    "duration": 0,
		    "current_time": 0,
            "last_update": 0,
            "end_time": 0,
		    "is_running": false,
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