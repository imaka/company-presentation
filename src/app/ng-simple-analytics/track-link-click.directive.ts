import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './analytics.service';

@Directive({
  selector: 'a[appNgSimpleAnalyticsTrackLinkClick]'
})
export class TrackLinkClickDirective {
  constructor(private el: ElementRef, private router: Router, private analyticsService: AnalyticsService) {}

  // tslint:disable-next-line:no-input-rename
  @Input('appNgSimpleAnalyticsTrackLinkClick') eventArguments: string;

  @HostListener('mousedown', ['$event'])
  linkclicked(event: MouseEvent) {
    if (!this.eventArguments) {
      return;
    }

    if (this.analyticsService.isInitialized()) {
      this.analyticsService.trackEvent(['Link', 'Click', this.eventArguments, event.button]);
    }
  }
}
