import { Component, OnInit } from '@angular/core';
import { Location} from "@angular/common"

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  handleClick(){
    this._location.back();
  }
  handleNestedClick(e: Event){
    e.stopPropagation();
  }

}
