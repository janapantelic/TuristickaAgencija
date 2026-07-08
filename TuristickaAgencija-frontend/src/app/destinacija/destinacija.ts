import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Destinacija } from '../model/destinacija.model';
import { DestinacijaService } from '../service/destinacija.service';
import { MatDialog } from '@angular/material/dialog';
import { DestinacijaDialogComponent } from '../dialog/destinacija-dialog/destinacija-dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatToolbarModule } from '@angular/material/toolbar';   
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';       
import { MatTableModule } from '@angular/material/table';    
import { MatSortModule } from '@angular/material/sort';     
import { MatIconModule } from '@angular/material/icon';           
import { MatButtonModule } from '@angular/material/button';          
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-destinacija',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,     
    MatFormFieldModule,   
    MatInputModule,      
    MatTableModule,      
    MatSortModule,     
    MatIconModule,        
    MatButtonModule,      
    MatPaginatorModule    
  ],
  templateUrl: './destinacija.html',
  styleUrl: './destinacija.css',
})

export class DestinacijaComponent implements OnInit {
  displayedColumns = ['id', 'mesto', 'drzava', 'opis', 'actions'];

  dataSource!: MatTableDataSource<Destinacija>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public destinacijaService: DestinacijaService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.destinacijaService.getAllDestinacija();
    this.destinacijaService.getAllDestinacija().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property: any) => {
        switch(property) {
          case 'id': return data[property];
          case 'mesto' : return data[property];
          case 'drzava' : return data[property];
          case 'opis' : return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  public openDialog(flag: number, id: number, mesto: string, drzava: string,  opis: string) {

    const dialog = this.dialog.open(DestinacijaDialogComponent, {data: {id: id, mesto: mesto, drzava: drzava , opis: opis}});

    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe((result: any) => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue : string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
