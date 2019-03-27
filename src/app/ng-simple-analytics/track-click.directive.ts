import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './analytics.service';

@Directive({
  selector: 'a[appNgSimpleAnalyticsTrackClick]'
})
export class TrackClickDirective {
  constructor(private el: ElementRef, private router: Router, private analyticsService: AnalyticsService) {}

  // tslint:disable-next-line:no-input-rename
  @Input('appNgSimpleAnalyticsTrackClick') eventArguments: any[];

  @HostListener('click', ['$event'])
  clicked(event: Event) {
    if (!this.eventArguments) {
      return;
    }

    if (this.analyticsService.isInitialized()) {
      this.analyticsService.trackEvent(this.eventArguments);
    }
  }

  @HostListener('contextmenu', ['$event'])
  contextmenuopened(event: Event) {
    // do something
  }
}
