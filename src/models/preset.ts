import { Page } from './page';
import { Navigation } from './navigation';
import { ContentfulParser } from './utils/contentful-parser';

export class Preset {
  _id: string;
  alternateFaviconUrl: string;
  companyName: string;
  companyLogoUrl: string;
  faviconUrl: string;
  footerLogo: string;
  footerNavigation: Page[];
  gdprText: string;
  homepage: Page;
  mainNavigation: Page[];
  maintenance: Boolean;
  notFoundContent: string;
  trackingID: string;

  constructor(obj) {
    const sys = obj.sys;
    const fields = obj.fields;

    this._id = sys.id;
    this.companyName = fields.companyName;
    this.companyLogoUrl = ContentfulParser.getImageURL(fields.companyLogo);
    this.faviconUrl = fields.favicon ? ContentfulParser.getImageURL(fields.favicon) : '';
    this.alternateFaviconUrl = fields.alternativeFavicon ? ContentfulParser.getImageURL(fields.alternativeFavicon) : '';
    this.footerLogo = fields.footerLogo ? ContentfulParser.getImageURL(fields.footerLogo) : '';
    this.footerNavigation = [];
    this.gdprText = ContentfulParser.parseRichText(fields.gdprText);
    this.homepage = new Page(fields.homepage);
    this.mainNavigation = [];
    this.maintenance = fields.maintenance;
    this.notFoundContent = ContentfulParser.parseRichText(fields.notFoundContent);
    this.trackingID = fields.trackingId ? fields.trackingId : '';

    fields.mainNavigation.map(page => this.mainNavigation.push(new Page(page)));

    if (fields.footerNavigation) {
      fields.footerNavigation.map(page => this.footerNavigation.push(new Page(page)));
    }
  }
}
