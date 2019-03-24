import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackClickDirective } from './track-click.directive';

@NgModule({
  declarations: [TrackClickDirective],
  imports: [CommonModule],
  exports: [TrackClickDirective]
})
export class NgSimpleAnalyticsModule {}
