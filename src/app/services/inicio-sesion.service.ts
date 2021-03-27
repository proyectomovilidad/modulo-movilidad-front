import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  public url: String;

  constructor( private httpClient: HttpClient) { }

  public iniciarSesion(datos: any): Promise<any> {
    const url = `${environment.backend.autenticacion}iniciarSesion/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept':'application/json'
      })
    };
    return this.httpClient.post<any>(url, datos, httpOptions).toPromise();
  }
}
