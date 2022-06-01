import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniverseCardComponent } from './universe-card/universe-card.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    UniverseCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    UniverseCardComponent
  ]
})

export class ComponentsModule { }
