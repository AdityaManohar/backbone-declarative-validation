# Backbone Declarative Validator


This is a light weight add-on to the Backbone.js framework that provides declarative validation capabilities.

In keeping with the spirit of Backbone.js, this add-on is un-opinionated in its approach to validation.

In an attempt to operate within the confines of a quasi-MVC architectural pattern, this add-on only provides model level validation and does not offer an API that can be used to manipulate views. It does however, expose an `errors` object that can be used as necessary.

## Installation

This add-on requires `Underscore.js` and `Backbone.js` to be installed as prerequisites. 

On synchronous pages:

```
	<script type='text/javascript' src="backbone.declarative.validator.js">/<script>

```

When using a service locator such as RequireJS the add-on needs to be installed as a shim.

```
require.config({

	paths: {
		"Backbone": "lib/backbone-min.js",
		"Backbone.Declarative.validator": "lib/backbone.declarative.validator.min.js""
	},
	
	shim: {
		"Backbone": {
			deps: ["Underscore", "jQuery"],
			exports: "Backbone"
		},
		"Backbone.Declarative.Validator": {
			deps: ["Backbone"],
			exports: "Backbone"
		},
	}
});

```

## Usage

The attributes to be validated are declared as a hash in the model's constructor.

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
The following are the list of validations currently supported.

### Presence

This checks whether the attribute has a defined value or not. Empty and whitespace strings, `null` and `undefined` values are considered invalid. 

```
var User = Backbone.Model.extend({

	validates: {
		first_name: {
			presence: true
		}
	}

});

```

Setting `presence: false` will validate *only* empty (including whitespace) strings, null or undefined values; **do not** set `presence` for optional attributes.


### Type

Validating specific types of values can be performed by setting this value for an attribute in the `validates` hash. Type validations also validate empty strings (to prevent this use `presence`). Currently supported type validations are listed below:

* text
* number
* email

#### text

Validates a string containing only alphabets. 

```
var User = Backbone.Model.extend({
	
	validates: {
		first_name: {
			presence: true,
			type: 'text'
		}
	}	
	
});

```

#### number

Validates (quoted and un-quoted) values containing only numbers (integers as well as floats). 

```
var Account = Backbone.Model.extend({
	
	validates: {
		balance: {
			presence: true,
			type: "number"
		}
	}
	
});

```

#### email

Validates email addresses

```
var User = Backbone.Model.extend({

	validates: {
		email: {
			type: "email"
		}
	}

});

```

### Size

This validates strings for length and numbers for magnitude. Quoted numbers are validated for magnitude and not length.

```
var User = Backbone.Model.extend({

	validates: {
		first_name: {
			presence: true,
			type: "text",
			size: "> 40" // Validates length
		}
		age: {
			presence: true,
			type: "number",
			size: "> 21" // Validates magnitude
		}
	}
	
});

```

Comparisons supported by size are:

* &gt;
* &lt;
* ==
* &gt;=
* &lt;= 

## Overriding Type Validation

It is possible to provide a custom pattern for an existing type with the ```using``` property.

```
var User = Backbone.Model.extend({
	
	validates: {	
		first_name: {
			type: "text",
			using: /^(\s*([a-zA-Z0-9]+)\s*)$/gi // Now validates alpha-numeric strings
		}
	}
	
});

```
Or after object initialization:

```
var user = new User();
user.validates.first_name.using = /^(\s*([a-zA-Z0-9]+)\s*)$/gi

```
**Caution:** Doing this will change the `validates` hash for all objects instantiated with the constructor.


## Extending Types

To implement new validation types you need only provide a custom regular expression:

```
var patterns = {
	phone: /\s*(\d{3})-(\d{3})-(\d{4})\s*/g    //This is a contrived example
	}
};
```
The patters hash then needs to be extended as follows:

```
_.extend(User.patterns, patterns); // The User constructor

```

Using the newly defined validation type:

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

It is also possible to extend types with the `using` property.

```
var User = Backbone.Model.extend({
	
	validates: {	
		first_name: {
			type: "phone",
			using: /\s*(\d{3})-(\d{3})-(\d{4})\s*/g
		}
	}
	
});

```

Extending Helpers
-----------------

In addition to overriding `type` validation, custom validation helpers can also be defined. The helpers must return a boolean value. Helpers are passed the attribute currently being validated, as well as the condition being validated against as configured in the ```validates``` hash.

Example:

```
helpers = {
	range: function(provided, condition){
		//return boolean value
	}
};
	
```
The helpers hash then needs to be extended as follows:

```
_.extend(User.helpers, helpers) // The User constructor

```

Using the custom helper:

```
var User = Backbone.Model.extend({
	
	validates: {
		age: {
			presence: true,
			range: [18-75] // This value is passed in as the second parameter to the helper 
		}
	}
	
});

```

Handling validation errors
------------------------------

If validation fails for a particular field then the the validate method returns an `errors` object which is automagically assigned to the `validationErrors` property of the model. 

There is one key for each of the validations that fail on a field. Only attributes that are invalid are added to the errors object.

The structure of the errors object is as follows:

```
{
	email: {
		presence: "Invalid email", // Email failed presence validation
		type: "Invalid email" // Email also failed type validation
	}
}

```
The `errors` object is also passed to callbacks bound to the `invalid` event triggered by the model. This is a Backbone.js default and the add-on does not change it.

An example of how the `errors` object can be used in a view:

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
