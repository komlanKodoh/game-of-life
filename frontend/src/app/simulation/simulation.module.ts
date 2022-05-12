import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { ConfigurationPanelComponent } from './configuration-panel/configuration-panel.component';
import { ContainerComponent } from './container/container.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { panelReducer } from './state/panel/reducer';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CanvasComponent,
    ContainerComponent,
    ConfigurationPanelComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ panel: panelReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],

  exports: [CanvasComponent, ConfigurationPanelComponent, ContainerComponent],
})
export class SimulationModule {}
