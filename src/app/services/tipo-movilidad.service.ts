import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoMovilidadService {

public url: String;

  constructor(private httpClient: HttpClient) { }

  public getTipoMovilidad(): Promise<any> {
    const url = `${environment.backend.tipoMovilidad}getTipoMovilidad/`; 
    return this.httpClient.get<any>(url).toPromise();
  }

  public getTipoMovilidadById(_id: any): Promise<any> {
    const url = `${environment.backend.tipoMovilidad}getTipoMovilidadById/${_id}`;
    return this.httpClient.get<any>(url).toPromise();
  }


}
