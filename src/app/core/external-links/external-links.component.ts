import { Component, OnInit } from '@angular/core';
import { ExternalLink } from '@models/external-link';
import { CmsService } from '../_services/cms.service';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrls: ['./external-links.component.scss']
})
export class ExternalLinksComponent implements OnInit {
  public links: ExternalLink[];

  constructor(private cmsService: CmsService) {}

  ngOnInit() {
    this.cmsService.getExternalLinks().subscribe(links => (this.links = links));
  }
}
