import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Hotel } from '../model/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private readonly API_URL = 'http://localhost:8084/hotel';

  dataChange: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllHotel(): Observable<Hotel[]> {
    this.httpClient.get<Hotel[]>(this.API_URL).subscribe({
      next: (data) => {
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
    return this.dataChange.asObservable();
  }

  public addHotel(hotel: Hotel): void {
    this.httpClient.post(this.API_URL, hotel).subscribe();
  }

  public updateHotel(hotel: Hotel): void {
    this.httpClient.put(this.API_URL + `/${hotel.id}`, hotel).subscribe();
  }

  public deleteHotel(id: number): void {
    this.httpClient.delete(this.API_URL + `/${id}`).subscribe();
  }
}