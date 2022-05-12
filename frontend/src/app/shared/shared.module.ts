import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { IconsModule } from './icons/icons.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ComponentsModule,
    IconsModule
  ]
})
export class SharedModule { }
