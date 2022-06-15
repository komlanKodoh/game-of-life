import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { ComponentsModule } from '../shared/components/components.module';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SingInComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder],
  exports: [LoginComponent, SingInComponent],
})
export class AccountModule {}
