import test from 'ava';
import { Parser } from './directive';

test('Linear directive should work', (ctx) => {
  const test = `
1, 2,    3, 4, 5, 6,
`.trim();

  let parser = new Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 2);
  ctx.is(parser.next(), 3);
});


test('New line should be correctly parsed', (ctx) => {
  const test = `
1, 2,  3,
4, 5, 6,
`.trim();

  let parser = new Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 2);
  ctx.is(parser.next(), 3);
  ctx.is(parser.next(), "\n");
  ctx.is(parser.next(), 4);
});


test('Jump command should be correctly parsed', (ctx) => {
  const test = `
1, 2, 3,
->6, 4, 5, 6,
`.trim();

  let parser = new Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 2);
  ctx.is(parser.next(), 3);
  ctx.is(parser.next(), "\n");

  ctx.is(parser.next(), '->');
  ctx.is(parser.next(), 6)

  ctx.is(parser.next(), 4)
});

test('Should parse sever digit numbers', (ctx) => {
  const test = `
1, 25, 3,
4, 5600, 6,
`.trim();

  let parser = new Parser(test);

  ctx.is(parser.next(), 1);
  ctx.is(parser.next(), 25);
  ctx.is(parser.next(), 3);
  ctx.is(parser.next(), "\n");

  ctx.is(parser.next(), 4);
  ctx.is(parser.next(), 5600)
});