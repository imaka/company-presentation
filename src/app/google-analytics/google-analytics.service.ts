import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var ga: Function;

/**
 * A service to send events to Google Analytics.
 */
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor(private router: Router) {}

  private initialized: Boolean = false;
  private middleRoute = 'external-redirect';

  /** Sets the UA and subscribes to the router to send pageviews */
  initialize(ua: string, middleRoute?: string) {
    ga('create', ua, 'auto');

    if (middleRoute) {
      this.middleRoute = middleRoute;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url.indexOf(this.middleRoute) === -1) {
        ga('set', 'page', event.url);
        ga('send', 'pageview');
        console.log(`pageview sent: ${event.url}`);
      }
    });

    this.initialized = true;
  }

  /** Returns true if UA has been set */
  isInitialized() {
    return this.initialized;
  }

  getMiddleRoute() {
    return this.middleRoute;
  }

  /** Sends an event */
  trackEvent(category: string, action: string, label: string, value: string) {
    ga('send', 'event', category, action, label, value);

    console.log(`event sent: ${value}`);
  }
}
