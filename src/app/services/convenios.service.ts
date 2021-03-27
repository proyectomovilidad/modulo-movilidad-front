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

  public getAllConvenios(): Promise<any> {
    const url = `${environment.backend.convenio}getConvenios/`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getConvenio(_id: any): Promise<any> {
    const url = `${environment.backend.convenio}getConvenioById/${_id}`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getConvenioByTipoMovilidad(_id: any): Promise<any> {
    const url = `${environment.backend.convenio}getConvenioByTipoMovilidad/${_id}`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public getConvenioByInstitucion(_id: any): Promise<any> {
    const url = `${environment.backend.convenio}getConvenioByInstitucion/${_id}`;
    return this.httpClient.get<any>(url).toPromise();
  }

  public updateConvenio(convenio: any, _id: any): Promise<any> {
    const url = `${environment.backend.convenio}/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    };
    return this.httpClient.put<any>(url, convenio, httpOptions).toPromise();
  }

  public deleteConvenio( _id: any): Promise<any> {
    const url = `${environment.backend.convenio}deleteConvenio/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.delete<any>(url).toPromise();
  }

  public getConveniosConsulta(): Promise<any> {
    const url = `${environment.backend.convenio}getConveviosConsulta/`; //Visualizar todos los profesores existentes
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`,
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get<any>(url, httpOptions).toPromise();
  }

  public consultarConvenios(consulta) {
    const url = `${environment.backend.convenio}consultarConvenios/`; //Consulta por criterios de consulta
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`,
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, consulta, httpOptions).toPromise();

  }


}
