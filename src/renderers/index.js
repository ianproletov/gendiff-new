import _ from 'lodash';

const bar = ' ';

const getIdent = (deep) => bar.repeat(deep * 4 + 2);

const getPostIdent = (deep) => bar.repeat(deep * 4);

const stringify = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = Object.keys(value).map((key) => (`${getIdent(deep)}  ${key}: ${value[key]}`));
  return `{\n${result.join('\n')}\n${getPostIdent(deep)}}`;
};

const typeMap = {
  equal: (key, value, updatedValue, deep) => `${getIdent(deep)}  ${key}: ${stringify(value, deep + 1)}`,
  deleted: (key, value, updatedValue, deep) => `${getIdent(deep)}- ${key}: ${stringify(value, deep + 1)}`,
  added: (key, value, updatedValue, deep) => `${getIdent(deep)}+ ${key}: ${stringify(value, deep + 1)}`,
  updated: (key, value, updatedValue, deep) => [
    `${getIdent(deep)}+ ${key}: ${stringify(updatedValue, deep + 1)}`,
    `${getIdent(deep)}- ${key}: ${stringify(value, deep + 1)}`,
  ],
  children: (key, value, updatedValue, deep, render) => `${getIdent(deep)}  ${key}: ${render(value, deep + 1)}`,
};

const render = (data, deep = 0) => {
  const parsedItems = _.flatten(data.map((item) => {
    const {
      key,
      value,
      updatedValue,
      type,
    } = item;
    return typeMap[type](key, value, updatedValue, deep, render);
  }))
    .map((parsedItem) => `${parsedItem}`);
  return `{\n${parsedItems.join('\n')}\n${getPostIdent(deep)}}`;
};

export default render;
