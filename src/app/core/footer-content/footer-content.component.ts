import { Component, OnInit } from '@angular/core';
import { CosmicService } from '../_services/cosmic.service';

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.scss']
})
export class FooterContentComponent implements OnInit {
  public footerNavigationID: string;
  public gdpr: {
    link: string;
    text: string;
    title: string;
  };

  constructor(private cosmicService: CosmicService) {}

  ngOnInit() {
    this.cosmicService.getMainPresets().subscribe(presets => {
      this.gdpr = {
        link: presets.gdprPage ? presets.gdprPage.slug : null,
        text: presets.gdprText ? presets.gdprText : null,
        title: presets.gdprPage ? presets.gdprPage.title : null
      };

      if (presets.footerNavigation) {
        this.footerNavigationID = presets.footerNavigation._id;
      }
    });
  }
}
