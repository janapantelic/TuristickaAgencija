import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Destinacija } from "../model/destinacija.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DestinacijaService{

  private readonly API_URL = 'http://localhost:8084/destinacija';

  dataChange: BehaviorSubject<Destinacija[]> = new BehaviorSubject<Destinacija[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllDestinacija(): Observable<Destinacija[]> {
    this.httpClient.get<Destinacija[]>(this.API_URL).subscribe({
      next: (data) => {
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }}
    );
    return this.dataChange.asObservable();
  }

  public addDestinacija(destinacija: Destinacija): void {
    this.httpClient.post(this.API_URL, destinacija).subscribe();
  }

  public updateDestinacija(destinacija: Destinacija): void {
    this.httpClient.put(this.API_URL + `/${destinacija.id}`, destinacija).subscribe();
  }

  public deleteDestinacija(destinacija: Destinacija): void {
    this.httpClient.delete(this.API_URL + `/${destinacija.id}`).subscribe();
  }

}