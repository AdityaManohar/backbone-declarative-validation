describe("Test for type TEXT", function(){
	
	var User = Backbone.Model.extend({
			validates: {
				first_name: {
					type: "text"
				}
			}
		}), 
		user;

	beforeEach(function(){
		user = new User();
	});
	
	it("should not allow numbers", function(){
		user.set({first_name: "12345"});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should not allow special characters", function(){
		user.set({first_name: "~!@#$%^&*()_+<>?:'{}[]"});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should not allow only whitespace strings", function(){
		user.set({first_name: "    "});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should allow empty strings", function(){
		user.set({first_name: ""});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should allow single characters", function(){
		user.set({first_name: "a"});
		expect(user.isValid()).toBeTruthy();
	});

	it("should allow whitespace at the beginning of the sentence", function(){
		user.set({first_name: "   fox"});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should allow whitespace at the end of the sentence", function(){
		user.set({first_name: "fox   "});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should allow spaces between words", function(){
		user.set({first_name: "the quick"});
		expect(user.isValid()).toBeTruthy();
	}); 
	
	it("should allow multiple words", function(){
		user.set({first_name: "the quick brown fox"});
		expect(user.isValid()).toBeTruthy();
	}); 
	
	it("should use the custom pattern", function(){
		user.validates.first_name.using = /^(\s*([A-Za-z0-9]+)\s*)+$/i;
		user.set({first_name: "foobar2013"});
		expect(user.isValid()).toBeTruthy();
	});

});