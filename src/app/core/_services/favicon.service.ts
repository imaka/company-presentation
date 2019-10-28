import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { fromEventPattern } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * A service to set the favicon.
 */
@Injectable({
  providedIn: 'root'
})
export class FaviconService {
  constructor(@Inject(DOCUMENT) private _doc: any) {}
  private darkScheme = '(prefers-color-scheme:dark)';
  private prefersColorScheme$ = fromEventPattern(handler => window.matchMedia(this.darkScheme).addListener(handler)).pipe(pluck('matches'));
  /**
   * Set the title of the current HTML document.
   * @param iconURL - New favicon URL
   * @param altIconURL - Optional, favicon URL for dark theme
   */
  setFavicon(iconURL: string, altIconURL?: string) {
    const link = getDOM().querySelector(this._doc, "link[rel*='icon']"); // otherwise create link

    if (altIconURL) {
      if (window.matchMedia(this.darkScheme).matches) {
        this.appendLinkTag(link, altIconURL, 'dark');
      } // me falta un else, si no hay icono inicial esto solo funciona en el caso de dark!
      this.prefersColorScheme$.subscribe(darkTheme => {
        if (darkTheme) {
          this.appendLinkTag(link, altIconURL, 'dark');
        } else {
          this.appendLinkTag(link, iconURL, 'light');
        }
      });
    } else {
      this.appendLinkTag(link, iconURL, 'light');
    }
  }

  /** Append new link to HEAD
   * @param link - DOM element
   * @param iconURL - new favicon URL
   * @param colorScheme - 'dark' or 'light'
   */
  private appendLinkTag(link, iconURL, colorScheme) {
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.media = `(prefers-color-scheme:${colorScheme})`; // probably not needed atm
    link.href = iconURL;
    getDOM()
      .getElementsByTagName(this._doc, 'head')[0]
      .appendChild(link);
  }
}
