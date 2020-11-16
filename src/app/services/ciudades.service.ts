import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  public url: String;

  constructor(private httpClient: HttpClient) { }

  public getCiudades(codigo_departamento): Promise<any> {
    const url = `${environment.backend.ciudad}getCiudades/`
    return this.httpClient.post<any>(url, { codigo_departamento: codigo_departamento }).toPromise()
  }
}
