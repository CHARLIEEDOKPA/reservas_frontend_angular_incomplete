import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private helper:JwtHelperService) {}

  private NAME = 'token';
  private platformId = inject(PLATFORM_ID); 

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public setToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem(this.NAME, token);
    }
    
  }

  public deleteToken() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.NAME);
    }
  }

  public getToken() {
    if (this.isBrowser()) {
      return localStorage.getItem(this.NAME);
    }
    return null
  }

  public isExpired(token:string) {
    return this.helper.isTokenExpired(token)
  }

  public decodeJwt(token:string) {
    return this.helper.decodeToken(token)
  }

 public getRol(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeJwt(token);
      if (decodedToken && decodedToken.rol) {
        return decodedToken.rol;
      }
    }
    return null;
  }
}
