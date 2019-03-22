import { Component, OnInit } from '@angular/core';
import { CosmicService, FaviconService } from './core';
import { GoogleAnalyticsService } from './google-analytics';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public footerNavigationID: string;

  constructor(
    private cosmicService: CosmicService,
    private titleService: Title,
    private faviconService: FaviconService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.getCosmicPresets();
  }

  private getCosmicPresets() {
    this.cosmicService.getMainPresets().subscribe(presets => {
      this.faviconService.setFavicon(presets.faviconUrl);
      this.titleService.setTitle(presets.companyName);

      if (presets.footerNavigation) {
        this.footerNavigationID = presets.footerNavigation._id;
      }

      if (environment.production && presets.trackingID) {
        this.googleAnalyticsService.initialize(presets.trackingID);
      }
    });
  }
}
