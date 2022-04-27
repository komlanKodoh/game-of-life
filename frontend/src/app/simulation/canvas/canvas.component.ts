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
  engine: Ecosystem = new Ecosystem(4, 4);

  @ViewChild('canvas') canvas!: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    let directive: Directive = `
 5, 7,

     5, 7,
`.trim();

    this.engine.add(directive);

    let renderer = new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    });

    setInterval(() => {
      renderer.render();
      this.engine.next();
    }, 100)
  }
}
