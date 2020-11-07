import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public getDepartamento(): Promise < any > {
    const url = `${environment.backend.departamento}getDepartamento/`;
    return this.httpClient.get<any>(url).toPromise();
}
}
