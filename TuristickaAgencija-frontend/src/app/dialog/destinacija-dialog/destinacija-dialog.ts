import { Component, Inject, OnInit } from '@angular/core';;
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core';

import { DestinacijaService } from '../../service/destinacija.service';
import { Destinacija } from '../../model/destinacija.model';

@Component({
  selector: 'app-destinacija-dialog',
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
    MatOptionModule
  ],
  templateUrl: './destinacija-dialog.html',
  styleUrls: ['./destinacija-dialog.css']
})
export class DestinacijaDialogComponent {
  public flag!: number;

  constructor(
    public snackBar: MatSnackBar ,
    public dialogRef: MatDialogRef<DestinacijaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    @Inject(MAT_DIALOG_DATA) public data: Destinacija,         
    @Inject(DestinacijaService) public destinacijaService: DestinacijaService
    ) {}
  

  ngOnInit(): void {
  }

  public add(): void {
    this.destinacijaService.addDestinacija(this.data);
    this.snackBar.open('Uspešno dodata destinacija ' + this.data.mesto, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.destinacijaService.updateDestinacija(this.data);
    this.snackBar.open('Uspešno izmenjena destinacija ' + this.data.mesto, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.destinacijaService.deleteDestinacija(this.data);
    this.snackBar.open('Uspešno obrisana destinacija ' + this.data.mesto, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

}




