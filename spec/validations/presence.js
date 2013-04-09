describe("Test for presence", function(){

	var User = Backbone.Model.extend({
			validates: {
				first_name: {
					presence: true
				}
			}
		}), 
		user;

	beforeEach(function(){
		user  = new User();
	});
	
	it("should not allow empty strings", function(){
		user.set({first_name: ""});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should not allow strings with only spaces", function(){
		user.set({first_name: "   "});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should not allow NULL values", function(){
		user.set({first_name: null});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should not allow UNDEFINED values", function(){
		user.set({first_name: undefined});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should allow numbers", function(){
		user.set({first_name: 23});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should return default error message", function(){
		user.set({first_name: ""});
		user.isValid();
		expect(user.validationError.first_name.presence).toEqual("Invalid first name");
	});
	
})	