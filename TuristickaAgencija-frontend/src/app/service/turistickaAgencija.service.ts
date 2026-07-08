import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { TuristickaAgencija } from '../model/turistickaAgencija.model';

@Injectable({
  providedIn: 'root'
})
export class TuristickaAgencijaService {

  private readonly API_URL = 'http://localhost:8084/turistickaAgencija';

  constructor(private httpClient: HttpClient) {}

  public getAllTuristickaAgencija(): Observable<TuristickaAgencija[]> {
    return this.httpClient.get<TuristickaAgencija[]>(this.API_URL);
  }

  public addTuristickaAgencija(turistickaAgencija: TuristickaAgencija): void {
    this.httpClient.post(this.API_URL, turistickaAgencija).subscribe();
  }

  public updateTuristickaAgencija(turistickaAgencija: TuristickaAgencija): void {
    this.httpClient.put(
      this.API_URL + `/${turistickaAgencija.id}`,
      turistickaAgencija
    ).subscribe();
  }

  public deleteTuristickaAgencija(turistickaAgencija: TuristickaAgencija): void {
    this.httpClient.delete(
      this.API_URL + `/${turistickaAgencija.id}`
    ).subscribe();
  }
}