import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CmsService, MailService } from 'src/app/core';
import { NgForm } from '@angular/forms';
import { Email } from '@models/email';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  // @ViewChild('contactForm') public contactForm: NgForm;
  @Input() context: string;
  public submitted = false;
  public loading = false;
  public resultMessage = '';
  public model = new Email();
  private successMessage = '';
  private errorMessage = '';

  constructor(private mailService: MailService, private cmsService: CmsService) {}

  ngOnInit() {
    this.cmsService.getMainPresets().subscribe(presets => {
      this.errorMessage = presets.emailErrorMessage;
      this.successMessage = presets.emailSuccessMessage;
    });
  }

  onSubmit(contactForm: NgForm) {
    this.loading = true;
    const subject = `[Web] Email from page: ${this.context}`;

    this.mailService.send(subject, this.model.composeMessage()).subscribe((response: any) => {
      this.submitted = true;
      this.loading = false;

      if (response.data) {
        contactForm.reset();
        contactForm.form.markAsPristine();
        this.resultMessage = this.successMessage;
      } else {
        this.resultMessage = this.errorMessage;
      }
    });
  }
}
