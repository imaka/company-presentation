import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
declare var ga: Function;

/**
 * A service to send events to Google Analytics.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private router: Router) {}

  private initialized: Boolean = false;

  /** Sets the UA and subscribes to the router to send pageviews */
  initialize(ua: string) {
    ga('create', ua, 'auto');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.url);
        ga('send', 'pageview');
      }
    });

    this.initialized = true;
  }

  /** Returns true if UA has been set */
  isInitialized() {
    return this.initialized;
  }

  /** Sends an event */
  trackEvent(args) {
    ga('send', 'event', ...args);
  }
}
