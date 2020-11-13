import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TiposDocumentosIdService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public getTipoDocumentoId(): Promise < any > {
    const url = `${environment.backend.tipoDocumentoId}getTipoDocumentoId/`;
    return this.httpClient.get<any>(url).toPromise();
  }

}
