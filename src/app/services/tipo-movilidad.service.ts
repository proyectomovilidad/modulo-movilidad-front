import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoMovilidadService {

public url: String;

  constructor(private httpClient: HttpClient) { }

  public getTipoMovilidad(): Promise<any> {
    const url = `${environment.backend.tipoMovilidad}getTipoMovilidad/`; 
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getTipoMovilidadById(_id: any): Promise<any> {
    const url = `${environment.backend.tipoMovilidad}getTipoMovilidadById/${_id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  getTipoMovilidadByInstProgAcad(progAcadId: string, instId: string): Promise<any>{
    const url = `${environment.backend.tipoMovilidad}getTipoMovilidadByInstProgAcad/${instId}/${progAcadId}`;
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
