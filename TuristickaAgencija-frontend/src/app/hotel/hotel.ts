import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

// Uvozi komponente i modele
import { HotelDialogComponent } from '../dialog/hotel-dialog/hotel-dialog'; 
import { Hotel } from '../model/hotel.model';
import { HotelService } from '../service/hotel.service';
import { Destinacija } from './../model/destinacija.model';

import { AranzmanComponent } from '../aranzman/aranzman'; 

@Component({
  selector: 'app-hotel',
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
    MatIconModule,
    AranzmanComponent 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hotel.html',
  styleUrl: './hotel.css'
})
export class HotelComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'brojZvezdica', 'opis', 'destinacija', 'actions'];

  hotel!: Hotel;
  selektovanHotel!: Hotel;
  dataSource!: MatTableDataSource<Hotel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public hotelService: HotelService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.hotelService.getAllHotel().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stanog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'destinacija' ? currentTerm + (data.destinacija?.mesto || '') : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data: any, property: any) => {
        switch (property) {
          case 'id': return data[property];
          case 'naziv': return data[property];
          case 'brojZvezdica': return data[property];
          case 'opis': return data[property];
          case 'destinacija': return data.destinacija?.mesto || '';
          default: return data[property]?.toString().toLowerCase() || '';
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, naziv: string, brojZvezdica: number, opis: string, destinacija: any) {
    const dialogRef = this.dialog.open<any, any, any>(HotelDialogComponent, {
      data: { id: id, naziv: naziv, brojZvezdica: brojZvezdica, opis: opis, destinacija: destinacija }
    });
    
    dialogRef.componentInstance.flag = flag;
    
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public selectedRow(row: Hotel): void {
    this.selektovanHotel = row;
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}