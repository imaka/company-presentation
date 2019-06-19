import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, HttpErrorInterceptor, CosmicInterceptor } from './core';
import { SentryErrorHandler } from './sentry-error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CoreModule],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CosmicInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
