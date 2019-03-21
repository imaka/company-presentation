import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleAnalyticsRoutingModule } from './google-analytics-routing.module';
import { GoogleAnalyticsTrackClickEventDirective } from './google-analytics-track-click-event.directive';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [GoogleAnalyticsTrackClickEventDirective, NotFoundComponent],
  imports: [CommonModule, GoogleAnalyticsRoutingModule],
  exports: [GoogleAnalyticsTrackClickEventDirective]
})
export class GoogleAnalyticsModule {}
