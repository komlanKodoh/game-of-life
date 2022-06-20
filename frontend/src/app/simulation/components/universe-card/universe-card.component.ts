import { EcosystemRecord } from './../../../state/user/reducer';
import { fitDimension } from './../../../../utils/index';
import { createDimension } from './../../../../utils/Dimension';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  Ecosystem,
  Renderer,
  GameOfLifeConfig,
  DragListener,
} from 'game-of-life-engine';
import { computed } from 'mobx-angular';

@Component({
  selector: 'app-universe-card',
  templateUrl: './universe-card.component.html',
  styleUrls: ['./universe-card.component.scss'],
})
export class UniverseCardComponent implements OnInit {
  @Input() config!: EcosystemRecord;
  @Input() visible!: boolean;

  @Output() DropEvent = new EventEmitter<GameOfLifeConfig>();

  constructor() {}

  ngOnInit() {}

  @computed({}) get target() {
    return `/ecosystem/${this.config.name}`;
  }
}
