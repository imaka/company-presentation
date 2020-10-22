import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CmsService } from '../_services/cms.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MaintenanceGuard implements CanActivate {
  constructor(private router: Router, private cmsService: CmsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.cmsService.getMainPresets().pipe(
      map(presets => {
        if (environment.production && presets.maintenance) {
          this.router.navigateByUrl('/coming-soon');
        } else {
          return true;
        }
      })
    );
  }
}
