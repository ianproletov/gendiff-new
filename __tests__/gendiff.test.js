import path from 'path';
import fs from 'fs';
import gendiff from '../src';

describe.each(['.json', '.yml', '.ini'])('%s test', (extension) => {
  const fixturesPath = '__fixtures__';
  const beforeFileName = `before${extension}`;
  const afterFileName = `after${extension}`;
  const beforePath = path.resolve(__dirname, fixturesPath, beforeFileName);
  const afterPath = path.resolve(__dirname, fixturesPath, afterFileName);
  const expectedPath = path.resolve(__dirname, fixturesPath, 'jsonresult');
  const actual = gendiff(beforePath, afterPath);
  const expected = fs.readFileSync(expectedPath, 'utf-8');
  test('check', () => {
    expect(actual).toEqual(expected);
  });
});
