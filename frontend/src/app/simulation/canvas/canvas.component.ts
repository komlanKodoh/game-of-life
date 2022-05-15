import { Ecosystem, Renderer, Runner } from 'game-of-life-engine';
import { Component, ElementRef, ViewChild } from '@angular/core';

import Directive from 'game-of-life-engine/build/main/lib/Configuration/directive';
import { Bounds } from 'game-of-life-engine/build/main/lib/Renderer';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {
  runner = new Runner();
  renderer!: Renderer;

  engine: Ecosystem = new Ecosystem({
    rows: 50,
    columns: 80,
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
    ->26, -|ship.20,
    ->30, -|ships.45,
    `.trim(),
  });

  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('tempCanvas') tempCanvas!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.renderer = new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    });

    let bounds: Bounds;

    this.renderer.on_select = ({ bounds: _bounds, done }) => {
      bounds = _bounds;
    };

    this.renderer.cell_rendering_directive = (cell, ctx) => {
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
      this.renderer.render();
    }).start();
  }
}
