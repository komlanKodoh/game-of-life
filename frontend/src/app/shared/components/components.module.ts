import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransversalGridComponent } from './transversal-grid/transversal-grid.component';
import { RangeComponent } from './range/range.component';
import { PauseRunComponent } from './pause-run/pause-run.component';
import { PopupComponent } from './popup/popup.component';
import { OverlayComponent } from './overlay/overlay.component';
import { MousePopupComponent } from './mouse-popup/mouse-popup.component';
import { ScrollComponent } from './scroll/scroll.component';

@NgModule({
  declarations: [
    TransversalGridComponent,
    RangeComponent,
    PauseRunComponent,
    PopupComponent,
    OverlayComponent,
    MousePopupComponent,
    ScrollComponent,
  ],
  imports: [CommonModule],
  exports: [
    PauseRunComponent,
    PopupComponent,
    OverlayComponent,
    MousePopupComponent,
    ScrollComponent,
  ],
})
export class ComponentsModule {}
