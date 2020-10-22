import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceGuard, SiteLayoutComponent } from './core';

const routes: Routes = [
  /*{
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule'
  },*/
  { path: 'coming-soon', loadChildren: () => import('./coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
      {
        path: '',
        canActivate: [MaintenanceGuard],
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
