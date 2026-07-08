import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { TuristickaAgencija } from '../../model/turistickaAgencija.model';
import { Hotel } from '../../model/hotel.model';
import { TuristickaAgencijaService } from '../../service/turistickaAgencija.service';
import { HotelService } from '../../service/hotel.service';
import { AranzmanService } from '../../service/aranzman.service';
import { Aranzman } from '../../model/aranzman.model';

@Component({
  selector: 'app-aranzman-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
  templateUrl: './aranzman-dialog.html',
  styleUrls: ['./aranzman-dialog.css']
})
export class AranzmanDialogComponent implements OnInit {
  public flag!: number;

  turistickaAgencijas!: TuristickaAgencija[];
  hotels!: Hotel[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AranzmanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Aranzman,
    @Inject(AranzmanService) public aranzmanService: AranzmanService,
    @Inject(HotelService) public hotelService: HotelService,
    @Inject(TuristickaAgencijaService) public turistickaAgencijaService: TuristickaAgencijaService ) { }

  ngOnInit(): void {
    this.turistickaAgencijaService.getAllTuristickaAgencija().subscribe(turistickaAgencijas =>
    this.turistickaAgencijas = turistickaAgencijas);
    this.hotelService.getAllHotel().subscribe(hotels =>
    this.hotels = hotels);
  }

  public add(): void {
    console.log(this.data)
    this.aranzmanService.addAranzman(this.data);
    this.snackBar.open('Uspešno dodat aranzman ' + this.data.id, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.aranzmanService.updateAranzman(this.data);
    this.snackBar.open('Uspešno izmenjen aranzman ' + this.data.id, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.aranzmanService.deleteAranzman(this.data.id);
    this.snackBar.open('Uspešno obrisan aranzman ' + this.data.id, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

  compareTo(a: any, b: any) {
    return a && b ? a.id === b.id : a === b;
  }
}