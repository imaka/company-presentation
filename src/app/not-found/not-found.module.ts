import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, SharedModule],
  exports: [NotFoundComponent]
})
export class NotFoundModule {}
