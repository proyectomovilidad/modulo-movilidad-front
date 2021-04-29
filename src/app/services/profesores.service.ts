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

    return this.httpClient.post<any>(url, profesores, this.getHeaders()).toPromise();
  }

  public getAllProfesores(): Promise<any> {
    const url = `${environment.backend.profesores}getProfesores/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getProfesor(_id: any): Promise<any> {
    const url = `${environment.backend.profesores}getProfesoresById/${_id}`;

    return this.httpClient.get<any>(url,this.getHeaders() ).toPromise();
  }

  public updateProfesor(profesor: any, _id: any): Promise<any> {
    const url = `${environment.backend.profesores}/${_id}`;

    return this.httpClient.put<any>(url, profesor, this.getHeaders()).toPromise();
  }

  public deleteProfesor( _id: any): Promise<any> {
    const url = `${environment.backend.profesores}deleteProfesor/${_id}`;

    return this.httpClient.delete<any>(url).toPromise();
  }

  public getProfesoresConsulta(): Promise<any> {
    const url = `${environment.backend.profesores}getProfesoresConsulta/`; //Visualizar todos los profesores existentes

    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public consultarProfesores(consulta) {
    const url = `${environment.backend.profesores}consultarProfesores/`; //Consulta por criterios de consulta

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


 