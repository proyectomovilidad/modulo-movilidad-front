import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {

public url: String;

  constructor(private httpClient: HttpClient) { }

  public getTiposProyecto(): Promise<any> {
    const url = `${environment.backend.tipoProyecto}getTiposProyecto/`; 
    return this.httpClient.get<any>(url).toPromise();
  }

}