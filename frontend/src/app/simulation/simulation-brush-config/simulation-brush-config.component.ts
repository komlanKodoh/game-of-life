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
import { toRGB } from 'src/utils';

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
      live_cell_color: "#0ff55f",
      dead_cell_color: "#79f2b6",

      canvas_fill_color: '#1f1f1f',
      selection_color: '#32a0a8',
      cell_shader: '',
    });
  }

  ngAfterViewInit() {
    this.setCurrentElement(this.iconElement);

    // Setting time out so the following command is executed after its parent initialization;
    setTimeout( () =>  this.save(), 0);
  }


  toggle() {
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
    let live_cell_color = this.configurationForm.value.live_cell_color;
    let rgb = toRGB(this.configurationForm.value.dead_cell_color);

    this.SaveEvent.emit({
      ...this.configurationForm.value,
      cell_shader: (state: number) => {
        let fillStyle = `rgba( ${rgb.red}, ${rgb.green}, ${rgb.blue} , ${state /  (255 * 3) })`;

      
        if (state === 255) fillStyle = live_cell_color ;

        return fillStyle;
      },
    });
  }
}
