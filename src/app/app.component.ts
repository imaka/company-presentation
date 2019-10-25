import { Component, OnInit } from '@angular/core';
import { CmsService, FaviconService } from './core';
import { AnalyticsService } from './ng-simple-analytics';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private cmsService: CmsService,
    private titleService: Title,
    private faviconService: FaviconService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.getContentfulPresets();
  }

  private getContentfulPresets() {
    this.cmsService.getMainPresets().subscribe(presets => {
      this.faviconService.setFavicon(presets.faviconUrl);
      this.titleService.setTitle(presets.companyName);

      if (environment.production && presets.trackingID) {
        this.analyticsService.initialize(presets.trackingID);
      }
    });
  }
}
