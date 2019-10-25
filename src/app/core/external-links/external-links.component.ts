import { Component, OnInit } from '@angular/core';
import { ExternalLink } from '@models/external-link';
import { ContentfulService } from '../_services/contentful.service';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrls: ['./external-links.component.scss']
})
export class ExternalLinksComponent implements OnInit {
  public links: ExternalLink[];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService.getExternalLinks().subscribe(links => (this.links = links));
  }
}
