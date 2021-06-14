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

    return this.httpClient.post<any>(url, convocatoria, this.getHeaders()).toPromise();
  }

  public getConvocatorias(): Promise<any> {
    const url = `${environment.backend.convocatoria}getConvocatorias/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getConvocatoriaById(id): Promise<any>{
    const url = `${environment.backend.convocatoria}getConvocatoriaById/${id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public deleteConvocatoria( _id: any): Promise<any> {
    const url = `${environment.backend.convocatoria}deleteConvocatoria/${_id}`;
    return this.httpClient.delete<any>(url, this.getHeaders()).toPromise();
  }

  public consultarConvocatorias(consulta): Promise<any> {
    const url = `${environment.backend.convocatoria}consultar/`;
    return this.httpClient.post<any>(url, consulta, this.getHeaders()).toPromise();
  }

  updateConvocatoria(id, convocatoria): Promise<any> {
    const url = `${environment.backend.convocatoria}/${id}`;
    return this.httpClient.post<any>(url, convocatoria, this.getHeaders()).toPromise();
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
