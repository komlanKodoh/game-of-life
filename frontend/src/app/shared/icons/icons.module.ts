import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusComponent } from './plus/plus.component';
import { MinusComponent } from './minus/minus.component';
import { BackwardComponent } from './backward/backward.component';
import { ForwardComponent } from './forward/forward.component';
import { PauseRunComponent } from '../components/pause-run/pause-run.component';

@NgModule({
  declarations: [PlusComponent, MinusComponent, BackwardComponent, ForwardComponent],
  imports: [CommonModule],
  exports: [PlusComponent, MinusComponent, BackwardComponent, ForwardComponent],
})
export class IconsModule {}
