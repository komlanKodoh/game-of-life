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
  private engine!: Ecosystem;

  constructor() {

    
  }
  
  ngOnInit(): void {}
  
  ngAfterViewInit() {
    console.log ( this.config )
    this.engine = new Ecosystem(this.config);

    new Renderer({
      canvas: this.canvas.nativeElement,
      engine: this.engine,
    }).render();


  }
}
