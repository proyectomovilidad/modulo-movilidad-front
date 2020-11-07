import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProgramaAcademicoService {

  public url: String;

  constructor(private httpClient: HttpClient) { }

  public getProgramaAcademico(): Promise<any> {
    const url = `${environment.backend.programaAcademico}getProgramaAcademico/`;
    return this.httpClient.get<any>(url).toPromise();
  }
}


