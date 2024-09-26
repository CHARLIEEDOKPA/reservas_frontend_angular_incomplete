import { JwtService } from '../../services/jwt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'; // Asegúrate de que sea 'dialog'

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IsLoggedComponent } from "../is-logged/is-logged.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule, IsLoggedComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(public messageService: MessageService) {}

  private authService = inject(AuthService);
  private router = inject(Router);
  private localStorageService = inject(JwtService);
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(e: Event) {
    e.preventDefault();
    const error = this.validateForm();
    if (error) {
      return this.messageService.add({
        severity: 'error',
        detail: error,
        summary: 'Error to Log in',
      });
    }
    const credentials = this.form.value;
    this.authService.login(credentials).subscribe(
      (x) => {
        const token = x.body!;
        this.localStorageService.setToken(token);
        this.router.navigate(['main'])
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.messageService.add({
            severity: 'error',
            summary: 'Incorrect credentials',
            detail: err.error?.message || 'Unauthorized',
          });
        }
      }
    );
  }

  redirectRegister() {
    this.router.navigate(['register']);
  }

  private validateForm() {
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('email');

    if (emailControl?.hasError('required')) return 'The email must be required';
    if (emailControl?.hasError('email'))
      return 'The email must have a correct format';
    if (passwordControl?.hasError('required'))
      return 'The email password be required';
    return;
  }
}
