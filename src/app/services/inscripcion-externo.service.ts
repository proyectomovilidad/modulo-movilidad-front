import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscripcionExternoService {

  public url: String;

  constructor( private httpClient: HttpClient) { }


  public saveAspExtPersonal(aspExtPersonal: any): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspExtPersonal, httpOptions).toPromise();
  }

  public saveAspExtAcademic(aspExtAcademic: any): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspExtAcademic, httpOptions).toPromise();
  }

}
