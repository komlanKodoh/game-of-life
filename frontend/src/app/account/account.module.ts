import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule],

  exports: [AccountComponent],
})
export class AccountModule {}
