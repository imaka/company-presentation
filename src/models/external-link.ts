export class ExternalLink {
  _id: string;
  icon: string;
  slug: string;
  title: string;
  text: string;
  url: string;

  constructor(obj) {
    this._id = obj._id;
    this.icon = obj.metadata.icon ? obj.metadata.icon.url : '';
    this.slug = obj.slug;
    this.title = obj.title;
    this.text = obj.metadata.text;
    this.url = obj.metadata.url;
  }
}
