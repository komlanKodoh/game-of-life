import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniverseCardComponent } from './universe-card/universe-card.component';



@NgModule({
  declarations: [
    UniverseCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UniverseCardComponent
  ]
})
export class ComponentsModule { }
