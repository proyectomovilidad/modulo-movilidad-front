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

    return this.httpClient.post<any>(url, tipoDocumento, this.getHeaders()).toPromise();
  }

  public getDocumento(): Promise<any> {
    const url = `${environment.backend.tipoDocumento}getDocumento/`; 
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  private getHeaders(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`,        
        'ContentType': 'application/json'
      })
    };
    return httpOptions
  }

}
