import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './analytics.service';

@Directive({
  selector: 'a[appNgSimpleAnalyticsTrackClick]'
})
export class TrackClickDirective {
  constructor(private el: ElementRef, private router: Router, private analyticsService: AnalyticsService) {}

  @HostListener('click', ['$event'])
  clicked(event: Event) {
    event.preventDefault();
    const url = this.el.nativeElement.href;
    if (!url) {
      return;
    }

    if (this.analyticsService.isInitialized()) {
      this.analyticsService.trackEvent('Google Link', 'Click', 'External', url);
    }

    window.open(url, '_blank');
  }

  @HostListener('contextmenu', ['$event'])
  contextmenuopened(event: Event) {
    // do something
  }
}
