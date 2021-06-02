import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoApoyoService {

  public url: String;

  constructor(private httpClient: HttpClient) { } 

 
  public saveTipoApoyo(tipoApoyo: any): Promise<any> {
    const url = `${environment.backend.tipoApoyo}`;

    return this.httpClient.post<any>(url, tipoApoyo, this.getHeaders()).toPromise();
  }

  public getApoyo(): Promise<any> {
    const url = `${environment.backend.tipoApoyo}getApoyo/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public deleteApoyo( _id: any): Promise<any> {
    const url = `${environment.backend.tipoApoyo}deleteApoyo/${_id}`;

    return this.httpClient.delete<any>(url, this.getHeaders()).toPromise();
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
