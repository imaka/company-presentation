import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ContentfulService } from 'src/app/core';
import { Page } from '@models/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public page: Page;

  constructor(private route: ActivatedRoute, private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('slug')),
        switchMap(slug => (slug ? this.contentfulService.getPage(slug) : EMPTY))
      )
      .subscribe(page => (this.page = page));
  }

  setBackground() {
    const styles: Object = {
      background: `url(${this.page.banner}) center center / cover no-repeat`
    };
    return styles;
  }
}
