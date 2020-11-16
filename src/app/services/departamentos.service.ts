import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public getDepartamentos(codigo_pais): Promise < any > {
    const url = `${environment.backend.departamento}getDepartamentos/`
    return this.httpClient.post<any>(url, {codigo_pais: codigo_pais}).toPromise()
  }
  
}
