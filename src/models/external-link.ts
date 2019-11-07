import { ContentfulParser } from './utils/contentful-parser';

export class ExternalLink {
  _id: string;
  icon: string;
  slug: string;
  title: string;
  text: string;
  url: string;

  constructor(obj) {
    const sys = obj.sys;
    const fields = obj.fields;

    this._id = sys.id;
    this.icon = fields.icon ? ContentfulParser.getImageURL(fields.icon) : '';
    this.title = fields.title;
    this.text = fields.text;
    this.url = fields.url;
  }
}
