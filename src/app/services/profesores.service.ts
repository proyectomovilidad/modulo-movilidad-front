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

  public getProfesor(_id: any): Promise<any> {
    const url = `${environment.backend.profesores}getProfesoresById/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`,
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get<any>(url,httpOptions ).toPromise();
  }

  public updateProfesor(profesor: any, _id: any): Promise<any> {
    const url = `${environment.backend.profesores}/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`,
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put<any>(url, profesor, httpOptions).toPromise();
  }

  public deleteProfesor( _id: any): Promise<any> {
    const url = `${environment.backend.profesores}deleteProfesor/${_id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.delete<any>(url).toPromise();
  }

  public getProfesoresConsulta(): Promise<any> {
    const url = `${environment.backend.profesores}getProfesoresConsulta/`; //Visualizar todos los profesores existentes
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': `Bearer ${environment.TOKEN}`,
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get<any>(url, httpOptions).toPromise();
  }

  public consultarProfesores(consulta) {
    const url = `${environment.backend.profesores}consultarProfesores/`; //Consulta por criterios de consulta
    const httpOptions = {
      headers: new HttpHeaders({
        
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(url, consulta, httpOptions).toPromise();

  }


}


 