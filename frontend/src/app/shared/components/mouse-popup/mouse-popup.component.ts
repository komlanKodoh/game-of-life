import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import Mouse from 'src/utils/Mouse';

@Component({
  selector: 'app-mouse-popup',
  templateUrl: './mouse-popup.component.html',
  styleUrls: ['./mouse-popup.component.scss'],
})
export class MousePopupComponent implements OnInit {
  @Input('isVisible') isVisible = false;
  popupStyle = 'transform: translate( 0px, 0px) ; opacity: 0; ';
  canvasPopupConfig = {
    left: 'transform: translate( -100% , 0px) ;',
    top: 'transform: translate( 0px, -100% ) ;',
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    
    this.popupStyle = `transform : translate(${Mouse.x}px, ${Mouse.y}px); opacity: 1;`;
  }
}
