export const configuration = {
  rows: 100,
  columns: 100,
  // is_alive: (cell) => cell[1] % 7 === 0,
  directives: {
    circle: `
1,2,
0,3,
0,3,
1,2,
`.trim(),
    square: `
0,1,
0,1,
`.trim(),
    ship: `
2,
3,
1,2,3,
`.trim(),
    ships: `
      2,
      1,
      1,2,3
`.trim(),
  },
  directive_composition: `
    ->50, -|ship.30,
    ->54, -|ships.55,
    `.trim(),
};
