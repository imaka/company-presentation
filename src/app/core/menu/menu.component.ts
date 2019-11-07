import { Component, OnInit } from '@angular/core';
import { CmsService } from '../_services/cms.service';
import { Page } from '@models/page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public logo: string;
  public navigation: Page[];
  public title: string;
  public isMenuActive: Boolean = false;

  constructor(private cmsService: CmsService) {}

  ngOnInit() {
    this.cmsService.getMainPresets().subscribe(presets => {
      this.logo = presets.companyLogoUrl;
      this.navigation = presets.mainNavigation;
      this.title = presets.companyName;
    });
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
}
