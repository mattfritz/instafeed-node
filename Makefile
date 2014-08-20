TESTS = test/*.js
test:
	  mocha --timeout 5000 --reporter progress $(TESTS)
		
coverage:
		istanbul cover _mocha -- -R spec

.PHONY: test
