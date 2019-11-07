import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustCMSPipe } from './_pipes/trust-cms.pipe';
import { ParseLinksDirective } from './_directives/parse-links.directive';

@NgModule({
  exports: [TrustCMSPipe, ParseLinksDirective],
  declarations: [TrustCMSPipe, ParseLinksDirective],
  imports: [CommonModule]
})
export class SharedModule {}
