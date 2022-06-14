import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { ConfigurationPanelComponent } from './configuration-panel/configuration-panel.component';
import { ContainerComponent } from './container/container.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { AppRouterModule } from '../app-router.module';


@NgModule({
  declarations: [
    CanvasComponent,
    ContainerComponent,
    ConfigurationPanelComponent,
  ],
  imports: [
    AppRouterModule,
    SharedModule,
    CommonModule,
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
  ],

  exports: [CanvasComponent, ConfigurationPanelComponent, ContainerComponent],
})
export class SimulationModule {}
