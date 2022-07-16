import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusComponent } from './plus/plus.component';
import { MinusComponent } from './minus/minus.component';
import { BackwardComponent } from './backward/backward.component';
import { ForwardComponent } from './forward/forward.component';
import { PauseRunComponent } from '../components/pause-run/pause-run.component';
import { MenuComponent } from './menu/menu.component';
import { MoreComponent } from './more/more.component';
import { ExpendComponent } from './expend/expend.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    PlusComponent,
    MinusComponent,
    BackwardComponent,
    ForwardComponent,
    MenuComponent,
    MoreComponent,
    ExpendComponent,
    LoadingIndicatorComponent,
    SettingsComponent,
  ],
  imports: [CommonModule],
  exports: [
    SettingsComponent,
    PlusComponent,
    MinusComponent,
    BackwardComponent,
    ForwardComponent,
    MenuComponent,
    MoreComponent,
    ExpendComponent,
    LoadingIndicatorComponent
  ],
})
export class IconsModule {}
