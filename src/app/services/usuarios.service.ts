import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  private url: String;

  public getAllUsuarios(): Promise < any > {
    const url = `${environment.backend.usuarios}getAllUsuarios/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getUsuarioById(id): Promise < any > {
    const url = `${environment.backend.usuarios}getUsuarioById/${id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }


  public consultar(consulta): Promise < any > {
    const url = `${environment.backend.usuarios}consultar/`;
    return this.httpClient.post<any>(url, consulta, this.getHeaders()).toPromise();
  }

  public saveUsuario(usuarioData): Promise < any > {
    const url = `${environment.backend.usuarios}saveUsuario/`;
    return this.httpClient.post<any>(url, usuarioData, this.getHeaders()).toPromise();
  }

  public updateUsuario(usuarioData): Promise < any > {
    const url = `${environment.backend.usuarios}updateUsuario/`;
    return this.httpClient.post<any>(url, usuarioData, this.getHeaders()).toPromise();
  }

  public eliminarUsuario(id): Promise < any > {
    const url = `${environment.backend.usuarios}eliminarUsuario/${id}`;

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
