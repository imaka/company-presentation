import { Component, OnInit } from '@angular/core';
import { CmsService } from './core';
import { AnalyticsService } from './ng-simple-analytics';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private cmsService: CmsService,
    private titleService: Title,
    private faviconService: AngularFaviconService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.getContentfulPresets();
  }

  private getContentfulPresets() {
    this.cmsService.getMainPresets().subscribe(presets => {
      this.titleService.setTitle(presets.companyName);

      if (presets.faviconUrl && presets.alternateFaviconUrl) {
        this.faviconService.setFavicon(presets.faviconUrl, presets.alternateFaviconUrl);
      } else if (presets.faviconUrl) {
        this.faviconService.setFavicon(presets.faviconUrl);
      }

      if (environment.production && presets.trackingID) {
        this.analyticsService.initialize(presets.trackingID);
      }
    });
  }
}
