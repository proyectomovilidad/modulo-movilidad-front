import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InstitucionCooperanteService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public saveInstitucionCooperante(institucionCooperante: any): Promise<any> {
    const url = `${environment.backend.institucionCooperante}`;

    return this.httpClient.post<any>(url, institucionCooperante, this.getHeaders()).toPromise();
  }


  public getInstitucionCooperante(): Promise<any> {
    const url = `${environment.backend.institucionCooperante}getInstitucionCooperante`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

   public getInstitucionCooperanteById(_id: any): Promise<any> {
    const url = `${environment.backend.institucionCooperante}getInstitucionCooperanteById/${_id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getAllInstitucionesCooperantes(): Promise<any> {
    const url = `${environment.backend.institucionCooperante}getInstitucionCooperante/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getInstitucionByTipoMovilidad(_id: any): Promise<any> {
    const url = `${environment.backend.institucionCooperante}getInstitucionByTipoMovilidad/${_id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }
  public updateInstitucionCooperante(institucionCooperante: any, _id: any): Promise<any> {
    const url = `${environment.backend.institucionCooperante}/${_id}`;

    return this.httpClient.post<any>(url, institucionCooperante, this.getHeaders()).toPromise();
  }

  public deleteInstitucionCooperante( _id: any): Promise<any> {
    const url = `${environment.backend.institucionCooperante}deleteInstitucionCooperante/${_id}`;

    return this.httpClient.delete<any>(url, this.getHeaders()).toPromise();
  }
  consultar(consulta: any): Promise<any> {
    const url = `${environment.backend.institucionCooperante}consultar`;
    return this.httpClient.post<any>(url, consulta, this.getHeaders()).toPromise();
  }

  private getHeaders(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`,
        'ContentType': 'application/json'
      })
    }

    return httpOptions
  }



}
