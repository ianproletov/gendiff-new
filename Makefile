install:
	npm install
start:
	npx babel-node src/bin/gendiff __tests__/__fixtures__/simple/before.json __tests__/__fixtures__/simple/after.json
start-plain:
	npx babel-node src/bin/gendiff --format plain __tests__/__fixtures__/nested/before.ini __tests__/__fixtures__/nested/after.ini
start-json:
	npx babel-node src/bin/gendiff --format json __tests__/__fixtures__/nested/before.ini __tests__/__fixtures__/nested/after.ini
help:
	npx babel-node src/bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test