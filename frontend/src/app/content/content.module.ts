import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    EcosystemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ContentModule { }
