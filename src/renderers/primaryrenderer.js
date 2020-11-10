import _ from 'lodash';

const bar = ' ';
const equalBar = ' ';
const deleteBar = '-';
const updatedBar = '+';

const getIdent = (deep) => bar.repeat(deep * 4 + 2);

const getPostIdent = (deep) => bar.repeat(deep * 4);

const stringify = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = Object.keys(value).map((key) => (`${getIdent(deep)}  ${key}: ${value[key]}`));
  return `{\n${result.join('\n')}\n${getPostIdent(deep)}}`;
};

const getString = (key, value, deep, sign) => `${getIdent(deep)}${sign} ${key}: ${stringify(value, deep + 1)}`;

const typeMap = {
  equal: ({ key, value }, deep) => getString(key, value, deep, equalBar),
  deleted: ({ key, value }, deep) => getString(key, value, deep, deleteBar),
  added: ({ key, value }, deep) => getString(key, value, deep, updatedBar),
  updated: ({ key, value, updatedValue }, deep) => [
    getString(key, updatedValue, deep, updatedBar),
    getString(key, value, deep, deleteBar),
  ],
  children: ({ key, children }, deep, render) => `${getIdent(deep)}  ${key}: ${render(children, deep + 1)}`,
};

const render = (data, deep = 0) => {
  const parsedItems = _.flatten(data
    .map((item) => typeMap[item.type](item, deep, render)))
    .map((parsedItem) => `${parsedItem}`);
  return `{\n${parsedItems.join('\n')}\n${getPostIdent(deep)}}`;
};

export default render;
