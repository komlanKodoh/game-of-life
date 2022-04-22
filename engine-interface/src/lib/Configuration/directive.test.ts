import test from 'ava';

import Directive from './directive';

test('Linear directive should work', (ctx) => {
  const test = `
1, 2,    3, 4, 5, 6,
`.trim();

  const parser = new Directive.Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 2);
  ctx.is(parser.next(), 3);
});

test('New line should be correctly parsed', (ctx) => {
  const test = `
1, 2,  3,
4, 5, 6,
`.trim();

  const parser = new Directive.Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 2);
  ctx.is(parser.next(), 3);
  ctx.is(parser.next(), '\n');
  ctx.is(parser.next(), 4);
});

test('Jump command should be correctly parsed', (ctx) => {
  const test = `
1, 2, 3,
->6, 4, 5, 6,
`.trim();

  const parser = new Directive.Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 2);
  ctx.is(parser.next(), 3);
  ctx.is(parser.next(), '\n');

  ctx.is(parser.next(), '->');
  ctx.is(parser.next_chunk_before(',') as string, '6');

  ctx.is(parser.next(), 4);
});

test('Should parse sever digit numbers', (ctx) => {
  const test = `
1, 25, 3,
4, 5600, 6,
`.trim();

  const parser = new Directive.Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 25);
  ctx.is(parser.next(), 3);
  ctx.is(parser.next(), '\n');

  ctx.is(parser.next(), 4);
  ctx.is(parser.next(), 5600);
});

test('Composition command should be correctly parsed', (ctx) => {
  const test = `
1, 2, 3,
-|space_ship.500, 4, 5, 6,
`.trim();

  const parser = new Directive.Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 2);
  ctx.is(parser.next(), 3);
  ctx.is(parser.next(), '\n');

  ctx.is(parser.next(), '-|');
  ctx.is(parser.next_chunk_before(',') as string, 'space_ship.500');

  ctx.is(parser.next(), 4);
});
