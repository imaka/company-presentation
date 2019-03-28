import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackLinkClickDirective } from './track-link-click.directive';
import { TrackStandardEventDirective } from './track-standard-event.directive';

@NgModule({
  declarations: [TrackLinkClickDirective, TrackStandardEventDirective],
  imports: [CommonModule],
  exports: [TrackLinkClickDirective, TrackStandardEventDirective]
})
export class NgSimpleAnalyticsModule {}
