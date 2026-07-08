import { Component, Inject, OnInit } from '@angular/core';;
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


import { TuristickaAgencijaService } from '../../service/turistickaAgencija.service';
import { TuristickaAgencija } from '../../model/turistickaAgencija.model';

@Component({
  selector: 'app-turisticka-agencija-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './turisticka-agencija-dialog.html',
  styleUrl: './turisticka-agencija-dialog.css'
})
export class TuristickaAgencijaDialogComponent {
 flag!: number;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TuristickaAgencijaDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: TuristickaAgencija,         
    @Inject(TuristickaAgencijaService) public turistickaAgencijaService: TuristickaAgencijaService
    ) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.turistickaAgencijaService.addTuristickaAgencija(this.data);
    this.snackBar.open('Uspešno dodata turisticka agencija ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.turistickaAgencijaService.updateTuristickaAgencija(this.data);
    this.snackBar.open('Uspešno izmenjena turisticka agencija ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.turistickaAgencijaService.deleteTuristickaAgencija(this.data);
    this.snackBar.open('Uspešno obrisana turisticka agencija ' + this.data.id, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});

}
}
