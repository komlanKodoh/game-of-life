import {
  Bounds,
  Runner,
  Renderer,
  Ecosystem,
  Serializer,
  GameOfLifeConfig,
} from 'game-of-life-engine';
import {
  Output,
  ViewChild,
  Component,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import Channel from './Channel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state';
import { configuration } from './config';
import { togglePanel } from '../../state/simulation/panel/actions';

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

  @Output() InitializationEvent = new EventEmitter<{ channel: Channel }>();

  optionPromptIsVisible = false;
  tempSelection: GameOfLifeConfig | null = null;

  channel = new Channel();

  ngAfterViewInit(): void {
    window.addEventListener('mouseup', () => {
      this.optionPromptIsVisible = false;
    });

    this.InitializationEvent.emit({ channel: this.channel });
    this.initChanelCommunication();

    this.renderer = new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    });

    let bounds: Bounds | null = null;

    this.canvas.nativeElement.addEventListener('mousedown', () => {
      bounds = null;
    });

    this.renderer.on_select = ({ bounds: _bounds, done }) => {
      bounds = _bounds;

      this.optionPromptIsVisible = true;

      this.tempSelection = {
        columns: bounds.right - bounds.left + 1,
        rows: bounds.bottom - bounds.top + 1,

        directive_composition: Serializer.generate_string_directive(
          this.engine,
          bounds
        ),
      };
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

  saveCurrentSelection() {
    if (this.tempSelection)
      this.channel.diffuse({
        name: 'save-as-component',
        component: this.tempSelection,
      });

      console.log(this.tempSelection)
  }

  constructor(private store: Store<AppState>) {}

  toggle() {
    this.store.dispatch(togglePanel());
  }

  initChanelCommunication() {
    this.channel.registerListener(['paste-component'], (event) => {
      if (!event.component?.directive_composition) return;

      const cell = this.renderer.get_hovered_cell();

      if (!cell) return;

      this.engine.register_directive(
        'temp',
        event.component?.directive_composition
      );

      this.engine.integrate_directive(`->${cell[0]}, -|temp.${cell[1]},`);
    });
  }

  zoom() {
    this.renderer.zoom(-200, false);
  }

  unZoom() {
    this.renderer.zoom(200, false);
  }
}
