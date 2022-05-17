
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransversalGridComponent } from './transversal-grid/transversal-grid.component';
import { RangeComponent } from './range/range.component';
import { PauseRunComponent } from './pause-run/pause-run.component';
import { PopupComponent } from './popup/popup.component';



@NgModule({
  declarations: [
    TransversalGridComponent,
    RangeComponent,
    PauseRunComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    PauseRunComponent,
    PopupComponent,
  ]
})
export class ComponentsModule { }
