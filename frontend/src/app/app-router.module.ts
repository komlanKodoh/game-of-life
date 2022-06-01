import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './simulation/container/container.component';
import { AccountComponent } from './account/account.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent,
      },
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRouterModule {}
