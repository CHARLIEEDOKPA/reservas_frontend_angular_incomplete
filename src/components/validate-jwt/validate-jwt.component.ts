import { Component, inject, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-jwt',
  standalone: true,
  imports: [],
  template: '',
})
export class ValidateJwtComponent implements OnInit {
  private jwtService = inject(JwtService);
  private router = inject(Router);

  ngOnInit(): void {
    const token = this.jwtService.getToken();

    if (token === null) {
      this.router.navigate(['login']);
      return;
    }
    
    try {
      const expired = this.jwtService.isExpired(token)
      if (expired) {
        this.deleteTokenAndRedirectToLogin();
        return;
      }
    } catch (error) {
      this.deleteTokenAndRedirectToLogin();
    }
  }

  private deleteTokenAndRedirectToLogin() {
    this.jwtService.deleteToken();
    this.router.navigate(['login']);
  }
}
