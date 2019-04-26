import { Page } from './page';
import { Navigation } from './navigation';

export class Preset {
  _id: string;
  companyName: string;
  companyLogoUrl: string;
  faviconUrl: string;
  footerLogo: string;
  footerNavigation: Navigation;
  gdprText: string;
  gdprPage: Page;
  homepage: Page;
  mainNavigation: Navigation;
  slug: string;
  title: string;
  trackingID: string;

  constructor(obj) {
    this._id = obj._id;
    this.companyName = obj.metadata.company_name;
    this.companyLogoUrl = obj.metadata.company_logo ? obj.metadata.company_logo.url : '';
    this.faviconUrl = obj.metadata.favicon ? obj.metadata.favicon.url : '';
    this.gdprText = obj.metadata.gdpr_text ? obj.metadata.gdpr_text : '';
    this.homepage = new Page(obj.metadata.homepage);
    this.mainNavigation = new Navigation(obj.metadata.main_navigation);
    this.slug = obj.slug;
    this.title = obj.title;
    this.trackingID = obj.metadata.tracking_id ? obj.metadata.tracking_id : '';

    if (obj.metadata.footer_navigation) {
      this.footerNavigation = new Navigation(obj.metadata.footer_navigation);
    }
    if (obj.metadata.gdpr_page) {
      this.gdprPage = new Page(obj.metadata.gdpr_page);
    }
    if (obj.metadata.footer_logo) {
      this.footerLogo = obj.metadata.footer_logo.url;
    }
  }
}