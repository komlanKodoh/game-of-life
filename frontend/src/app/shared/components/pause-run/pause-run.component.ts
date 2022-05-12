import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pause-run',
  templateUrl: './pause-run.component.html',
  styleUrls: ['./pause-run.component.scss']
})
export class PauseRunComponent implements OnInit {

  @Input() paused : boolean = true;
   
  constructor() { }

  ngOnInit(): void {
  }

}
