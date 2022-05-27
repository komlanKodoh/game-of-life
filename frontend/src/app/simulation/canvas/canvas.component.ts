import {
  Bounds,
  Directive,
  Ecosystem,
  Renderer,
  Runner,
  Serializer,
} from 'game-of-life-engine';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { configuration } from './config';
import { AreaSelectionEvent } from './type';
import { Store } from '@ngrx/store';
import { AppState } from '../state/clipboard/reducer';
import { toggle } from '../state/panel/actions';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {
  runner = new Runner();
  renderer!: Renderer;

  engine: Ecosystem = new Ecosystem(configuration);

  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('tempCanvas') tempCanvas!: ElementRef;

  @Output() AreaSelectionEvent = new EventEmitter<AreaSelectionEvent>();

  ngAfterViewInit(): void {
    this.renderer = new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    });


    let bounds: Bounds | null = null ;

    this.canvas.nativeElement.addEventListener("mousedown", () => {
      bounds = null;
    })

    this.renderer.on_select = ({ bounds: _bounds, done }) => {
      bounds = _bounds;

      this.AreaSelectionEvent.emit({
        columns: bounds.right - bounds.left + 1,
        rows: bounds.bottom - bounds.top + 1,

        directive_composition: Serializer.generate_string_directive(
          this.engine,
          bounds
        ),
      });
    };

    this.renderer.bind_all();

    this.renderer.cell_rendering_directive = (cell, ctx) => {
      if (!bounds) {
        return false;
      }

      if (
        bounds.top <= cell[0] &&
        cell[0] <= bounds.bottom &&
        bounds.left <= cell[1] &&
        cell[1] <= bounds.right
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

  constructor(private store: Store<AppState>) {};

  toggle(){
    this.store.dispatch(toggle())
  }

}
