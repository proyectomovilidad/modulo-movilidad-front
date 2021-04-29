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
