import { fitDimension } from './../../../../utils/index';
import { createDimension } from './../../../../utils/Dimension';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Ecosystem, Renderer, GameOfLifeConfig, DragListener } from 'game-of-life-engine';

@Component({
  selector: 'app-universe-card',
  templateUrl: './universe-card.component.html',
  styleUrls: ['./universe-card.component.scss'],
})
export class UniverseCardComponent implements OnInit {
  @Input() config!: GameOfLifeConfig;
  @Input() name!: string;

  @ViewChild('canvas') canvas!: ElementRef< HTMLCanvasElement > ;
  @ViewChild('container') container!: ElementRef;

  @Output() DropEvent = new EventEmitter<GameOfLifeConfig>(); 

  private engine!: Ecosystem;

  constructor() { };
  
  ngOnInit(): void {}
  
  ngAfterViewInit() {
    let containerDimension = this.container.nativeElement.getBoundingClientRect();
    let canvasDimension = fitDimension( createDimension(this.config.columns, this.config.rows) , containerDimension  );

    this.canvas.nativeElement.width = canvasDimension.width;
    this.canvas.nativeElement.height =  canvasDimension.height;

    if ( containerDimension.height === canvasDimension.height) this.canvas.nativeElement.style.height = "100%";
    else this.canvas.nativeElement.style.width = "100%";

    this.engine = new Ecosystem(this.config);

    new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    }).render();

    this.initDragBehavior();
  }

  initDragBehavior(){
    new DragListener(this.canvas.nativeElement, () => {
      console.log( "Dragging ")
    }).onDragEnd(() => {
      this.DropEvent.emit();
    });
    
  }
}
