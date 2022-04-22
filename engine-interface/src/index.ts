import Ecosystem  from './lib/ecosystem';


let directive = `
1,2,6,6,
->56, 2, 56, 89,
-> 10,  56, 12
`.trim();

let ecosystem = new Ecosystem( 25, 25);

ecosystem.add( directive );