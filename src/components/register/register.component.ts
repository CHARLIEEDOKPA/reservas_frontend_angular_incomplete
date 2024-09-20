import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { FlowbiteService } from '../../services/flowbite.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private flowbiteService = inject(FlowbiteService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private router = inject(Router);
  @ViewChild('datepicker')
  private datepickerElement!: ElementRef;
  @ViewChild("register")
  private registerDiv!:ElementRef

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{9}$/),
      Validators.minLength(9),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(200),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      this.addInputEventListener();
    });
  }

  private addInputEventListener() {
    this.registerDiv.nativeElement?.addEventListener('click', (e:MouseEvent) => {
      const target = e.target as HTMLElement;
      const id = target?.id;
      if (id != 'default-datepicker') {
        const value = this.getBornValue()
        if (value.length != 0) {
          if (isNaN(new Date(value).getTime())) {
            this.messageService.add({
              severity: 'error',
              detail: 'Bad date format',
              summary: 'Wrong date format',
            });
          }
        }
      }
    });
  }
  platformId = inject(PLATFORM_ID);

  register() {
    const error = this.validate();
    if (error) {
      return this.sendWrongFormatMessage(error);
    }
    const data = { ...this.form.value, born: this.getBornValue() };

    console.log(data);

    const { password, confirmPassword } = data;

    if (password != confirmPassword) {
      return this.messageService.add({
        severity: 'error',
        detail: 'The passwords do not match. Please try again',
        summary: 'The passwords do not match',
      });
    }
    delete data.confirmPassword;

    this.authService.register(data).subscribe(
      (x) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Your account is registered successfully',
          summary: 'Account registed',
        });
        return this.router.navigate(['login']);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          return this.messageService.add({
            severity: 'error',
            summary:
              err.error.message ||
              'There is an error while registering your account. Please try again',
          });
        }
      }
    );
  }

  private validate() {
    if (!this.form.valid) {
      const nameControl = this.form.get('name');
      const phoneControl = this.form.get('phone');
      const emailControl = this.form.get('email');
      const passwordControl = this.form.get('password');
      const confirmPasswordControl = this.form.get('confirmPassword');

      if (nameControl?.hasError('required')) return 'Name is required';

      if (nameControl?.hasError('maxLength'))
        return 'The max length of the name is 150 words';

      if (phoneControl?.hasError('required')) return 'Phone is required';

      if (
        phoneControl?.hasError('pattern') ||
        phoneControl?.hasError('maxlength')
      )
        return 'The phone format must be a number (Only 9 numbers)';

      if (emailControl?.hasError('required')) return 'Email is required';
      if (emailControl?.hasError('email'))
        return 'The email must be on correct format ';

      if (passwordControl?.hasError('required'))
        return 'Password must be required';
      if (passwordControl?.hasError('minlength'))
        return 'Password must have minimum 8 characters';
      if (confirmPasswordControl?.hasError('required'))
        return 'Confirm password must be required';
    }

    const value = this.getBornValue();

    if (value.length === 0) return 'Born must be required';

    return;
  }

  private sendWrongFormatMessage(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Incorrect format',
      detail: detail,
    });
  }

  private getBornValue() {
    return this.datepickerElement.nativeElement.value
  }
}
