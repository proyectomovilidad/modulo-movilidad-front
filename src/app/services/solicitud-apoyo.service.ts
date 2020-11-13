import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudApoyoService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

 
  public saveSolicitudApoyo(solicitudApoyo: any): Promise<any> {
    const url = `${environment.backend.solicitudPresentada}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, solicitudApoyo, httpOptions).toPromise();
  }



}