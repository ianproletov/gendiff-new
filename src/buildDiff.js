import _ from 'lodash';

const conditions = [
  {
    check: (key, data1, data2) => _.isObject(data1[key]) && _.isObject(data2[key]),
    action: (value1, value2, fn) => ({ value: fn(value1, value2), type: 'children' }),
  },
  {
    check: (key, data1, data2) => _.has(data1, key) && !_.has(data2, key),
    action: (value1) => ({ value: value1, type: 'deleted' }),
  },
  {
    check: (key, data1, data2) => !_.has(data1, key) && _.has(data2, key),
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
    return { key, ...action(data1[key], data2[key], buildDiff) };
  });
};

export default buildDiff;
