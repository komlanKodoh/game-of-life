import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ScrollComponent implements OnInit {

  @Input() className!: string;
  @Input() threshold !: number;
  @ViewChild('container') container!: ElementRef;
  @Output() ThresholdReachedEvent = new EventEmitter();

  emitted = false;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){

    this.container.nativeElement.addEventListener("scroll", ( e : Event ) => {
      if ( !e.target) return;

      const container = this.container.nativeElement;
      const invisibleHeight = container.scrollHeight - container.scrollTop - container.clientHeight;

      if( invisibleHeight < this.threshold && this.emitted === false  ){
        this.ThresholdReachedEvent.emit();
        this.emitted = true;
      } 

      if ( invisibleHeight > this.threshold  ) this.emitted = false;

    })
  }

}
