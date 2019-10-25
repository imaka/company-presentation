import { Page } from './page';
import { Navigation } from './navigation';
import { ParseUtils } from './parse-utils';

export class Preset {
  _id: string;
  companyName: string;
  companyLogoUrl: string;
  faviconUrl: string;
  footerLogo: string;
  footerNavigation: Page[];
  gdprText: string;
  homepage: Page;
  mainNavigation: Page[];
  notFoundContent: string;
  trackingID: string;

  constructor(obj) {
    const sys = obj.sys;
    const fields = obj.fields;

    this._id = sys.id;
    this.companyName = fields.companyName;
    this.companyLogoUrl = ParseUtils.getImageURL(fields.companyLogo);
    this.faviconUrl = ParseUtils.getImageURL(fields.favicon);
    this.footerLogo = fields.footerLogo ? ParseUtils.getImageURL(fields.footerLogo) : '';
    this.footerNavigation = [];
    this.gdprText = ParseUtils.parseRichText(fields.gdprText);
    this.homepage = new Page(fields.homepage);
    this.mainNavigation = [];
    this.notFoundContent = ParseUtils.parseRichText(fields.notFoundContent);
    this.trackingID = fields.trackingId ? fields.trackingId : '';

    fields.mainNavigation.map(page => this.mainNavigation.push(new Page(page)));

    if (fields.footerNavigation) {
      fields.footerNavigation.map(page => this.footerNavigation.push(new Page(page)));
    }
  }
}
