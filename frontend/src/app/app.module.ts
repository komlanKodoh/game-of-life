import { AuthInterceptor } from './account/auth.interceptor';
import { StoreEffects, StoreRoot } from './state/index';

import { AppRouterModule } from './app-router.module';
import { SimulationModule } from './simulation/simulation.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContentModule } from './content/content.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    ContentModule,
    BrowserModule,
    AccountModule,
    ScullyLibModule,
    AppRouterModule,
    HttpClientModule,
    SimulationModule,
    StoreModule.forRoot(StoreRoot),
    EffectsModule.forRoot(StoreEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  exports: [RouterModule],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
