import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadFinancieraService {

  public url: String;

  constructor(private httpClient: HttpClient) { }


  public saveEntidadFinanciera(entidadFinanciera: any): Promise<any> {
    const url = `${environment.backend.entidadFinanciera}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, entidadFinanciera, httpOptions).toPromise();
  }

}
