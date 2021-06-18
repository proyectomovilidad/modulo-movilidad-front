import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }


  public saveUsuario(usuarios: any): Promise<any> {
    const url = `${environment.backend.usuarios}`;

    return this.httpClient.post<any>(url, usuarios, this.getHeaders()).toPromise();
  }

  public updateUsuario(usuarios: any, id: any): Promise<any> {
    const url = `${environment.backend.usuarios}/${id}`;

    return this.httpClient.post<any>(url, usuarios, this.getHeaders()).toPromise();
  }

  public getUsuario(): Promise<any> {
    const url = `${environment.backend.usuarios}getUsuario/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public deleteUsuario( _id: any): Promise<any> {
    const url = `${environment.backend.usuarios}deleteUsuario/${_id}`;

    return this.httpClient.delete<any>(url, this.getHeaders()).toPromise();
  }

  private getHeaders(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${environment.TOKEN}`,
        ContentType: 'application/json'
      })
    };
    return httpOptions;
  }


}
