import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudApoyoService {

  public url: String;

  constructor(private httpClient: HttpClient) { }


  public saveSolicitudApoyo(solicitudApoyo: any): Promise<any> {
    const url = `${environment.backend.solicitudPresentada}`;
    return this.httpClient.post<any>(url, solicitudApoyo, this.getHeaders()).toPromise();
  }

  public getSolicitudes(): Promise<any> {
    const url = `${environment.backend.solicitudPresentada}getSolicitudPresentada/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public updateSolicitudApoyo(_id: any, estado: any): Promise<any> {
    const url = `${environment.backend.solicitudPresentada}${_id}`;
    return this.httpClient.post<any>(url, estado, this.getHeaders()).toPromise();
  }

  public getSolicitudesByEstudiante(documento_id: any): Promise<any> {
    const url = `${environment.backend.solicitudPresentada}getSolicitudPresentadaByEstudiante/${documento_id}`;
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
