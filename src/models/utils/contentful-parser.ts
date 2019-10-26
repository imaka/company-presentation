import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

export class ContentfulParser {
  /** Transform to plain text. Source text is expected to be valid HTML
   *  @param field - field to parse
   */
  static parseRichText(field: any) {
    return documentToPlainTextString(field);
  }

  /** Get image URL from an attribute
   * @param field - field to parse
   * @param format - optional value, can be 'jpg', 'png', 'webp' or 'progressive'
   * @param progressive - optional value, will return a progressive jpeg
   */
  static getImageURL(field: any, format?: string) {
    const url = field.fields.file.url;
    if (!format) {
      return url;
    } else if (format === 'progressive') {
      return url + '?fm=jpg&fl=progressive';
    } else {
      return url + `?fm=${format}`;
    }
  }
}
