import { Component, inject, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatError, MatLabel } from "@angular/material/select";
import { MatInput } from '@angular/material/input';
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SectionObserverDirective } from "../../shared/directive/section-observer.directive";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ContactService } from '../../core/services/api/contact-service';
import { ContactFormModel } from '../../core/interfaces/contactForm';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-contact-section',
  imports: [MatFormField, MatError, FormsModule, ReactiveFormsModule,
    MatInput, MatLabel, MatAnchor, MatIconButton, SectionObserverDirective, TranslatePipe, MatProgressSpinner],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {

  private fb = inject(NonNullableFormBuilder);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);
  protected isSending = signal(false);
  private contactService = inject(ContactService);


  protected contactForm = this.fb.group({
    name: ['', [Validators.maxLength(300)]],
    subject: ['', [Validators.required, Validators.maxLength(300)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(300)]],
    message: ['', [Validators.required, Validators.maxLength(500)]]
  });




  openSnackBar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'left', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top',   // 'top' | 'bottom',
      panelClass: ['custom-snackbar'] // Clase CSS personalizada (opcional)

    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      const values = this.contactForm.value;
      this.sendEmail(
        {
          name: values.name ?? '',
          email: values.email ?? '',
          subject: values.subject ?? '',
          message: values.message ?? ''
        }
      );
    } else {
      this.contactForm.markAllAsTouched(); 
    }
  }

  sendEmail(data: ContactFormModel) {
    this.isSending.set(true);

    this.contactService.sendEmail(data).subscribe({
      next: (res) => {
        this.openSnackBar(this.translateService.instant("CONTACT.MESSAGE_SEND_SUCCESS"), 'Ok');
        this.isSending.set(false);
      },
      error: (err) => {
        this.openSnackBar('ERROR', 'Ok');
        this.isSending.set(false);
      }
    });
  }

  goToLink(link: string) {
    window.open(link, '_blank', 'noopener,noreferrer');
  }
}
