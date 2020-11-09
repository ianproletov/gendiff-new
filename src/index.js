import path from 'path';
import fs from 'fs';
import parse from './parsers';
import buildDiff from './buildDiff';
import render from './renderers';

const getDataFromFile = (filepath) => {
  const absPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absPath, 'utf-8');
};

const gendiff = (filepath1, filepath2) => {
  const filetype1 = path.extname(filepath1);
  const filetype2 = path.extname(filepath2);
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);
  const first = parse(data1, filetype1);
  const second = parse(data2, filetype2);
  const diffData = buildDiff(first, second);
  return render(diffData);
};

export default gendiff;
