import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EntornoMovilidadService {

  constructor(private httpClient: HttpClient) { }

  public saveFechasMovSaliente(movilidadSaliente: any): Promise<any> {
    const url = `${environment.backend.entornoMovilidad}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, movilidadSaliente, httpOptions).toPromise();
  }

  public saveFechasMovEntrante(movilidadEntrante: any): Promise<any> {
    const url = `${environment.backend.entornoMovilidad}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, movilidadEntrante, httpOptions).toPromise();
  }
}
