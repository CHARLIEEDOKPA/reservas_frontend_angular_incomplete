import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { MainComponent } from '../components/main/main.component';
import { ReservationComponent } from '../components/reservation/reservation.component';

export const routes: Routes = [
    {path:"", redirectTo:"main",pathMatch:"full"},
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"main", component:MainComponent},
    {path:"reservation/:id",component:ReservationComponent}
];
