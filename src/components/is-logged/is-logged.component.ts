import { Component, inject, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-is-logged',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '',
})
export class IsLoggedComponent implements OnInit {
  private jwtService = inject(JwtService);
  private router = inject(Router);

  ngOnInit(): void {
    const token = this.jwtService.getToken();
    if (token === null) {
      return;
    }
    try {
      const expired = this.jwtService.isExpired(token);
      if (!expired) {
        this.router.navigate(['main']);
        return
      } else {
        return this.jwtService.deleteToken()
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
