import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

export class ParseUtils {
  /** Transform to plain text. Source text is expected to be valid HTML
   *  @param field - field to parse
   */
  static parseRichText(field: any) {
    return documentToPlainTextString(field);
  }

  /** Get image URL from an attribute
   * @param field - field to parse
   * @param format - optional value, can be 'jpg', 'png', 'webp'
   */
  static getImageURL(field: any, format?: string) {
    return format ? field.fields.file.url + `?fm=${format}` : field.fields.file.url;
  }
}
