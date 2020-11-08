install:
	npm install
start:
	npx babel-node src/bin/gendiff __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json
start-yml:
	npx babel-node src/bin/gendiff __tests__/__fixtures__/before.yml __tests__/__fixtures__/after.yml
start-ini:
	npx babel-node src/bin/gendiff __tests__/__fixtures__/before.ini __tests__/__fixtures__/after.ini
help:
	npx babel-node src/bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test