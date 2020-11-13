import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InstitucionCooperanteService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public saveInstitucionCooperante(institucionCooperante: any): Promise<any> {
    const url = `${environment.backend.institucionCooperante}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, institucionCooperante, httpOptions).toPromise();
  }


  public getInstitucionCooperante(): Promise<any> {
    const url = `${environment.backend.institucionCooperante}getInstitucionCooperante`;
    return this.httpClient.get<any>(url).toPromise();
  }
}
 