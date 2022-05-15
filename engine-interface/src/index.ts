import Ecosystem from './lib/Ecosystem';
import Renderer from './lib/Renderer';
import Runner from './lib/Runner';

export { Ecosystem, Runner, Renderer };


const ecosystem = new Ecosystem({rows: 10, columns: 10});

console.log( ecosystem )