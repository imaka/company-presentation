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

  private SHOW_BANNER = 'Show banner';
  private SHOW_TITLE = 'Show title';
  private INCLUDE_TITLE_IN_BANNER = 'Include title in banner';
  private INCLUDE_CONTACT_FORM = 'Include contact form';

  constructor(obj) {
    this._id = obj._id;
    this.banner = '';
    this.handle = obj.handle;
    this.content = obj.content;
    this.related = [];
    this.slug = obj.slug;
    this.title = obj.title;

    if (obj.metadata) {
      if (obj.metadata.related_pages) {
        obj.metadata.related_pages.map(page => this.related.push(new Page(page)));
      }
      if (obj.metadata.banner) {
        this.banner = obj.metadata.banner.url;
      }
      if (obj.metadata.layout_options) {
        this.showBanner = obj.metadata.layout_options.indexOf(this.SHOW_BANNER) !== -1;
        this.showTitle = obj.metadata.layout_options.indexOf(this.SHOW_TITLE) !== -1;
        this.includeTitleInBanner = obj.metadata.layout_options.indexOf(this.INCLUDE_TITLE_IN_BANNER) !== -1;
        this.includeContactForm = obj.metadata.layout_options.indexOf(this.INCLUDE_CONTACT_FORM) !== -1;
      }
    }
  }
}
