import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public getProgramaAcademico(): Promise<any> {
    const url = `${environment.backend.programaAcademico}getProgramaAcademico/`; 
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  getProgramaAcademicoByInstitucion(institucionId): Promise<any> {
    const url = `${environment.backend.programaAcademico}getProgramaAcademicoByInstitucion/${institucionId}`; 
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
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



