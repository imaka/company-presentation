import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { CmsService } from '../_services/cms.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomepageGuard implements CanActivate {
  constructor(private router: Router, private cmsService: CmsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.cmsService.getMainPresets().pipe(
      map(presets => {
        return this.router.parseUrl(`/${presets.homepage.slug}`);
      })
    );
  }
}
