import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { IconsModule } from './icons/icons.module';
import { MaterialModule } from "./material/material.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MaterialModule,
    ComponentsModule,
    IconsModule,
  ]
})
export class SharedModule { }
