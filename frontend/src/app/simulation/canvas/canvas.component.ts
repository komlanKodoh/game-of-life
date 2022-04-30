import { Ecosystem } from 'game-of-life-engine';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Directive from 'game-of-life-engine/build/main/lib/Configuration/directive';
import Renderer from './renderer';
import Runner from './Runner';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {
  runner = new Runner();
  engine: Ecosystem = new Ecosystem({
    rows: 100,
    columns: 100,
    // is_alive: (cell) => cell[0] % 5 === 0 && cell[1] % 7 === 0,
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
`.trim(),
    },
  });

  @ViewChild('canvas') canvas!: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    let directive: Directive = `
->26, -|ship.30,
->30, -|ships.35,

->26, -|ship.60,
->30, -|ships.65,

`.trim();

    this.engine.integrate_directive(directive);

    let renderer = new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    });

    renderer.render();

    this.runner.setAction(() => {
      this.engine.next();
    });

    new Runner(() => {
      renderer.render()
    }).start()

    
  }
}
