import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,      
    MatSidenavModule,    
    MatExpansionModule, 
    MatListModule,     
    MatButtonModule,  
    MatIconModule       
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rva-frontend');
}