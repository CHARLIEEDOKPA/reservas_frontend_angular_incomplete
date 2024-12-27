import { Reservation } from './../../interfaces/reservation';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,MatDialogModule, } from '@angular/material/dialog';
  import {MatButtonModule} from "@angular/material/button"
import { Router } from '@angular/router';
import { timeString } from '../../utils';

@Component({
  selector: 'app-client-main',
  standalone: true,
  imports: [],
  templateUrl: './client-main.component.html',
  styleUrl: './client-main.component.css'
})
export class ClientMainComponent implements OnInit{

openDialog(enterAnimationDuration: string,exitAnimationDuration: string) {
  const prueba = this.dialog.open(DialogAnimationsExampleDialog, {
    width: '250px',
  });
  
 prueba.afterClosed().subscribe(x => console.log());
  
  
}



  private reservationService = inject(ReservationService)
  private privateReservations:Reservation[] = []
  reservations:Reservation[] = []
  private dialog = inject(MatDialog)
  private router = inject(Router)

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
    return timeString(reservation)
  }

 

  public datePassed(reservation:Reservation) {
    return new Date().getTime() > new Date(`${reservation.date} ${reservation.time}`).getTime()
  }


  viewReservation(id: string) {
    this.router.navigate(["reservation",id])
    }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatDialogModule,MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);

  public close(data:boolean) {
    this.dialogRef.close(data);
  }

}
