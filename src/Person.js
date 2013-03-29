var Person = Backbone.Model.extend({

	validates : {
		first_name : {
			presence: true,
			type: "text",
			using: /^\d+$/, 
			msg: "Name can contain only alphabets"
		},
		email: {
			presence: true,
			type: "email"
		}
	}
});
