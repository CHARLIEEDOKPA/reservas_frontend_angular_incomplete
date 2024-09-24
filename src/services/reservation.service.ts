import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';
import { Reservation } from '../interfaces/reservation';
import { HOST } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient:HttpClient) { }

  public getAllReservations() {
    return this.httpClient.get<Response<Reservation[]>>(`${HOST}/reservations`)
  }

  public getReservation(id:string) {
    return this.httpClient.get<Response<Reservation>>(`${HOST}/reservations/${id}`)
  }
}
