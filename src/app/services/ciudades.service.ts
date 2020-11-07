import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  public url: String;

  constructor(private httpClient: HttpClient) { }

  public getCiudad(): Promise<any> {
    const url = `${environment.backend.ciudad}getCiudad/`;
    return this.httpClient.get<any>(url).toPromise();
  }
}
