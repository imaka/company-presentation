import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from './google-analytics.service';

@Directive({
  selector: 'a[appGaTrackClickEvent]'
})
export class GoogleAnalyticsTrackClickEventDirective {
  constructor(private el: ElementRef, private router: Router, private googleAnalyticsService: GoogleAnalyticsService) {}

  @HostListener('click', ['$event'])
  clicked(event: Event) {
    const url = this.el.nativeElement.href;
    if (!url) {
      return;
    }

    if (this.googleAnalyticsService.isInitialized()) {
      this.googleAnalyticsService.trackEvent('Link', 'Click', 'External', url);
    }

    this.router.navigate([`/${this.googleAnalyticsService.getMiddleRoute}`, { externalUrl: url }], {
      skipLocationChange: true
    });

    event.preventDefault();
  }
}
