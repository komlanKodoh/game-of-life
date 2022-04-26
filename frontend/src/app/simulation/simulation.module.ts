import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { ConfigurationPanelComponent } from './configuration-panel/configuration-panel.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [
    CanvasComponent,
    ConfigurationPanelComponent,
    ContainerComponent,
  ],
  imports: [CommonModule],
  exports: [CanvasComponent, ConfigurationPanelComponent, ContainerComponent],
})
export class SimulationModule {}
