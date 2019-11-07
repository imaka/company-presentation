import { Component, OnInit } from '@angular/core';
import { CmsService } from '../_services/cms.service';
import { Page } from '@models/page';

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.scss']
})
export class FooterContentComponent implements OnInit {
  public footerNavigation: Page[];
  public gdprText: string;
  public footerLogo: string;

  constructor(private cmsService: CmsService) {}

  ngOnInit() {
    this.cmsService.getMainPresets().subscribe(presets => {
      if (presets.gdprText) {
        this.gdprText = presets.gdprText;
      }
      if (presets.footerNavigation) {
        this.footerNavigation = presets.footerNavigation;
      }
      if (presets.footerLogo) {
        this.footerLogo = presets.footerLogo;
      }
    });
  }
}
