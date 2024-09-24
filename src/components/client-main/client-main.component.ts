import { Reservation } from './../../interfaces/reservation';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-client-main',
  standalone: true,
  imports: [],
  templateUrl: './client-main.component.html',
  styleUrl: './client-main.component.css'
})
export class ClientMainComponent implements OnInit{



  private reservationService = inject(ReservationService)
  private privateReservations:Reservation[] = []
  reservations:Reservation[] = []

  @ViewChild("filter")
  private filterElement!:ElementRef

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(x => {
      this.privateReservations = x.body!
      this.reservations = this.privateReservations
    })
  }

  public filterReservations() {
    const value = this.filterElement.nativeElement.value
    this.reservations = value !== "all" ?  this.privateReservations.filter(x => x.status === value) : this.privateReservations
    
  }

  public getDateString(reservation:Reservation) {
    const options:Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    let date = new Date(reservation.date).toLocaleDateString('en-GB',options)
    return date.replace(/\s/, ' of ')
  }

  public getTimeString(reservation:Reservation) {
    const options:Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    return  new Date(`${reservation.date} ${reservation.time}`).toLocaleTimeString('en-US',options)
  }


  public datePassed(reservation:Reservation) {
    return new Date().getTime() > new Date(`${reservation.date} ${reservation.time}`).getTime()
  }
}