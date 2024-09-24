import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ValidateJwtComponent } from "../validate-jwt/validate-jwt.component";
import { JwtService } from '../../services/jwt.service';
import { ClientMainComponent } from "../client-main/client-main.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, ValidateJwtComponent, ClientMainComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  private jwtService = inject(JwtService)
  rol = this.jwtService.getRol()

  
}
