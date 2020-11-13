import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

 
  public saveTipoDocumento(tipoDocumento: any): Promise<any> {
    const url = `${environment.backend.tipoDocumento}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, tipoDocumento, httpOptions).toPromise();
  }



}
