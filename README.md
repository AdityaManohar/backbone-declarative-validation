Backbone Declarative Validator
===============================

This is a light weight add-on to the Backbone.js framework that provides declarative validation capabilities.

In keeping with the spirit of Backbone.js, this add-on is un-opinionated in its approach to validation.

In an attempt to operate within the confines of a quasi-MVC architectural pattern, this add-on only provides model level validation and does not offer an API that can be used to manipulate views. It does however, expose an ```errors``` object that can be used as necessary.

Usage
-----
```
var User = Backbone.Model.extend({

	validates: {
		first_name: {
			presence: true,
			type: "text",
			msg: "Name can consist only of alphabets"
		},
		email: {
			presence: true,
			type: "email"
		}
	}

});
```

Validation types
-----------
Currently the validation types supported are

* text
* email
* number

A more comprehensive set of validations will be added in due course.

Extending Types
-----------------

To implement new validation types you need only provide a custom regular expression:

```
var patterns = {
	phone: /\s*(\d{3})-(\d{3})-(\d{4})\s*/g    //This is a contrived example
	}
};
```
The patters hash then needs to be extended as follows:

```
_.extend(User.patterns, patterns);

```

And using the newly defined validation type:

```
var User = Backbone.Model.extend({

	validates: {
		phone_number: {
			presence: true,
			type: "phone" // This value must be the same as the defined pattern key
		}
	}
	
});

```

It is also possible to provide a custom pattern for an existing type or a new type with the ```using``` property.

```
var User = Backbone.Model.extend({
	
	validates: {	
		first_name: {
			type: "text",
			using: /^(\s*([a-zA-Z0-9]+)\s*)$/gi
		}
	}
	
});

```
Or after object initialization:

```
var user = new User();
user.validates.first_name.using = /^(\s*([a-zA-Z0-9]+)\s*)$/gi

```

Extending Helpers
-----------------

You can also add custom validation helpers. The helpers defined must return a boolean value. Helpers are passed the current attribute value as well as the desired attribute value configured in the ```validates``` hash.

Example:

```
helpers = {
	range: function(provided, desired){
		//return boolean value
	}
};
	
```
The helpers hash then needs to be extended as follows:

```
_.extend(User.helpers, helpers)

```

The custom helper can then be used as follows:

```
var User = Backbone.Model.extend({
	
	validates: {
		age: {
			presence: true,
			range: [18-75]
		}
	}
	
});

```

Handling validation errors
------------------------------

If a validation fails for a particular field then the the validate method returns an ```errors``` object which is automagically assigned to the ```validationErrors``` property of the model. 

There is one key for each of the validations that fail on a field. Only attributes that are invalid are populated into the errors object.

The structure of the errors object is as follows:

```
{
	email: {
		presence: "Invalid email",
		type: "Invalid email"
	}
}

```
The ```errors``` object is also passed to callbacks bound to the ```invalid``` event triggered by the model.

An example of how the ```errors``` object can be used in a view:

```
var UserView = Backbone.View.extend({
	
	initialize: function(){
		// Other initialization
		this.model.bind("invalid", this.handleErrors);
	}
	
	handleErrors: function(model, errors){
		
		// Use the errors object as needed
		
	}
	
});

```

Copyright &copy; Aditya Manohar Licensed under the MIT License