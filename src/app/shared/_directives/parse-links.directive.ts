import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appParseLinks]'
})
export class ParseLinksDirective {
  constructor(private el: ElementRef, private router: Router) {}

  @HostListener('click', ['$event'])
  clicked(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const href = target.getAttribute('href');
    if (target.tagName === 'A' && href) {
      if (this.isLocalLink(href)) {
        event.preventDefault();
        this.router.navigate([href]);
      }
    }
  }

  isLocalLink(uri: string) {
    return uri && uri.startsWith('/');
  }
}
