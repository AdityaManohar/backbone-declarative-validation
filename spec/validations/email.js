describe("Test for type EMAIL", function(){
	
	var User = Backbone.Model.extend({
		validates: {
			email: {
				type: "email"
			}
		}
	}),
	user;
	
	beforeEach(function(){
		user = new User();
	});
	
	it("should allow empty strings", function(){
		user.set({email: ""});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should not allow only whitespace strings", function(){
		user.set({email: "    "});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should return custom error message", function(){
		user.validates.email.msg = "This is a bogus email";
		user.set({email: "foo"});
		user.isValid();
		expect(user.validationError.email.type).toEqual("This is a bogus email");
	});
})