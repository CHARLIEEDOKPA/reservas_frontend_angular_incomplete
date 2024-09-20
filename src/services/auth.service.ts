import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';
import { catchError } from 'rxjs/operators';
import { throwError, ErrorObserver, of } from 'rxjs';
import {HOST} from "../global"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  public login(credentials:any) {
    return this.httpClient.post<Response<string>>(`${HOST}/auth/login`, credentials)
  }

  public register(data:any) {
    return this.httpClient.post<Response<void>>(`${HOST}/auth/register`,data)
  }
}
