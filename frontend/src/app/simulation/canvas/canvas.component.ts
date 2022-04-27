import { Ecosystem } from 'game-of-life-engine';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Directive from 'game-of-life-engine/build/main/lib/Configuration/directive';
import Renderer from './renderer';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {
  engine: Ecosystem = new Ecosystem({
    rows: 90,
    columns: 90,
    // is_alive: (cell) => (cell[0] * cell[1]) % 11 === 0, 
    directives: {
      square: `
0, 1,  2,
0,     2,
0, 1,  2,
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
`.trim()
    },
  });

  @ViewChild('canvas') canvas!: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    let directive: Directive = `
->26, -|ship.30,
->30, -|ships.35,

->60, -|ships.35,
->80, -|ships.15,

->0, -|ship.35,

->80, -|ship.80,
`.trim();

    this.engine.integrate_directive(directive);

    let renderer = new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    });

    renderer.render();
    this.engine.next();


    const render = () => {
      renderer.render();
      this.engine.next();
      // console.log ( this.engine.state )
      requestAnimationFrame ( render )
    }

    requestAnimationFrame(render)


  }
}
