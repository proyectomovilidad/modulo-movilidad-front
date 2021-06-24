import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionEstudianteService {

  public url: String;

  constructor( private httpClient: HttpClient) {
  }

  public saveAspUisPersonal(aspUisPersonal: any): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}`;

    return this.httpClient.post<any>(url, aspUisPersonal, this.getHeaders()).toPromise();
  }


  public UpdateAspUisPersonal(aspUisPersonal: any, _id: any): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}${_id}`;

    return this.httpClient.post<any>(url, aspUisPersonal, this.getHeaders()).toPromise();
  }

  public getAspUisPersonal(_id: any): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}getAspUisPersonalById/${_id}`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getAllAspUisPersonal(): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}getAspiranteUisPersonal/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }


  public saveAspUisAcademic(aspUisAcademic: any): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}`;

    return this.httpClient.post<any>(url, aspUisAcademic, this.getHeaders()).toPromise();
  }

  public updateAspUisAcademic(aspUisAcademic: any, _id: any): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}/${_id}`;

    return this.httpClient.post<any>(url, aspUisAcademic, this.getHeaders()).toPromise();
  }

  public getAspUisAcademic(_id: any): Promise<any> {
   // const url = `${environment.backend.aspUisAcademic}getAspUisAcademicById/${_id}`;
    const url = `${environment.backend.aspUisAcademic}getAspUisAcademicById/:_id`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public getAllAspUisAcademic(): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}getAspiranteUisAcademic/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }


  public saveInscripcion(inscripcion: any): Promise<any> {
    const url = `${environment.backend.inscripcion}`;

    return this.httpClient.post<any>(url, inscripcion, this.getHeaders()).toPromise();
  }


  public updateInscripcion(inscripcion: any, _id: any): Promise<any> {
    const url = `${environment.backend.inscripcion}/${_id}`;

    return this.httpClient.post<any>(url, inscripcion, this.getHeaders()).toPromise();
  }

  public updateInscripcionStatus(inscripcion: any, _id: any): Promise<any> {
    const url = `${environment.backend.inscripcion}updateInscripcionStatus/${_id}`;

    return this.httpClient.post<any>(url, inscripcion, this.getHeaders()).toPromise();
  }

  public deleteInscripcion( _id: any): Promise<any> {
    const url = `${environment.backend.aspUisAcademic}deleteAspiranteUisAcademic/${_id}`;

    return this.httpClient.delete<any>(url, this.getHeaders()).toPromise();
  }

  public getAspirantesUisPersonal(): Promise<any> {
    const url = `${environment.backend.aspUisPersonal}getAspirantesUisPersonal/`;
    return this.httpClient.get<any>(url, this.getHeaders()).toPromise();
  }

  public consultarEstudiantes(consulta): Promise <any> {
    const url = `${environment.backend.aspUisPersonal}consultarEstudiantes/`;

    return this.httpClient.post<any>(url, consulta, this.getHeaders()).toPromise();

  }

  public cambiarEstadoInscripcionById(estado, id): Promise<any>{
   const url = `${environment.backend.inscripcion}cambiarEstadoInscripcionById/${id}`;

   return this.httpClient.post<any>(url, estado, this.getHeaders()).toPromise();

  }

  public getInscripcionByEstudiante(field, value): Promise<any> {
    const url = `${environment.backend.inscripcion}getInscripcionByEstudiante/${field}/${value}`;
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
