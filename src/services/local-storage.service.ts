import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private NAME = "token"

  public setToken(token:string) {
    localStorage.setItem(this.NAME,token)
  }

  public deleteToken() {
    localStorage.removeItem(this.NAME)
  }

  public getToken() {
    return localStorage.getItem(this.NAME)
  }
}
