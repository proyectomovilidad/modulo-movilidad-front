import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {
  
  public url: String;

  constructor(private httpClient: HttpClient) { }

  public saveConvocatoria(convocatoria: any): Promise<any> {
    const url = `${environment.backend.convocatoria}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, convocatoria, httpOptions).toPromise();
  }

  public getConvocatorias(): Promise<any> {
    const url = `${environment.backend.convocatoria}getConvocatorias/`;
    return this.httpClient.get<any>(url).toPromise();
  }

}
