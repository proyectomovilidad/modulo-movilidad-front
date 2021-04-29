import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TiposDocumentosIdService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public getTipoDocumentoId(): Promise < any > {
    const url = `${environment.backend.tipoDocumentoId}getTipoDocumentoId/`;
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
