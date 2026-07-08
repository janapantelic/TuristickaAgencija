import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Aranzman } from '../model/aranzman.model';

@Injectable({
  providedIn: 'root'
})
export class AranzmanService {

  private readonly API_URL = 'http://localhost:8084/aranzman';

  dataChange: BehaviorSubject<Aranzman[]> = new BehaviorSubject<Aranzman[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllAranzmans(): Observable<Aranzman[]> {
    this.httpClient.get<Aranzman[]>(this.API_URL).subscribe({
      next: (data) => {
        console.log('getAllAranzmans', data)
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
    return this.dataChange.asObservable();
  }
  
  public getAranzmans(idHotel?: number): Observable<Aranzman[]> {
    // Ako postoji idHotel, dodajemo '/hotel/ID', u suprotnom ostaje prazno (vuče sve)
    const urlSuffix = !!idHotel ? `/hotel/${idHotel}` : '';
    const kompletanUrl = this.API_URL + urlSuffix;
  
    console.log("Servis šalje HTTP GET zahtev na URL:", kompletanUrl);
  
    this.httpClient.get<Aranzman[]>(kompletanUrl).subscribe({
      next: (data) => {
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    });
    
    return this.dataChange.asObservable();
  }


  public addAranzman(aranzman: Aranzman): void {
    this.httpClient.post(this.API_URL, aranzman).subscribe();
  }

  public updateAranzman(aranzman: Aranzman): void {
    this.httpClient.put(this.API_URL + `/${aranzman.id}`, aranzman).subscribe();
  }

  public deleteAranzman(id: number): void {
    this.httpClient.delete(this.API_URL + `/${id}`).subscribe();
  }
}