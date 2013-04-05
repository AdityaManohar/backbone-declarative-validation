describe("Tests for length", function(){
	
	var User, user;
	
	beforeEach(function(){
		User = Backbone.Model.extend({
			validates: {
				first_name: {
				},
				balance: {
				}
			}
		});
		user = new User();
	});
	
	it("should validate size", function(){
		user.validates.first_name.size = ">= 3";
		user.set({first_name: "foo"});
		expect(user.isValid()).toBeTruthy();
	});
	
	it("should validate size of numbers", function(){
		user.validates.balance.size = "< 100";
		user.set({balance: 400});
		expect(user.isValid()).toBeFalsy();
	});
	
	it("should validate magnitude of quoted numbers", function(){
		user.validates.balance.size = "> 100";
		user.set({balance: "400"});
		expect(user.isValid()).toBeTruthy();
	});
	
	describe("- greater than", function(){
	
		it("should allow longer strings", function(){
			user.validates.first_name.size = "> 10";
			user.set({first_name: "The quick brown fox"});
			expect(user.isValid()).toBeTruthy();
		});	
		
		it("should not allow shorter strings", function(){
			user.validates.first_name.size = "> 10";
			user.set({first_name: "FooBar"});
			expect(user.isValid()).toBeFalsy();
		});
		
		it("should allow larger numbers", function(){
			user.validates.balance.size = "> 100";
			user.set({balance: 400});
			expect(user.isValid()).toBeTruthy();
		});
		
		it("should not allow smaller numbers", function(){
			user.validates.balance.size = "> 100";
			user.set({balance: 40});
			expect(user.isValid()).toBeFalsy();
		});
		
	});
	
	describe("- lesser than", function(){
	
		it("should not allow longer strings", function(){
			user.validates.first_name.size = "< 10";
			user.set({first_name: "The quick brown fox"});
			expect(user.isValid()).toBeFalsy();
		});	
		
		it("should allow shorter strings", function(){
			user.validates.first_name.size = "< 10";
			user.set({first_name: "FooBar"});
			expect(user.isValid()).toBeTruthy();
		});
		
		it("should not allow larger numbers", function(){
			user.validates.balance.size = "< 100";
			user.set({balance: 400});
			expect(user.isValid()).toBeFalsy();
		});
		
		it("should allow smaller numbers", function(){
			user.validates.balance.size = "< 100";
			user.set({balance: 40});
			expect(user.isValid()).toBeTruthy();
		});
		
	});
	
	describe("- equal to", function(){
	
		it("should not allow longer strings", function(){
			user.validates.first_name.size = "== 10";
			user.set({first_name: "The quick brown fox"});
			expect(user.isValid()).toBeFalsy();
		});	
		
		it("should not allow shorter strings", function(){
			user.validates.first_name.size = "== 10";
			user.set({first_name: "FooBar"});
			expect(user.isValid()).toBeFalsy();
		});
		
		it("should allow equal length strings", function(){
			user.validates.first_name.size = "== 4";
			user.set({first_name: "John"});
			expect(user.isValid()).toBeTruthy();
		});
		
		it("should not allow larger numbers", function(){
			user.validates.balance.size = "== 100";
			user.set({balance: 400});
			expect(user.isValid()).toBeFalsy();
		});
		
		it("should not allow smaller numbers", function(){
			user.validates.balance.size = "== 100";
			user.set({balance: 40});
			expect(user.isValid()).toBeFalsy();
		});
		
		it("should allow equal numbers", function(){
			user.validates.balance.size = "== 100";
			user.set({balance: 100});
			expect(user.isValid()).toBeTruthy();
		});
	});
	
	describe("- greater than or equal to", function(){
	
		it("should allow longer strings", function(){
			user.validates.first_name.size = ">= 10";
			user.set({first_name: "The quick brown fox"});
			expect(user.isValid()).toBeTruthy();
		});	
		
		it("should not allow shorter strings", function(){
			user.validates.first_name.size = ">= 10";
			user.set({first_name: "FooBar"});
			expect(user.isValid()).toBeFalsy();
		});
		
		it("should allow equal length strings", function(){
			user.validates.first_name.size = ">= 4";
			user.set({first_name: "John"});
			expect(user.isValid()).toBeTruthy();
		});
		
		it("should allow larger numbers", function(){
			user.validates.balance.size = ">= 100";
			user.set({balance: 400});
			expect(user.isValid()).toBeTruthy();
		});
		
		it("should not allow smaller numbers", function(){
			user.validates.balance.size = ">= 100";
			user.set({balance: 40});
			expect(user.isValid()).toBeFalsy();
		});
		
		it("should allow equal numbers", function(){
			user.validates.balance.size = ">= 100";
			user.set({balance: 100});
			expect(user.isValid()).toBeTruthy();
		});
	});
	
	describe("- less than or equal to", function(){
	
		it("should not allow longer strings", function(){
			user.validates.first_name.size = "<= 10";
			user.set({first_name: "The quick brown fox"});
			expect(user.isValid()).toBeFalsy();
		});	
		
		it("should allow shorter strings", function(){
			user.validates.first_name.size = "<= 10";
			user.set({first_name: "FooBar"});
			expect(user.isValid()).toBeTruthy();
		});
		
		it("should allow equal length strings", function(){
			user.validates.first_name.size = "<= 4";
			user.set({first_name: "John"});
			expect(user.isValid()).toBeTruthy();
		});
		
		it("should not allow larger numbers", function(){
			user.validates.balance.size = "<= 100";
			user.set({balance: 400});
			expect(user.isValid()).toBeFalsy();
		});
		
		it("should allow smaller numbers", function(){
			user.validates.balance.size = "<= 100";
			user.set({balance: 40});
			expect(user.isValid()).toBeTruthy();
		});
		
		it("should allow equal numbers", function(){
			user.validates.balance.size = "<= 100";
			user.set({balance: 100});
			expect(user.isValid()).toBeTruthy();
		});
	});
	
});