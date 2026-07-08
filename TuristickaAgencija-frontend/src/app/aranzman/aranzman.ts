import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AranzmanDialogComponent } from '../dialog/aranzman-dialog/aranzman-dialog';
import { TuristickaAgencija } from '../model/turistickaAgencija.model';
import { Hotel } from '../model/hotel.model';
import { AranzmanService } from '../service/aranzman.service';
import { Aranzman } from './../model/aranzman.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aranzman',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './aranzman.html',
  styleUrls: ['./aranzman.css']
})
export class AranzmanComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'ukupnaCena', 'placeno', 'datumRealizacije', 'hotel', 'turistickaAgencija', 'actions'];
  dataSource!: MatTableDataSource<Aranzman>;

  today: Date = new Date();
  Hotel!: Hotel;
  TuristickaAgencija!: TuristickaAgencija;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() selektovanHotel!: Hotel;

  constructor(
    public aranzmanService: AranzmanService, 
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Učitavamo podatke odmah pri paljenju stranice
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reaguje kada klikneš na hotel u gornjoj tabeli
    if (changes['selektovanHotel']) {
      this.loadData();
    }
  }

  public loadData() {
    const hotelId: any = this.selektovanHotel ? this.selektovanHotel.id : null;

    console.log("Pozivam servis za aranžmane sa hotelId:", hotelId);

    this.aranzmanService.getAranzmans(hotelId).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        console.log('Uspešno primljeni aranžmani:', data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Custom filtriranje za pretragu
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: string, key: string) => {
            if (key === 'turistickaAgencija') return currentTerm + (data.turistickaAgencija?.naziv || '');
            if (key === 'hotel') return currentTerm + (data.hotel?.naziv || '');
            return currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          return dataStr.indexOf(filter.trim().toLowerCase()) !== -1;
        };

        // Custom sortiranje
        this.dataSource.sortingDataAccessor = (data: any, property: any) => {
          switch (property) {
            case 'id': return data[property];
            case 'ukupnaCena': return data[property];
            case 'placeno': return data[property];
            case 'datumRealizacije': return data[property];
            case 'hotel': return data.hotel?.naziv?.toLowerCase() || '';
            case 'turistickaAgencija': return data.turistickaAgencija?.naziv?.toLowerCase() || '';
            default: return data[property]?.toString().toLowerCase() || '';
          }
        };
      },
      error: (err) => {
        console.error("Greška pri učitavanju aranžmana sa bekenda:", err);
      }
    });
  }

  public openDialog(flag: number, id: number, ukupnaCena: number, placeno: boolean, datumRealizacije?: Date, hotel?: Hotel, turistickaAgencija?: TuristickaAgencija) {
    const dialogHotel = hotel ? hotel : (this.selektovanHotel ? this.selektovanHotel : {} as any);
    const dialogAgencija = turistickaAgencija ? turistickaAgencija : {} as any;
    const dialogDatum = datumRealizacije ? datumRealizacije : new Date();

    console.log("Otvaram dijalog za aranžman sa podacima:", { id, ukupnaCena, placeno, dialogDatum, dialogHotel, dialogAgencija });

    const dialogRef = this.dialog.open(AranzmanDialogComponent, {
      data: { id: id, ukupnaCena: ukupnaCena, placeno: placeno, datumRealizacije: dialogDatum, hotel: dialogHotel, turistickaAgencija: dialogAgencija }
    });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("Dijalog zatvoren sa rezultatom:", result);
      if (result === 1) {
        this.loadData();
      }
    });
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
}