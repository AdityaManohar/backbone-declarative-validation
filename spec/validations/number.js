describe("Test for type NUMBER", function(){
	
	var User = Backbone.Model.extend({
		validates: {
			balance: {
				type: "number"
			}
		}
	}), user;
	
	beforeEach(function(){
		user = new User();
	});
	
	it("should allow empty strings", function(){
		user.set({balance: ""});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should allow padded strings", function(){
		user.set({balance: "    12345     "});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should allow single digits", function(){
		user.set({balance: 2});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should allow decimals", function(){
		user.set({balance: 12345.678});
		expect(user.isValid()).toBeTruthy();
	});
	
});