import { Ecosystem } from 'game-of-life-engine';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Directive from 'game-of-life-engine/build/main/lib/Configuration/directive';
import Renderer, { Bounds } from './renderer';
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
  });

  @ViewChild('canvas') canvas!: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    let directive: Directive = `
->26, -|ship.20,
->30, -|ships.45,
`.trim();

    this.engine.integrate_directive(directive);

    let renderer = new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    });

    let bounds: Bounds;

    renderer.on_select = ({ bounds: _bounds, done }) => {
      bounds = _bounds;
    };

    renderer.cell_rendering_directive = (cell, ctx) => {
      if (!bounds) {
        return false;
      }

      if (
        bounds.horizontal_low <= cell[0] &&
        cell[0] <= bounds.horizontal_high &&
        bounds.vertical_low <= cell[1] &&
        cell[1] <= bounds.vertical_high
      ) {
        return () => {
          ctx.strokeStyle = '#4eca6d';
          ctx.stroke();
        };
      }

      return false;
    };

    this.runner.setAction(() => {
      this.engine.next();
    });

    new Runner(() => {
      renderer.render();
    }).start();


  }
}
