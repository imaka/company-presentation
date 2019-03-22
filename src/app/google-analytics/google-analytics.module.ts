import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleAnalyticsTrackClickEventDirective } from './google-analytics-track-click-event.directive';

@NgModule({
  declarations: [GoogleAnalyticsTrackClickEventDirective],
  imports: [CommonModule],
  exports: [GoogleAnalyticsTrackClickEventDirective]
})
export class GoogleAnalyticsModule {}
