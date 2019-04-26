import { Component, ViewChild, Input } from '@angular/core';
import { MailService } from 'src/app/core';
import { NgForm } from '@angular/forms';
import { Email } from '@models/email';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  // @ViewChild('contactForm') public contactForm: NgForm;
  @Input() context: string;
  public submitted = false;
  public loading = false;
  public resultMessage = '';
  public model = new Email();

  constructor(private mailService: MailService) {}

  onSubmit(contactForm: NgForm) {
    this.loading = true;
    const subject = `[Web] Email from page: ${this.context}`;

    this.mailService.send(subject, this.model.composeMessage()).subscribe((response: any) => {
      this.submitted = true;
      this.loading = false;

      if (response.data) {
        contactForm.reset();
        contactForm.form.markAsPristine();
        this.resultMessage = '¡Enviado! Muchas gracias por contactar conmigo';
      } else {
        this.resultMessage =
          'Se ha producido un error, si no quieres volver a intentarlo, ¡siempre puedes contactarme en las redes sociales!';
      }
    });
  }
}
