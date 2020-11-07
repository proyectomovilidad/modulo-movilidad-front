import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionEstudianteService {

  public url: String;
 
  constructor( private httpClient: HttpClient) { 
  }

  public saveAspUisPersonal(aspUisPersonal: any): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspUisPersonal, httpOptions).toPromise();
  }


  public UpdateAspUisPersonal(aspUisPersonal: any): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}${aspUisPersonal._id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspUisPersonal, httpOptions).toPromise();
  }

  public getAspUisPersonal(_id: any): Promise<any> {
    const url = `${environment.backend.ciudad}getAspUisPersonalById/:_id`;
    return this.httpClient.get<any>(url).toPromise();
  }


  public saveAspUisAcademic(aspUisAcademic: any): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, aspUisAcademic, httpOptions).toPromise();
  }


}
