import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './analytics.service';

@Directive({
  selector: '[appNgSimpleAnalyticsTrackStandardEvent]'
})
export class TrackStandardEventDirective {
  constructor(private el: ElementRef, private router: Router, private analyticsService: AnalyticsService) {}

  // tslint:disable-next-line:no-input-rename
  @Input('appNgSimpleAnalyticsTrackStandardEvent') eventArguments: string;

  @HostListener('click', ['$event'])
  clicked(event: MouseEvent) {
    if (!this.eventArguments) {
      return;
    }

    if (this.analyticsService.isInitialized()) {
      this.analyticsService.trackEvent([this.eventArguments]);
    }
  }
}
