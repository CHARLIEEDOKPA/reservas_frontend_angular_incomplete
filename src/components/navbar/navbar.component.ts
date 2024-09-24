import { Component, inject, Input } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

 @Input() rol!:string

 private jwtService = inject(JwtService)
 private router = inject(Router)

 logout() {
  this.jwtService.deleteToken()
  this.router.navigate(['login'])
  }
}
