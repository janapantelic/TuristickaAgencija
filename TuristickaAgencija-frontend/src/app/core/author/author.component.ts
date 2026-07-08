import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule 
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}