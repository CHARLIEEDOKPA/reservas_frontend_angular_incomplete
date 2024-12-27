import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../interfaces/reservation';
import { NavbarComponent } from '../navbar/navbar.component';
import { isPassed, timeString } from '../../utils';
import { isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../client-main/client-main.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private id = this.route.snapshot.paramMap.get('id');
  private reservationService = inject(ReservationService);
  private platformId = inject(PLATFORM_ID);
  private dialog = inject(MatDialog);
  reservation: Reservation = null!;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.reservationService
        .getReservation(this.id!)
        .subscribe((x) => (this.reservation = x.body!));
    }
  }

  public isPassed() {
    return isPassed(this.reservation);
  }

  public getTimeString() {
    return timeString(this.reservation);
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const prueba = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
    });
  }
}
