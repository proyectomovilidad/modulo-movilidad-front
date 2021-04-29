import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadFinancieraService {

  public url: String;

  constructor(private httpClient: HttpClient) { }


  public saveEntidadFinanciera(entidadFinanciera: any): Promise<any> {
    const url = `${environment.backend.entidadFinanciera}`;

    return this.httpClient.post<any>(url, entidadFinanciera, this.getHeaders()).toPromise();
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
