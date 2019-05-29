import { Component, OnInit } from '@angular/core';
import { CosmicService } from '../_services/cosmic.service';

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.scss']
})
export class FooterContentComponent implements OnInit {
  public footerNavigationID: string;
  public gdprText: string;
  public footerLogo: string;

  constructor(private cosmicService: CosmicService) {}

  ngOnInit() {
    this.cosmicService.getMainPresets().subscribe(presets => {
      if (presets.gdprText) {
        this.gdprText = presets.gdprText;
      }
      if (presets.footerNavigation) {
        this.footerNavigationID = presets.footerNavigation._id;
      }
      if (presets.footerLogo) {
        this.footerLogo = presets.footerLogo;
      }
    });
  }
}
