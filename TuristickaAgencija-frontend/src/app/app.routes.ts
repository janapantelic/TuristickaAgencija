import { Routes } from '@angular/router';
import { Home as HomeComponent } from './core/home/home.component'; // <-- Spajamo tvoju klasu 'Home' sa nazivom 'HomeComponent'
import { AboutComponent } from './core/about/about.component';
import { AuthorComponent } from './core/author/author.component'; 
import { AranzmanComponent } from './aranzman/aranzman';
import { DestinacijaComponent } from './destinacija/destinacija';
import { HotelComponent } from './hotel/hotel';
import { TuristickaAgencijaComponent } from './turisticka-agencija/turisticka-agencija';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  
  { path: 'home', component: HomeComponent }, 
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent }, 
  
  { path: 'aranzman', component: AranzmanComponent },
  { path: 'destinacija', component: DestinacijaComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'turisticka-agencija', component: TuristickaAgencijaComponent }
];