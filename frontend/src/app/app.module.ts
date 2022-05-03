import { SimulationModule } from './simulation/simulation.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './simulation/container/container.component';

const appRoutes: Routes = [{ path: '', component: ContainerComponent }];

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    SimulationModule,
    ScullyLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
