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

  public getAspExternoPersonal(_id: any): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}getAspExtPersonalById/${_id}`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getAspExternoAcademic(_id: any): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}getAspExtAcademicById/${_id}`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getAllAspExternoPersonal(): Promise<any> {
    const url = `${environment.backend.aspExtPersonal}getAspiranteExtPersonal/`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getAllAspExternoAcademic(): Promise<any> {
    const url = `${environment.backend.aspExtAcademic}getAspiranteExtPersonal/`;
    return this.httpClient.get<any>(url).toPromise();
  }

}
