import Ecosystem  from './lib/ecosystem';


let directive = `
1,2,
`.trim();

let ecosystem = new Ecosystem( 4, 1);

ecosystem.add( directive );

console.log( ecosystem . state )