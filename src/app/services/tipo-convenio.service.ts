import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TipoConvenioService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  
  public saveTipoConvenio(tipoConvenio: any): Promise<any> {
    const url = `${environment.backend.tipoConvenio}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, tipoConvenio, httpOptions).toPromise();
  }

  public getTipoConvenio(): Promise<any> {
    const url = `${environment.backend.tipoConvenio}getTipoConvenio/`; 
    return this.httpClient.get<any>(url).toPromise();
  }
}
 