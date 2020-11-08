import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getDataFromFile = (filepath) => {
  const absPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absPath, 'utf-8');
};

const getDiff = (data1, data2) => {
  const beforeKeys = Object.keys(data1);
  const afterKeys = Object.keys(data2);
  return _.union(beforeKeys, afterKeys);
};

const gendiff = (filepath1, filepath2) => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);
  const first = JSON.parse(data1);
  const second = JSON.parse(data2);
  const diffData = getDiff(first, second);
  return diffData;
};

export default gendiff;
