import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniverseCardComponent } from './universe-card/universe-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UniverseDisplayComponent } from './universe-display/universe-display.component';



@NgModule({
  declarations: [
    UniverseCardComponent,
    UniverseDisplayComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    UniverseCardComponent,
    UniverseDisplayComponent,
  ]
})

export class ComponentsModule { }
