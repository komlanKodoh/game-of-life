
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransversalGridComponent } from './transversal-grid/transversal-grid.component';
import { RangeComponent } from './range/range.component';
import { PauseRunComponent } from './pause-run/pause-run.component';



@NgModule({
  declarations: [
    TransversalGridComponent,
    RangeComponent,
    PauseRunComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    PauseRunComponent
  ]
})
export class ComponentsModule { }
