Backbone Declarative Validator
===============================

This is a light weight add-on to the Backbone.js framework that provides declarative validation capabilities.

In keeping with the spirit of Backbone.js, this add-on is un-opinionated in its approach to validation.

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

Validations
-----------
Currently the validations supported are

* text
* email
* number

A more comprehensive set of validations will be added in due course.

Custom Extensions
-----------------

Each validation has an associated helper method of the same name. The existing helper methods can be overridden as well as new helpers defined to support other custom validations.


To implement new validations:

```
var helpers = {
	phone: function(){
		// Custom validation logic
	}
};
```
Extend the existing helpers:

```
_.extend(User.helpers, helpers);

```

And using the newly defined validation:

```
var Model = Backbone.Model.extend({

	validates: {
		phone_number: {
			presence: true,
			type: "phone" // This value must be the same as the defined helper
		}
	}
	
});

```
Additionally the regular expressions defined for the the existing validations can also be overridden. 

To implement custom patterns:

```
var patterns = {
	text: /some new pattern/gi
}

```
Extend the existing patterns:

```
_.extend(User.patterns, patterns);

```

Dealing with validation errors
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
The ```errors``` object is also passed to the callback of bound to the ```invalid``` event that is triggered by the model.

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