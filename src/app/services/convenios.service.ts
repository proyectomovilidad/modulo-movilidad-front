import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConveniosService {
  
  public url: String;

  constructor(private httpClient: HttpClient) { }

  public saveConvenio(convenio: any): Promise<any> {
    const url = `${environment.backend.convenio}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, convenio, httpOptions).toPromise();
  }

  public getConvenio(): Promise<any> {
    const url = `${environment.backend.convenio}getConvenio/`;
    return this.httpClient.get<any>(url).toPromise();
  }

}
