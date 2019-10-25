import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { ContentfulService } from '../_services/contentful.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomepageGuard implements CanActivate {
  constructor(private router: Router, private contentfulService: ContentfulService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.contentfulService.getMainPresets().pipe(
      map(presets => {
        return this.router.parseUrl(`/${presets.homepage.slug}`);
      })
    );
  }
}
