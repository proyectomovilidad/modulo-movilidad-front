import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EntornoMovilidadService {

  constructor(private httpClient: HttpClient) { }

  public saveFechasMovSaliente(movilidadSaliente: any): Promise<any> {
    const url = `${environment.backend.entornoMovilidad}`;

    return this.httpClient.post<any>(url, movilidadSaliente, this.getHeaders()).toPromise();
  }

  public saveFechasMovEntrante(movilidadEntrante: any): Promise<any> {
    const url = `${environment.backend.entornoMovilidad}`;

    return this.httpClient.post<any>(url, movilidadEntrante, this.getHeaders()).toPromise();
  }

  public saveFechasMovilidad(formData: any): Promise<any>{
    const url = `${environment.backend.entornoMovilidad}`

    return this.httpClient.post<any>(url, formData, this.getHeaders()).toPromise();
  }

  public getFechasByStatus(periodo, tipo): Promise<any>{
    const url = `${environment.backend.entornoMovilidad}/getFechasByStatus/${periodo}/${tipo}`
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getFechas(): Promise<any>{
    const url = `${environment.backend.entornoMovilidad}/getFechas/`
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public eliminarEntorno(id): Promise<any> {
    const url = `${environment.backend.entornoMovilidad}/eliminarEntorno/${id}`
    return this.httpClient.delete<any>(url, this.getHeaders()).toPromise();
  }

  getEntornoMovilidadById(id: any): Promise<any> {
    const url = `${environment.backend.entornoMovilidad}/getEntornoMovilidadById/${id}`
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  updateEntornoMovilidad(id: any, dataEntorno: any): Promise<any> {
    const url = `${environment.backend.entornoMovilidad}updateEntornoMov/${id}`;
    return this.httpClient.post<any>(url, dataEntorno, this.getHeaders()).toPromise();
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
