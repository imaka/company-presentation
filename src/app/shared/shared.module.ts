import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustCosmicPipe } from './_pipes/trust-cosmic.pipe';
import { ParseLinksDirective } from './_directives/parse-links.directive';

@NgModule({
  exports: [TrustCosmicPipe, ParseLinksDirective],
  declarations: [TrustCosmicPipe, ParseLinksDirective],
  imports: [CommonModule]
})
export class SharedModule {}
