import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public notFoundContent: string;

  constructor(private cmsService: CmsService) {}

  ngOnInit() {
    this.cmsService.getMainPresets().subscribe(presets => (this.notFoundContent = presets.notFoundContent));
  }
}
