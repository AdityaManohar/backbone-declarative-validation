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
	
})	