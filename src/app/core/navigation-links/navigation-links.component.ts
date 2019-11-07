import { Component, Input } from '@angular/core';
import { Page } from '@models/page';

@Component({
  selector: 'app-navigation-links',
  templateUrl: './navigation-links.component.html',
  styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent {
  @Input() navigation: Page[];

  constructor() {}
}
