install:
	npm install
start:
	npx babel-node src/bin/gendiff __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json
help:
	npx babel-node src/bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test