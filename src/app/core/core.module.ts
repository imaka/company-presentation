import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { throwIfAlreadyLoaded } from './_guards/module-import-guards';
import { ExternalLinksComponent } from './external-links/external-links.component';
import { NavigationLinksComponent } from './navigation-links/navigation-links.component';
import { NgSimpleAnalyticsModule } from '../ng-simple-analytics';
import { FooterContentComponent } from './footer-content/footer-content.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MenuComponent, ExternalLinksComponent, NavigationLinksComponent, FooterContentComponent],
  imports: [CommonModule, RouterModule, NgSimpleAnalyticsModule, SharedModule],
  exports: [MenuComponent, ExternalLinksComponent, NavigationLinksComponent, FooterContentComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
