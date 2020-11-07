import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoApoyoService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

 
  public saveTipoApoyo(tipoApoyo: any): Promise<any> {
    const url = `${environment.backend.tipoApoyo}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, tipoApoyo, httpOptions).toPromise();
  }



}
