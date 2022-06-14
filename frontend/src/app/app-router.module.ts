import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './simulation/container/container.component';
import { LoginComponent } from './account/login/login.component';
import { SingInComponent } from './account/sing-in/sing-in.component';
import { EcosystemComponent } from './content/ecosystem/ecosystem.component';


const appRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: "sign-in",
        component: SingInComponent
      },
      {
        path: "ecosystem/:name",
        component: EcosystemComponent
      }
    ],
  },

];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRouterModule {}
