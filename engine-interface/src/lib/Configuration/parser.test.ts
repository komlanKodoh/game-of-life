import test from 'ava';
import Directive from './directive';

test('Parser should produce correct cells', (ctx) => {
  let sample = `
1,2
`.trim();
  let parser = new Directive.Parser();
  parser.feed(sample);

  ctx.deepEqual(parser.next_cell(), [0, 1]);
});

test('Should process jump expression successfully', (ctx) => {
  let sample = `
->9, 1,2
`.trim();
  let parser = new Directive.Parser();
  parser.feed(sample);

  ctx.deepEqual(parser.next_cell(), [9, 1]);
});

test('Should process nested directive successfully', (ctx) => {
  let square = `
1,2,3,
1,  3,
1,2,3,
`.trim();
  let sample = `
-|square.2,
`.trim();

  let parser = new Directive.Parser();

  parser.register_directive('square', square);

  parser.feed(sample);

  ctx.deepEqual(parser.next_cell(), [0, 3]);
  ctx.deepEqual(parser.next_cell(), [0, 4]);
  ctx.deepEqual(parser.next_cell(), [0, 5]);
});
