import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public saveProfesores(profesores: any): Promise<any> {
    const url = `${environment.backend.profesores}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, profesores, httpOptions).toPromise();
  }

  public getAllProfesores(): Promise<any> {
    const url = `${environment.backend.profesores}getProfesores/`;
    return this.httpClient.get<any>(url).toPromise();
  }



}


 