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

  public saveTipoDocumentos(tipoDocumentos: any): Promise<any> {
    const url = `${environment.backend.tipoDocumento}saveMultiple/`;

    return this.httpClient.post<any>(url, tipoDocumentos, this.getHeaders()).toPromise();
  }

  public getDocumento(): Promise<any> {
    const url = `${environment.backend.tipoDocumento}getDocumento/`; 
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }
  
  public getDocumentoByConvenio(id): Promise<any> {
    const url = `${environment.backend.tipoDocumento}getDocumentoByConvenio/${id}`; 
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getTipoDocumentoConvenios(): Promise<any>{
    const url = `${environment.backend.tipoDocumento}getTipoDocumentoConvenios/`; 
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public saveTipoDocumentoConvenio(data): Promise<any>{
    const url = `${environment.backend.tipoDocumento}saveTipoDocumentoConvenio/`; 
    return this.httpClient.post<any>(url,data, this.getHeaders()).toPromise();
  }

  public removeTipoDocumentoConvenio(id): Promise<any>{
    const url = `${environment.backend.tipoDocumento}removeTipoDocumentoConvenio/${id}`; 
    return this.httpClient.post<any>(url,{}, this.getHeaders()).toPromise();
  }

  public getDocumentoByConsulta(consulta): Promise<any>{
    const url = `${environment.backend.tipoDocumento}getDocumentoByConsulta/`; 
    return this.httpClient.post<any>(url,consulta, this.getHeaders()).toPromise();
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
