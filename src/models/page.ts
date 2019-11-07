import { ContentfulParser } from './utils/contentful-parser';

export class Page {
  _id: string;
  banner: string;
  content: string;
  handle: string;
  includeContactForm: boolean;
  includeTitleInBanner: boolean;
  related: Page[];
  showBanner: boolean;
  showTitle: boolean;
  slug: string;
  title: string;

  constructor(obj) {
    const sys = obj.sys;
    const fields = obj.fields;

    this._id = sys.id;
    this.banner = fields.banner ? ContentfulParser.getImageURL(fields.banner, 'progressive') : '';
    this.handle = fields.handle;
    this.content = ContentfulParser.parseRichText(fields.content);
    this.related = [];
    this.slug = fields.slug;
    this.title = fields.title;

    if (fields.relatedPages) {
      fields.relatedPages.map(page => this.related.push(new Page(page)));
    }

    // Different layout options
    this.includeTitleInBanner = fields.includeTitleInBanner;
    this.includeContactForm = fields.includeContactForm;
    this.showBanner = fields.showBanner;
    this.showTitle = fields.showTitle;
  }
}
