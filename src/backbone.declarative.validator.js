(function(Backbone, _) {
		
	"use strict";
	var validator = {

		patterns : {
			email : /^$|^\s*([(A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})\s*$/i,
			number : /^$|^\s*(\d*(\.\d+)?)\s*$/,
			text : /^$|^(\s*([A-Za-z]+)\s*)+$/i
		},

		// One helper for each validation type
		helpers : {
			type : function(source, type, pattern) {
				source.toString().replace(/^\s+|\s+$/g, "")
				if(pattern){
					return pattern.test(source);
				} else {
					return this.patterns[type].test(source);
				}
				
			},
			presence : function(source, bool) {
				if (source === null || typeof source === "undefined") {
					return false;
				}
					
				// Trim the string before checking for presence
				return !!source.replace(/^\s+|\s+$/g, "") === bool;
			},
			length : function(source, length) {
				return source.toString().length === length;
			}
		},

		validate : function(attrs) {
			var validations = this.validates, attributes = attrs, prop, stack, fieldName;

			if (validations) {
				if (!!!this.errors) {
					this.errors = {};
				}
				// Iterate over all the declared fields
				for (var v in validations) {
					if( validations.hasOwnProperty(v)) {
						// Initialize key for error
						if (!!!this.errors[v]) {
							this.errors[v] = {};
						}
						// Source value
						prop = attributes[v];
						fieldName = v.replace(/_/, " ");
						// Declarative validations for a particular field
					
						stack = validations[v];
						for (var s in stack){
							if(this.helpers[s]){
								if(!this.helpers[s].call(this, prop, stack[s], stack.using)){
									this.errors[v][s] = stack.msg || "Invalid " + fieldName;
								} else {
									if (!!this.errors[v][s]) {
										// Delete validation type and error message if valid
										delete this.errors[v][s];
									}
								}
							} 
						}
						// Delete field name if no errors
						if (_.isEmpty(this.errors[v])) {
							delete this.errors[v];
						}
					}
				}
			}
			if(!_.isEmpty(this.errors)) {
				return this.errors;	
			}
		}
	};
	_.extend(Backbone.Model.prototype, validator);
})(Backbone, _);
