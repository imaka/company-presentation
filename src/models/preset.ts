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
  homepage: Page;
  mainNavigation: Navigation;
  notFoundContent: string;
  slug: string;
  title: string;
  trackingID: string;

  constructor(obj) {
    this._id = obj._id;
    this.companyName = obj.metadata.company_name;
    this.companyLogoUrl = obj.metadata.company_logo ? obj.metadata.company_logo.url : '';
    this.faviconUrl = obj.metadata.favicon ? obj.metadata.favicon.url : '';
    this.footerLogo = obj.metadata.footer_logo ? obj.metadata.footer_logo.url : '';
    this.footerNavigation = obj.metadata.footer_navigation ? new Navigation(obj.metadata.footer_navigation) : null;
    this.gdprText = obj.metadata.gdpr_text ? obj.metadata.gdpr_text : '';
    this.homepage = new Page(obj.metadata.homepage);
    this.mainNavigation = new Navigation(obj.metadata.main_navigation);
    this.notFoundContent = obj.metadata.not_found_content ? obj.metadata.not_found_content : '';
    this.slug = obj.slug;
    this.title = obj.title;
    this.trackingID = obj.metadata.tracking_id ? obj.metadata.tracking_id : '';
  }
}
