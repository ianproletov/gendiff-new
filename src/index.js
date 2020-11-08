import path from 'path';
import fs from 'fs';
import _, { has } from 'lodash';
import parse from './parsers';

const conditions = [
  {
    check: (key, data1, data2) => _.has(data1, key) && !_.has(data2, key),
    action: (value1) => ({ value: value1, type: 'deleted' }),
  },
  {
    check: (key, data1, data2) => !_.has(data1, key) && has(data2, key),
    action: (value1, value2) => ({ value: value2, type: 'added' }),
  },
  {
    check: (key, data1, data2) => _.get(data1, key) !== _.get(data2, key),
    action: (value1, value2) => ({ value: value1, updatedValue: value2, type: 'updated' }),
  },
  {
    check: (key, data1, data2) => _.get(data1, key) === _.get(data2, key),
    action: (value1) => ({ value: value1, type: 'equal' }),
  },
];

const buildDiff = (data1, data2) => {
  const beforeKeys = Object.keys(data1);
  const afterKeys = Object.keys(data2);
  const keys = _.union(beforeKeys, afterKeys);
  return keys.map((key) => {
    const { action } = conditions.find(({ check }) => check(key, data1, data2));
    return { key, ...action(data1[key], data2[key]) };
  });
};

const typeMap = {
  equal: (key, value) => `  ${key}: ${value}`,
  deleted: (key, value) => `- ${key}: ${value}`,
  added: (key, value) => `+ ${key}: ${value}`,
  updated: (key, value, updatedValue) => [`+ ${key}: ${updatedValue}`, `- ${key}: ${value}`],
};

const render = (data, deep = 1) => {
  const ident = ' '.repeat(deep * 2);
  const parsedItems = _.flatten(data.map((item) => {
    const {
      key,
      value,
      updatedValue,
      type,
    } = item;
    return typeMap[type](key, value, updatedValue);
  }))
    .map((parsedItem) => `${ident}${parsedItem}`);
  return `{\n${parsedItems.join('\n')}\n}`;
};

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
