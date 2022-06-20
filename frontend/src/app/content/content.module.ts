import { SimulationModule } from './../simulation/simulation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { SharedModule } from '../shared/shared.module';
import { EcosystemEditComponent } from './ecosystem-edit/ecosystem-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EcosystemComponent, EcosystemEditComponent],
  imports: [
    SimulationModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class ContentModule {}
