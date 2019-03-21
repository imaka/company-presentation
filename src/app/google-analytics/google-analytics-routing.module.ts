import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { DummyComponent } from './dummy/dummy.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  {
    path: '',
    canActivate: [externalUrlProvider],
    component: DummyComponent
  }
];

@NgModule({
  providers: [
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl = route.paramMap.get('externalUrl');
        window.open(externalUrl, '_blank');
      }
    }
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleAnalyticsRoutingModule {}
