import fn from '../src';

test('main test', () => {
  const word = 'ian';
  const actual = fn(word);
  const expected = 'IAN';
  expect(actual).toEqual(expected);
});
