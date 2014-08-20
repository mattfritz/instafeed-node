TESTS = test/*.js
test:
	  mocha --timeout 5000 --reporter progress $(TESTS)
		 
.PHONY: test
