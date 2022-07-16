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
import { SimulationBrushConfigComponent } from './simulation-brush-config/simulation-brush-config.component';

@NgModule({
  declarations: [
    CanvasComponent,
    ContainerComponent,
    ConfigurationPanelComponent,
    SimulationBrushConfigComponent,
  ],
  imports: [
    AppRouterModule,
    SharedModule,
    CommonModule,
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
  ],

  exports: [
    CanvasComponent,
    ComponentsModule,
    ContainerComponent,
  ],
})
export class SimulationModule {}
