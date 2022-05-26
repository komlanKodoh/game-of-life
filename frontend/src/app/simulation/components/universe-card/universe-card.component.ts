import { fitDimension } from './../../../../utils/index';
import { createDimension } from './../../../../utils/Dimension';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Ecosystem, Renderer } from 'game-of-life-engine';
import { GameOfLifeConfig } from 'game-of-life-engine/build/main/lib/Configuration/game-of-life-config.type';

@Component({
  selector: 'app-universe-card',
  templateUrl: './universe-card.component.html',
  styleUrls: ['./universe-card.component.scss'],
})
export class UniverseCardComponent implements OnInit {
  @Input() config!: GameOfLifeConfig;
  @Input() name!: string;

  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  private engine!: Ecosystem;

  constructor() {

    
  }
  
  ngOnInit(): void {}
  
  ngAfterViewInit() {

    console.log ( this.config )
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

    

  }
}
