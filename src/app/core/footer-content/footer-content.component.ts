import { Component, OnInit } from '@angular/core';
import { CosmicService } from '../_services/cosmic.service';

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.scss']
})
export class FooterContentComponent implements OnInit {
  public footerNavigationID: string;
  public gdprInfo: string;

  constructor(private cosmicService: CosmicService) {}

  ngOnInit() {
    this.cosmicService.getMainPresets().subscribe(presets => {
      this.gdprInfo = presets.gdpr;

      if (presets.footerNavigation) {
        this.footerNavigationID = presets.footerNavigation._id;
      }
    });
  }
}
