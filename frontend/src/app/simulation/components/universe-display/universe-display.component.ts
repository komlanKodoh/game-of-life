import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { GameOfLifeConfig, Ecosystem, Renderer, DragListener } from 'game-of-life-engine';
import { computed } from 'mobx';
import { EcosystemRecord } from 'src/app/state/user/reducer';
import { fitDimension } from 'src/utils';
import { createDimension } from 'src/utils/Dimension';

@Component({
  selector: 'app-universe-display',
  templateUrl: './universe-display.component.html',
  styleUrls: ['./universe-display.component.scss']
})
export class UniverseDisplayComponent implements OnInit {

  @Input() config!: EcosystemRecord;
  @Input() visible!: boolean;
  @Input() ratio!: number;
  
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') container!: ElementRef;
  
  @Output() DropEvent = new EventEmitter<GameOfLifeConfig>();

  private engine!: Ecosystem;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges ){
    if ( changes["visible"] && changes["visible"].currentValue === true ){
      setTimeout(() => {
        this.renderEcosystem()
      }, 100 )
    };
  }

  ngOnInit(): void {}

  renderEcosystem() {
    if ( ! this.container ) return;

    let containerDimension =
      this.container.nativeElement.getBoundingClientRect();
      
    let canvasDimension = fitDimension(
      createDimension(this.config.columns, this.config.rows),
      containerDimension
    );

    this.canvas.nativeElement.width = canvasDimension.width;
    this.canvas.nativeElement.height = canvasDimension.height;

    if (containerDimension.height === canvasDimension.height)
      this.canvas.nativeElement.style.height = '100%';
    else this.canvas.nativeElement.style.width = '100%';

    this.engine = new Ecosystem(this.config);

    new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    }).render();

    this.initDragBehavior();
  }

  initDragBehavior() {
    new DragListener(this.canvas.nativeElement, () => {}).onDragEnd(() => {
      this.DropEvent.emit();
    });
  }

  @computed({}) get target(){
    return `/ecosystem/${this.config.name}`;
  }

  @computed({}) get style(){
    return `padding-top: ${this.ratio}%;`
  }
}
