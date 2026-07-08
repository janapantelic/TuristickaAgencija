import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { TuristickaAgencijaDialogComponent } from '../dialog/turisticka-agencija-dialog/turisticka-agencija-dialog';
import { TuristickaAgencija } from './../model/turistickaAgencija.model';
import { TuristickaAgencijaService } from './../service/turistickaAgencija.service';

@Component({
  selector: 'app-turistickaAgencija',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ], 
  templateUrl: './turisticka-agencija.html',
  styleUrl: './turisticka-agencija.css'
})
export class TuristickaAgencijaComponent {

  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];

  dataSource = new MatTableDataSource<TuristickaAgencija>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor
  (public turistickaAgencijaService: TuristickaAgencijaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.turistickaAgencijaService.getAllTuristickaAgencija().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch (property) {
          case 'id': return data[property];
          case 'naziv': return data[property];
          case 'adresa': return data[property];
          case 'kontakt': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, naziv: string, adresa: string, kontakt: string) {
    const dialogRef = this.dialog.open(TuristickaAgencijaDialogComponent, { data: { id: id, naziv: naziv, adresa: adresa, kontakt: kontakt } });
    dialogRef.componentInstance.flag = flag;
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}