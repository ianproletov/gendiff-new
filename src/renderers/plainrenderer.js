import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return value;
  }
  return '[complex value]';
};

const render = (data, prevKeys = []) => _.flatten(data.map((item) => {
  const {
    key,
    value,
    updatedValue,
    children,
    type,
  } = item;
  const currentKeys = [...prevKeys, key];
  const currentKey = currentKeys.join('.');
  switch (type) {
    case 'added':
      return `Property '${currentKey}' was added with value: ${stringify(value)}`;
    case 'deleted':
      return `Property '${currentKey}' was removed`;
    case 'updated':
      return `Property '${currentKey}' was updated. From ${stringify(value)} to ${stringify(updatedValue)}`;
    case 'equal':
      return [];
    case 'children':
      return render(children, currentKeys);
    default:
      return null;
  }
})).join('\n');

export default render;
