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
    return this.httpClient.post<any>(url, convenio, this.getHeaders()).toPromise();
  }

  public getAllConvenios(): Promise<any> {
    const url = `${environment.backend.convenio}getConvenios/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getConvenio(_id: any): Promise<any> {
    const url = `${environment.backend.convenio}getConvenioById/${_id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getConvenioByTipoMovilidad(_id: any): Promise<any> {
    const url = `${environment.backend.convenio}getConvenioByTipoMovilidad/${_id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getConvenioByInstitucion(_id: any): Promise<any> {
    const url = `${environment.backend.convenio}getConvenioByInstitucion/${_id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public updateConvenio(convenio: any, _id: any): Promise<any> {
    const url = `${environment.backend.convenio}/${_id}`;

    return this.httpClient.put<any>(url, convenio, this.getHeaders()).toPromise();
  }

  public getConvenioByProgAcadInstTipoMov(progAcadId: string, instId: string, tipoMovId: string): Promise<any>{
    const url = `${environment.backend.convenio}getConvenioByProgAcadInstTipoMov/${progAcadId}/${instId}/${tipoMovId}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();    
  }

  public deleteConvenio( _id: any): Promise<any> {
    const url = `${environment.backend.convenio}deleteConvenio/${_id}`;
    return this.httpClient.delete<any>(url, this.getHeaders()).toPromise();
  }

  public getConveniosConsulta(): Promise<any> {
    const url = `${environment.backend.convenio}getConveviosConsulta/`; //Visualizar todos los profesores existentes

    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public consultarConvenios(consulta) {
    const url = `${environment.backend.convenio}consultarConvenios/`; //Consulta por criterios de consulta

    return this.httpClient.post<any>(url, consulta, this.getHeaders()).toPromise();

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
