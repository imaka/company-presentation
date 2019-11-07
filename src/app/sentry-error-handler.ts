import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { environment } from '@environments/environment';

export class SentryErrorHandler implements ErrorHandler {
  handleError(error) {
    Sentry.captureException(error.originalError || error);
  }
}

export function provideErrorHandler() {
  if (environment.production) {
    Sentry.init({
      dsn: environment.sentry_dsn
    });
    return new SentryErrorHandler();
  } else {
    return new ErrorHandler();
  }
}
