import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../_services/contentful.service';
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

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService.getMainPresets().subscribe(presets => {
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
