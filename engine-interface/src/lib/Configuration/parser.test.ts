import test from 'ava';

import Directive from './directive';

test('Parser should produce correct cells', (ctx) => {
  const sample = `
1,2
`.trim();
  const parser = new Directive.Parser();
  parser.feed(sample);

  ctx.deepEqual(parser.next_cell(), [0, 1]);
});

test('Should process jump expression successfully', (ctx) => {
  const sample = `
->9, 1,2
`.trim();
  const parser = new Directive.Parser();
  parser.feed(sample);

  ctx.deepEqual(parser.next_cell(), [9, 1]);
});

test('Should process nested directive successfully', (ctx) => {
  const square = `
1,2,3,
1,  3,
1,2,3,
`.trim();
  const sample = `
-|square.2,
`.trim();

  const parser = new Directive.Parser();

  parser.register_directive('square', square);

  parser.feed(sample);

  ctx.deepEqual(parser.next_cell(), [0, 3]);
  ctx.deepEqual(parser.next_cell(), [0, 4]);
  ctx.deepEqual(parser.next_cell(), [0, 5]);
});
