import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageComponent } from './page/page.component';
import { SharedModule } from '../shared/shared.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageComponent, ContactFormComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule, FormsModule],
  exports: [PageComponent]
})
export class PagesModule {}
