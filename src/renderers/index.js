import _ from 'lodash';

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

export default render;
