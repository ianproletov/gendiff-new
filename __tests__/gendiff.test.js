import path from 'path';
import fs from 'fs';
import gendiff from '../src';

test('main test', () => {
  const fixturesPath = '__fixtures__';
  const beforePath = path.resolve(__dirname, fixturesPath, 'before.json');
  const afterPath = path.resolve(__dirname, fixturesPath, 'after.json');
  const expectedPath = path.resolve(__dirname, fixturesPath, 'jsonresult');
  const actual = gendiff(beforePath, afterPath);
  const expected = fs.readFileSync(expectedPath, 'utf-8');
  expect(actual).toEqual(expected);
});
