import { GameOfLifeConfig, RenderConfig } from 'game-of-life-engine';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-simulation-brush-config',
  templateUrl: './simulation-brush-config.component.html',
  styleUrls: ['./simulation-brush-config.component.scss'],
})
export class SimulationBrushConfigComponent implements OnInit {
  @ViewChild('container') containerElement!: ElementRef;
  @ViewChild('settings') settingsElement!: ElementRef;
  @ViewChild('icon') iconElement!: ElementRef;

  @Output() SaveEvent = new EventEmitter<
    Exclude<RenderConfig['brush'], undefined>
  >();

  currentElement!: ElementRef;
  disabledStyle = 'opacity: 0; pointer-events: none;';
  enabledStyle = 'opacity: 1;  pointer-events: auto;';

  configurationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.configurationForm = formBuilder.group({
      size: 20,
      radius: 2,
      padding: 4,

      grid_line_color: '#0a0000',
      canvas_fill_color: '#0a0000',
      selection_color: '#32a0a8',
      cell_shader: '',
    });
  }

  ngAfterViewInit() {
    this.setCurrentElement(this.settingsElement);
  }

  toggle() {
    console.log(this.configurationForm.value);
    this.setCurrentElement(
      this.currentElement === this.settingsElement
        ? this.iconElement
        : this.settingsElement
    );
  }

  ngOnInit(): void {}

  setCurrentElement(element: ElementRef) {
    let boundingRect = element.nativeElement.getBoundingClientRect();
    let styles = window.getComputedStyle(element.nativeElement);

    Object.assign(this.containerElement.nativeElement.style, {
      ...this.getStyle(element),
      width: boundingRect.width + 'px',
      height: boundingRect.height + 'px',
      right: styles.getPropertyValue('right'),
      bottom: styles.getPropertyValue('bottom'),
    });

    this.currentElement = element;
  }

  getStyle(element: ElementRef) {
    if (element === this.settingsElement) {
      return {
        backgroundColor: 'hsla(0, 0%, 0%, 60%)',
      };
    } else if (element === this.iconElement) {
      return {
        backgroundColor: '#ebc034',
      };
    }

    return {};
  }

  isOpen(element: ElementRef) {
    return this.currentElement === element;
  }

  save() {
    this.SaveEvent.emit({
      ...this.configurationForm.value,
      cell_shader: (state: number) => {
        const color = `${state / 2} , ${state / 1.3} , ${state / 1.7}`;
        let fillStyle = `rgba( 15, 225, 95 , ${state / (255 * 1.5) + 0.2})`;

        if (state === 255) fillStyle = '#0ff55f';

        return fillStyle;
      },
    });
  }
}
