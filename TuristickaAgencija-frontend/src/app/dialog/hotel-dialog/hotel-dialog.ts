import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 

import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../model/hotel.model';

import { DestinacijaService } from '../../service/destinacija.service';
import { Destinacija } from '../../model/destinacija.model';

@Component({
  selector: 'app-hotel-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule, 
    MatOptionModule
  ],
  templateUrl: './hotel-dialog.html',
  styleUrls: ['./hotel-dialog.css']
})
export class HotelDialogComponent {

  public flag!: number;

  hotels!: Hotel[];
  destinacijas!: Destinacija[];

  constructor(
    public snackBar: MatSnackBar ,
    public dialogRef: MatDialogRef<HotelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hotel,         
    @Inject(HotelService) public hotelService: HotelService,
    @Inject(DestinacijaService) public destinacijaService: DestinacijaService
    ) {}

    ngOnInit(): void {
      this.destinacijaService.getAllDestinacija().subscribe(data => {
        this.destinacijas = data;
      });
    }

  public add(): void {
    this.hotelService.addHotel(this.data);
    this.snackBar.open('Uspešno dodat hotel ' + this.data.id, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.hotelService.updateHotel(this.data);
    this.snackBar.open('Uspešno izmenjen hotel ' + this.data.id, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.hotelService.deleteHotel(this.data.id);
    this.snackBar.open('Uspešno obrisan hotel ' + this.data.id, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

  compareTo(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }

}